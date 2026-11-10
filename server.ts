import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';
import { MARVEL_TECH_QUESTIONS, QUESTION_BANKS } from './src/data/marvelQuestions.js';
import {
  DimensionName,
  GameState,
  MarvelQuestion,
  PlayerState,
  BingoTile,
  InsigniaType,
  DifficultyLevel
} from './src/types/bingo.js';

// Global error handlers to keep dev server process resilient
process.on('uncaughtException', (err) => {
  console.error('Unhandled server exception caught:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled server rejection at:', promise, 'reason:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Support CLI args e.g. --port 3000 and ensure dev server always binds to 3000
const portArgIndex = process.argv.indexOf('--port');
let PORT = 3000;
if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
  PORT = parseInt(process.argv[portArgIndex + 1], 10);
} else if (process.env.PORT && process.env.PORT !== '8080') {
  PORT = parseInt(process.env.PORT, 10);
} else {
  PORT = 3000;
}
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Lightweight Health Probes for pre-warming & container uptime checks
app.get(['/healthz', '/api/health'], (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Permanent Universal Session PIN for all games hosted in the Host Arena
export const UNIVERSAL_SESSION_PIN = 'AVENGERS';

// In-memory Room State Store
const rooms = new Map<string, {
  state: GameState;
  hostSocketId: string;
  playerSocketMap: Map<string, string>; // socketId -> playerId
  timerInterval: NodeJS.Timeout | null;
}>();

// Pre-initialize permanent room so it's always ready for all games
const defaultPermanentState: GameState = {
  sessionPin: UNIVERSAL_SESSION_PIN,
  gameMode: 'team',
  difficulty: 'tech_easy',
  maxCapacity: 6,
  status: 'lobby',
  currentQuestionIndex: 0,
  phase: 'reading',
  timerSeconds: 0,
  isPaused: false,
  selectedQuestions: [],
  players: [],
  waitingQueue: [],
  startTime: null,
  endTime: null,
  finishOrder: []
};

rooms.set(UNIVERSAL_SESSION_PIN, {
  state: defaultPermanentState,
  hostSocketId: '',
  playerSocketMap: new Map(),
  timerInterval: null
});

// Helper to get tactical Session PIN (constant for all games)
function generateSessionPin(): string {
  return UNIVERSAL_SESSION_PIN;
}

// Helper to shuffle an array (Fisher-Yates)
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Session-level tracking to prevent question repetitions across matches
const sessionUsedQuestionIds = new Map<string, Set<string>>();

// Select 15 questions: exactly 3 questions with 3 distinct answers per each of the 5 dimensions
// Enforces session cycling with no question repeats until the dimension bank is exhausted per difficulty track
function selectMatchQuestions(sessionPin: string = UNIVERSAL_SESSION_PIN, difficulty: DifficultyLevel = 'tech_easy'): MarvelQuestion[] {
  const dimensions: DimensionName[] = [
    'AI HEROES',
    'PROGRAMMING',
    'CLOUD',
    'ANALYTICS',
    'EMERGING TECH'
  ];

  // Composite key ensures independent cycling per difficulty level
  const sessionKey = `${sessionPin}:${difficulty}`;

  if (!sessionUsedQuestionIds.has(sessionKey)) {
    sessionUsedQuestionIds.set(sessionKey, new Set<string>());
  }
  const usedSet = sessionUsedQuestionIds.get(sessionKey)!;

  const bank = QUESTION_BANKS[difficulty] || QUESTION_BANKS['tech_easy'];
  const selected: MarvelQuestion[] = [];

  dimensions.forEach((dim) => {
    const dimQuestions = bank.filter((q) => q.dimension === dim);

    // Find questions not yet used in this session for this difficulty
    let available = dimQuestions.filter((q) => !usedSet.has(q.id));

    // If fewer than 3 unused questions with distinct answers remain, recycle used questions for this dimension
    const distinctAnswersAvailable = new Set(available.map((q) => q.answer)).size;
    if (available.length < 3 || distinctAnswersAvailable < 3) {
      dimQuestions.forEach((q) => usedSet.delete(q.id));
      available = [...dimQuestions];
    }

    const shuffled = shuffleArray(available);
    const chosenForDim: MarvelQuestion[] = [];
    const usedAnswers = new Set<string>();

    // Select 3 questions with 3 distinct answers per column
    for (const q of shuffled) {
      if (!usedAnswers.has(q.answer)) {
        usedAnswers.add(q.answer);
        chosenForDim.push(q);
        usedSet.add(q.id); // Mark question as used for this session
        if (chosenForDim.length === 3) break;
      }
    }

    // Fallback if needed
    if (chosenForDim.length < 3) {
      for (const q of shuffled) {
        if (!chosenForDim.includes(q)) {
          chosenForDim.push(q);
          usedSet.add(q.id);
          if (chosenForDim.length === 3) break;
        }
      }
    }

    selected.push(...chosenForDim);
  });

  // Randomize sequence of the 15 questions for the presentation round
  return shuffleArray(selected);
}

// Generate randomized 3x5 matrix for a player
// Each of the 5 columns represents 1 dimension, containing its 3 selected questions in randomized order
function generatePlayerCardMatrix(selectedQuestions: MarvelQuestion[]): BingoTile[][] {
  const dimensions: DimensionName[] = [
    'AI HEROES',
    'PROGRAMMING',
    'CLOUD',
    'ANALYTICS',
    'EMERGING TECH'
  ];

  // For each dimension, find the 3 questions in selectedQuestions
  const columnTerms: string[][] = dimensions.map((dim) => {
    const terms = selectedQuestions
      .filter((q) => q.dimension === dim)
      .map((q) => q.answer);
    return shuffleArray(terms); // Randomize row order per player!
  });

  // Build 3 rows x 5 columns
  const matrix: BingoTile[][] = [];
  for (let r = 0; r < 3; r++) {
    const row: BingoTile[] = [];
    for (let c = 0; c < 5; c++) {
      const term = columnTerms[c][r];
      row.push({
        id: `tile-${c}-${r}-${Math.random().toString(36).substring(2, 7)}`,
        dimension: dimensions[c],
        term: term,
        columnIndex: c,
        rowIndex: r,
        isStamped: false
      });
    }
    matrix.push(row);
  }

  return matrix;
}

// WebSocket Connection Handling
io.on('connection', (socket: Socket) => {
  // 1. Host creates a lobby
  socket.on('host:create_lobby', async (config: { gameMode: 'individual' | 'team'; maxCapacity: number; difficulty?: DifficultyLevel }, callback) => {
    // Validate capacity (1 to 6)
    if (config.maxCapacity > 6) {
      return callback({
        error: 'A maximum of 6 Players or Teams can participate in a single session.'
      });
    }

    const pin = UNIVERSAL_SESSION_PIN;
    const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
    // Permanent universal Access URL and QR Code for all games hosted in the Host Arena
    const universalJoinUrl = `${appUrl}/?join=${pin}`;

    // Clean up any existing timers or room state for this permanent session PIN
    const existingRoom = rooms.get(pin);
    if (existingRoom && existingRoom.timerInterval) {
      clearInterval(existingRoom.timerInterval);
    }

    const preservedPlayers = (existingRoom && existingRoom.state.status === 'lobby') ? existingRoom.state.players : [];
    const preservedQueue = (existingRoom && existingRoom.state.status === 'lobby') ? existingRoom.state.waitingQueue : [];
    const preservedSocketMap = (existingRoom && existingRoom.state.status === 'lobby') ? existingRoom.playerSocketMap : new Map();

    let qrCodeData = '';
    try {
      qrCodeData = await QRCode.toDataURL(universalJoinUrl, {
        color: { dark: '#06b6d4', light: '#020617' },
        width: 250,
        margin: 2
      });
    } catch {
      qrCodeData = '';
    }

    const initialGameState: GameState = {
      sessionPin: pin,
      gameMode: config.gameMode || (existingRoom ? existingRoom.state.gameMode : 'team'),
      difficulty: config.difficulty || (existingRoom ? existingRoom.state.difficulty : 'tech_easy'),
      maxCapacity: Math.min(6, Math.max(1, config.maxCapacity || 6)),
      status: 'lobby',
      currentQuestionIndex: 0,
      phase: 'reading',
      timerSeconds: 0,
      isPaused: false,
      selectedQuestions: [],
      players: preservedPlayers,
      waitingQueue: preservedQueue,
      startTime: null,
      endTime: null,
      finishOrder: []
    };

    rooms.set(pin, {
      state: initialGameState,
      hostSocketId: socket.id,
      playerSocketMap: preservedSocketMap,
      timerInterval: null
    });

    socket.join(`room:${pin}`);
    socket.join(`host:${pin}`);

    callback({
      success: true,
      sessionPin: pin,
      qrCode: qrCodeData,
      joinUrl: universalJoinUrl,
      state: initialGameState
    });
  });

  // Query active open session PIN for players scanning the universal QR code
  socket.on('player:get_active_session', (callback) => {
    // Find room under permanent UNIVERSAL_SESSION_PIN or latest lobby
    const room = rooms.get(UNIVERSAL_SESSION_PIN) || Array.from(rooms.values()).find(r => r.state.status === 'lobby');
    if (room) {
      callback({
        hasActiveSession: true,
        sessionPin: UNIVERSAL_SESSION_PIN,
        gameMode: room.state.gameMode,
        difficulty: room.state.difficulty || 'tech_easy',
        playersCount: room.state.players.length,
        maxCapacity: room.state.maxCapacity,
        takenNames: room.state.players.map(p => p.name)
      });
    } else {
      callback({
        hasActiveSession: true,
        sessionPin: UNIVERSAL_SESSION_PIN,
        gameMode: 'individual',
        difficulty: 'tech_easy',
        playersCount: 0,
        maxCapacity: 6,
        takenNames: []
      });
    }
  });

  // Host updates game mode dynamically in lobby (Individual vs Team)
  socket.on('host:set_game_mode', ({ sessionPin, gameMode }: { sessionPin?: string; gameMode: 'individual' | 'team' }) => {
    const pin = (sessionPin || UNIVERSAL_SESSION_PIN).trim().toUpperCase();
    const room = rooms.get(pin) || rooms.get(UNIVERSAL_SESSION_PIN);
    if (room && room.state.status === 'lobby') {
      room.state.gameMode = gameMode;
      io.to(`room:${pin}`).emit('lobby:mode_changed', { gameMode });
      io.to(`host:${pin}`).emit('lobby:updated', room.state);
    }
  });

  // Host updates difficulty track dynamically in lobby (Non-Tech, Tech Easy, Tech Medium)
  socket.on('host:set_difficulty', ({ sessionPin, difficulty }: { sessionPin?: string; difficulty: DifficultyLevel }) => {
    const pin = (sessionPin || UNIVERSAL_SESSION_PIN).trim().toUpperCase();
    const room = rooms.get(pin) || rooms.get(UNIVERSAL_SESSION_PIN);
    if (room && room.state.status === 'lobby') {
      room.state.difficulty = difficulty;
      io.to(`room:${pin}`).emit('lobby:difficulty_changed', { difficulty });
      io.to(`host:${pin}`).emit('lobby:updated', room.state);
    }
  });

  // 2. Player joins lobby
  socket.on('player:join_lobby', ({ sessionPin, playerName, insignia }: { sessionPin: string; playerName: string; insignia?: InsigniaType }, callback) => {
    let pin = (sessionPin || '').trim().toUpperCase();
    if (!pin || pin === 'DEFAULT' || pin === 'AUTO') {
      pin = UNIVERSAL_SESSION_PIN;
    }
    let room = rooms.get(pin);
    if (!room && rooms.has(UNIVERSAL_SESSION_PIN)) {
      pin = UNIVERSAL_SESSION_PIN;
      room = rooms.get(UNIVERSAL_SESSION_PIN);
    }

    if (!room) {
      return callback({ error: 'Session not found. Verify your Stark Access PIN.' });
    }

    const trimmedName = playerName.trim() || `Agent-${socket.id.substring(0, 4)}`;

    // Validate duplicate team/player name in the same session
    const isNameTaken = room.state.players.some(
      p => p.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (isNameTaken) {
      return callback({
        error: `"${trimmedName}" is already active in this arena. Please choose a different name.`
      });
    }

    const playerId = `player-${socket.id.substring(0, 6)}`;
    room.playerSocketMap.set(socket.id, playerId);
    socket.join(`room:${pin}`);

    // If match already in progress, handle late spectator or reject
    if (room.state.status !== 'lobby') {
      return callback({
        error: 'Transmission active. Mission has already commenced in this Arena.'
      });
    }

    // Check capacity: maxCapacity or strict cap of 6
    if (room.state.players.length >= room.state.maxCapacity) {
      // Direct to waiting queue
      const queueEntry = {
        id: playerId,
        name: playerName.trim() || `Agent-${socket.id.substring(0, 4)}`,
        joinedAt: Date.now()
      };
      room.state.waitingQueue.push(queueEntry);

      io.to(`host:${pin}`).emit('lobby:updated', room.state);

      return callback({
        success: true,
        queued: true,
        message: 'Room at Maximum Capacity (6/6). You are currently in the waiting queue. You will automatically join if an active participant drops out.',
        queuePosition: room.state.waitingQueue.length,
        playerId
      });
    }

    // Add active player
    const newPlayer: PlayerState = {
      id: playerId,
      name: playerName.trim() || `Agent-${room.state.players.length + 1}`,
      score: 0,
      columnsCompleted: 0,
      completedColumnsList: [],
      bingoAchieved: false,
      bingoTimestamp: null,
      correctTaps: 0,
      wrongTaps: 0,
      currentQAttempts: 0,
      totalAttempts: 0,
      firstAttemptStamps: 0,
      isLockedOutForCurrentQ: false,
      cardMatrix: [],
      insignia: insignia || 'arc_reactor'
    };

    room.state.players.push(newPlayer);

    // Notify host & all room members
    io.to(`host:${pin}`).emit('lobby:updated', room.state);
    io.to(`room:${pin}`).emit('lobby:player_joined', {
      playersCount: room.state.players.length,
      maxCapacity: room.state.maxCapacity
    });

    callback({
      success: true,
      queued: false,
      playerId,
      player: newPlayer,
      state: room.state
    });
  });

  // 3. Player changes insignia marker preference
  socket.on('player:change_insignia', ({ sessionPin, playerId, insignia }: { sessionPin: string; playerId: string; insignia: InsigniaType }) => {
    const room = rooms.get(sessionPin);
    if (!room) return;
    const player = room.state.players.find(p => p.id === playerId);
    if (player) {
      player.insignia = insignia;
      io.to(`host:${sessionPin}`).emit('player:updated', player);
    }
  });

  // 4. Host starts match
  socket.on('host:start_game', ({ sessionPin }: { sessionPin: string }, callback) => {
    const room = rooms.get(sessionPin);
    if (!room) return callback({ error: 'Room not found' });
    if (room.state.players.length === 0) {
      return callback({ error: 'At least 1 participant must join before launching the match.' });
    }

    // 15 unique questions across 5 dimensions with session non-repeating cycling for selected difficulty
    const difficulty = room.state.difficulty || 'tech_easy';
    room.state.selectedQuestions = selectMatchQuestions(sessionPin, difficulty);
    room.state.status = 'playing';
    room.state.currentQuestionIndex = 0;
    room.state.phase = 'reading';
    room.state.timerSeconds = 0;
    room.state.isPaused = false;
    room.state.startTime = Date.now();
    room.state.finishOrder = [];

    // Generate individualized 3x5 matrix for each player
    room.state.players.forEach((player) => {
      player.cardMatrix = generatePlayerCardMatrix(room.state.selectedQuestions);
      player.score = 0;
      player.columnsCompleted = 0;
      player.completedColumnsList = [];
      player.bingoAchieved = false;
      player.bingoTimestamp = null;
      player.correctTaps = 0;
      player.wrongTaps = 0;
      player.currentQAttempts = 0;
      player.totalAttempts = 0;
      player.firstAttemptStamps = 0;
      player.isLockedOutForCurrentQ = false;
    });

    // Start 40-second synchronized server turn loop
    startRoomTurnCycle(sessionPin);

    // Broadcast match started to everyone
    io.to(`room:${sessionPin}`).emit('game:started', {
      state: room.state
    });

    callback({ success: true, state: room.state });
  });

  // 5. Host controls: Pause/Resume
  socket.on('host:toggle_pause', ({ sessionPin }: { sessionPin: string }) => {
    const room = rooms.get(sessionPin);
    if (!room || room.state.status !== 'playing') return;
    room.state.isPaused = !room.state.isPaused;
    io.to(`room:${sessionPin}`).emit('game:pause_updated', { isPaused: room.state.isPaused });
  });

  // 6. Host controls: Skip Question
  socket.on('host:skip_question', ({ sessionPin }: { sessionPin: string }) => {
    const room = rooms.get(sessionPin);
    if (!room || room.state.status !== 'playing') return;
    advanceToNextQuestion(sessionPin);
  });

  // 7. Host controls: Force End Match
  socket.on('host:force_end', ({ sessionPin }: { sessionPin: string }) => {
    const room = rooms.get(sessionPin);
    if (!room) return;
    finishGame(sessionPin);
  });

  // 8. Player submits tile tap
  socket.on('player:submit_tile', ({ sessionPin, playerId, tileId }: { sessionPin: string; playerId: string; tileId: string }, callback) => {
    const room = rooms.get(sessionPin);
    if (!room || room.state.status !== 'playing') {
      return callback({ error: 'Match is not actively accepting inputs.' });
    }

    const player = room.state.players.find(p => p.id === playerId);
    if (!player) return callback({ error: 'Player not recognized in this session.' });

    // Note: Question lockout is permanently disabled in this learning-focused engine.
    // Participants can freely make multiple attempts without penalty or board freezing.

    // Must be in answering period (seconds 10 to 40)
    // We allow a small 0.5s grace for network latency
    if (room.state.timerSeconds < 10) {
      return callback({
        error: 'Reading period active. Wait for answering phase to unlock!',
        earlyTap: true
      });
    }

    // Find the tile on player's matrix
    let targetedTile: BingoTile | null = null;
    let foundRow = -1;
    let foundCol = -1;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        if (player.cardMatrix[r][c].id === tileId) {
          targetedTile = player.cardMatrix[r][c];
          foundRow = r;
          foundCol = c;
          break;
        }
      }
      if (targetedTile) break;
    }

    if (!targetedTile) {
      return callback({ error: 'Tile does not exist on your matrix.' });
    }

    if (targetedTile.isStamped) {
      return callback({ error: 'Tile already stamped.' });
    }

    // Increment question attempt count and total attempt count
    player.currentQAttempts = (player.currentQAttempts || 0) + 1;
    player.totalAttempts = (player.totalAttempts || 0) + 1;

    const activeQuestion = room.state.selectedQuestions[room.state.currentQuestionIndex];
    const isCorrect = targetedTile.term.trim().toLowerCase() === activeQuestion.answer.trim().toLowerCase();

    if (isCorrect) {
      targetedTile.isStamped = true;
      targetedTile.stampedAtQuestionIndex = room.state.currentQuestionIndex;
      targetedTile.stampedAtTimestamp = Date.now();
      player.correctTaps++;

      // RESTRUCTURED BASE SCORING BASED ON ATTEMPTS:
      // 1st attempt: +100 PTS
      // 2nd attempt: +75 PTS
      // 3rd or later attempt: +50 PTS
      let basePoints = 50;
      if (player.currentQAttempts === 1) {
        basePoints = 100;
        player.firstAttemptStamps = (player.firstAttemptStamps || 0) + 1;
      } else if (player.currentQAttempts === 2) {
        basePoints = 75;
      } else {
        basePoints = 50;
      }

      let pointsEarned = basePoints;

      // Tiered Speed Bonus (within 30s Answering Window: 10s to 40s)
      // Elapsed answering time: (timerSeconds - 10)
      const elapsedAnswerTime = Math.max(0, room.state.timerSeconds - 10);
      let speedBonus = 0;
      if (elapsedAnswerTime <= 5) {
        speedBonus = 50; // 0 to 5s elapsed (25 to 30s remaining)
      } else if (elapsedAnswerTime <= 15) {
        speedBonus = 30; // 5 to 15s elapsed (15 to 25s remaining)
      } else {
        speedBonus = 10; // 15 to 25s elapsed (0 to 15s remaining)
      }
      pointsEarned += speedBonus;

      // Dimension Column Completion check (+250 points per full column)
      // Column completed if all 3 rows in that column are stamped
      let newlyCompletedColumns = 0;
      for (let c = 0; c < 5; c++) {
        if (!player.completedColumnsList.includes(c)) {
          const colAllStamped = player.cardMatrix.every(row => row[c].isStamped);
          if (colAllStamped) {
            player.completedColumnsList.push(c);
            player.columnsCompleted++;
            newlyCompletedColumns++;
            pointsEarned += 250;
          }
        }
      }

      player.score += pointsEarned;

      // Winning Full House B-I-N-G-O Check (all 15 tiles stamped across all 5 columns)
      let newlyBingo = false;
      const totalStamped = player.cardMatrix.flat().filter(t => t.isStamped).length;
      if (totalStamped === 15 && !player.bingoAchieved) {
        player.bingoAchieved = true;
        player.bingoTimestamp = Date.now();
        newlyBingo = true;

        const rank = room.state.finishOrder.length + 1;
        player.bingoRank = rank;
        room.state.finishOrder.push({
          playerId: player.id,
          timestamp: Date.now(),
          rank
        });

        // Placement Bonus
        if (rank === 1) {
          player.score += 500;
        } else if (rank === 2) {
          player.score += 300;
        } else if (rank === 3) {
          player.score += 150;
        }

        io.to(`room:${sessionPin}`).emit('game:bingo_achieved', {
          playerId: player.id,
          playerName: player.name,
          rank,
          score: player.score
        });
      }

      // Notify Host and room of score update
      io.to(`host:${sessionPin}`).emit('player:scored', {
        player,
        newlyCompletedColumns,
        pointsEarned,
        basePoints,
        speedBonus,
        attempts: player.currentQAttempts
      });

      callback({
        success: true,
        correct: true,
        tile: targetedTile,
        pointsEarned,
        basePoints,
        speedBonus,
        attemptNumber: player.currentQAttempts,
        newlyCompletedColumns,
        isBingo: newlyBingo,
        player
      });
    } else {
      // Incorrect guess: NO PENALTY (0 PTS) and NO QUESTION LOCKOUT
      player.wrongTaps++;
      // player.score remains unchanged (0 points deduction)
      player.isLockedOutForCurrentQ = false;

      io.to(`host:${sessionPin}`).emit('player:incorrect', {
        player,
        attemptNumber: player.currentQAttempts,
        deduction: 0
      });

      callback({
        success: true,
        correct: false,
        errorBanner: 'Keep exploring!',
        lockedOut: false,
        attemptNumber: player.currentQAttempts,
        deduction: 0,
        player
      });
    }
  });

  // 9. Reconnect / Sync state request
  socket.on('game:sync_request', ({ sessionPin, playerId }: { sessionPin: string; playerId?: string }, callback) => {
    const room = rooms.get(sessionPin);
    if (!room) return callback({ error: 'Room not found' });
    const player = playerId ? room.state.players.find(p => p.id === playerId) : null;
    callback({
      state: room.state,
      player: player || null
    });
  });

  // 10. Disconnection handling
  socket.on('disconnect', () => {
    for (const [pin, room] of rooms.entries()) {
      if (room.hostSocketId === socket.id) {
        // Host disconnected
        io.to(`room:${pin}`).emit('host:disconnected');
      } else {
        const playerId = room.playerSocketMap.get(socket.id);
        if (playerId) {
          room.playerSocketMap.delete(socket.id);

          // If in lobby, handle dynamic slot replacement!
          if (room.state.status === 'lobby') {
            const playerIndex = room.state.players.findIndex(p => p.id === playerId);
            if (playerIndex !== -1) {
              const droppedPlayer = room.state.players.splice(playerIndex, 1)[0];

              // Check waiting queue for promotion!
              if (room.state.waitingQueue.length > 0) {
                const nextInQueue = room.state.waitingQueue.shift()!;
                const promotedPlayer: PlayerState = {
                  id: nextInQueue.id,
                  name: nextInQueue.name,
                  score: 0,
                  columnsCompleted: 0,
                  completedColumnsList: [],
                  bingoAchieved: false,
                  bingoTimestamp: null,
                  correctTaps: 0,
                  wrongTaps: 0,
                  currentQAttempts: 0,
                  totalAttempts: 0,
                  firstAttemptStamps: 0,
                  isLockedOutForCurrentQ: false,
                  cardMatrix: [],
                  insignia: 'arc_reactor'
                };
                room.state.players.push(promotedPlayer);

                // Notify promoted player via socket
                io.to(`room:${pin}`).emit('queue:player_promoted', {
                  promotedPlayerId: promotedPlayer.id,
                  playerName: promotedPlayer.name
                });
              }

              io.to(`host:${pin}`).emit('lobby:updated', room.state);
              io.to(`room:${pin}`).emit('lobby:player_left', {
                droppedPlayerName: droppedPlayer.name,
                playersCount: room.state.players.length
              });
            }
          }
        }
      }
    }
  });
});

// Turn cycle runner
function startRoomTurnCycle(sessionPin: string) {
  const room = rooms.get(sessionPin);
  if (!room) return;

  if (room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }

  room.timerInterval = setInterval(() => {
    const currentRoom = rooms.get(sessionPin);
    if (!currentRoom || currentRoom.state.status !== 'playing') {
      if (currentRoom?.timerInterval) clearInterval(currentRoom.timerInterval);
      return;
    }

    if (currentRoom.state.isPaused) {
      return; // Timer paused by admin
    }

    currentRoom.state.timerSeconds += 1;
    const sec = currentRoom.state.timerSeconds;

    // Phase computation:
    // Phase 1: Reading Period (0 to 10s)
    // Phase 2: Answering Period (10 to 35s)
    // Phase 3: Countdown Alert (35 to 40s)
    let phase = currentRoom.state.phase;
    if (sec < 10) {
      phase = 'reading';
    } else if (sec < 35) {
      phase = 'answering';
    } else if (sec <= 40) {
      phase = 'warning';
    }

    currentRoom.state.phase = phase;

    // Broadcast tick to all clients
    io.to(`room:${sessionPin}`).emit('game:turn_tick', {
      currentQuestionIndex: currentRoom.state.currentQuestionIndex,
      timerSeconds: sec,
      phase,
      activeQuestion: currentRoom.state.selectedQuestions[currentRoom.state.currentQuestionIndex]
    });

    // Second 40: Immediate Turn Transition without revealing the answer
    if (sec >= 40) {
      const isFinalQuestion = currentRoom.state.currentQuestionIndex >= 14;

      if (isFinalQuestion) {
        // Question 15: Mission Concluded
        finishGame(sessionPin);
      } else {
        // Questions 1 to 14: Advance immediately to next question without answer reveal
        advanceToNextQuestion(sessionPin);
      }
    }
  }, 1000);
}

function advanceToNextQuestion(sessionPin: string) {
  const room = rooms.get(sessionPin);
  if (!room || room.state.status !== 'playing') return;

  if (room.state.currentQuestionIndex >= 14) {
    finishGame(sessionPin);
    return;
  }

  room.state.currentQuestionIndex += 1;
  room.state.timerSeconds = 0;
  room.state.phase = 'reading';

  // Reset question attempts and unlock all players for the new active question
  room.state.players.forEach(p => {
    p.currentQAttempts = 0;
    p.isLockedOutForCurrentQ = false;
  });

  io.to(`room:${sessionPin}`).emit('game:next_question', {
    currentQuestionIndex: room.state.currentQuestionIndex,
    activeQuestion: room.state.selectedQuestions[room.state.currentQuestionIndex],
    players: room.state.players
  });
}

function finishGame(sessionPin: string) {
  const room = rooms.get(sessionPin);
  if (!room) return;

  if (room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }

  room.state.status = 'finished';
  room.state.endTime = Date.now();

  // Final sorted standings (Highest score first, then columns, then lowest wrong taps)
  const rankedPlayers = [...room.state.players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.columnsCompleted !== a.columnsCompleted) return b.columnsCompleted - a.columnsCompleted;
    return a.wrongTaps - b.wrongTaps;
  });

  io.to(`room:${sessionPin}`).emit('game:finished', {
    state: room.state,
    rankings: rankedPlayers
  });
}

// REST route to export match logs in CSV format
app.get('/api/match/:pin/export.csv', (req, res) => {
  const pin = req.params.pin.toUpperCase();
  const room = rooms.get(pin);

  if (!room) {
    return res.status(404).send('Session not found');
  }

  const rows: string[] = [];
  rows.push(['Rank', 'Name', 'Score', 'Columns Completed', 'Correct Tiles', 'Total Attempts', '1st Attempt Solves', 'Accuracy %', 'BINGO Achieved', 'Finish Timestamp'].join(','));

  const ranked = [...room.state.players].sort((a, b) => b.score - a.score);
  ranked.forEach((p, idx) => {
    const totalTaps = p.totalAttempts || (p.correctTaps + p.wrongTaps);
    const accuracy = totalTaps > 0 ? ((p.correctTaps / totalTaps) * 100).toFixed(1) : '0.0';
    const bingoTime = p.bingoTimestamp ? new Date(p.bingoTimestamp).toISOString() : 'N/A';
    rows.push([
      idx + 1,
      `"${p.name.replace(/"/g, '""')}"`,
      p.score,
      p.columnsCompleted,
      p.correctTaps,
      totalTaps,
      p.firstAttemptStamps || 0,
      `${accuracy}%`,
      p.bingoAchieved ? 'YES' : 'NO',
      bingoTime
    ].join(','));
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="stark-bingo-match-${pin}.csv"`);
  res.send(rows.join('\n'));
});

// Mount Vite in dev or serve dist in production
async function startServer() {
  try {
    if (!isProd) {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true, hmr: false },
        appType: 'spa'
      });
      app.use(vite.middlewares);

      // Serve transformed index.html for all page requests in dev mode
      app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        if (url.startsWith('/api') || url.startsWith('/socket.io') || url.startsWith('/healthz')) {
          return next();
        }
        try {
          const indexPath = path.resolve(__dirname, 'index.html');
          if (!fs.existsSync(indexPath)) return next();
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    } else {
      const distPath = path.join(__dirname, 'dist');
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        const indexPath = path.join(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(200).send('<!DOCTYPE html><html><head><title>Loading...</title></head><body>Loading...</body></html>');
        }
      });
    }

    httpServer.on('error', (err: any) => {
      console.error('HTTP Server Error:', err);
      if (err.code === 'EADDRINUSE' && PORT !== 3000) {
        console.warn(`Port ${PORT} in use, retrying on 3000...`);
        PORT = 3000;
        httpServer.listen(3000, '0.0.0.0');
      }
    });

    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`⚡ Stark Tactical BINGO Server online at http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
