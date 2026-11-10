import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import confetti from 'canvas-confetti';
import {
  Grid3X3,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Shuffle,
  RefreshCw,
  Info,
  AlertTriangle,
  Award,
  Zap,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Radio,
  Check,
  Dices,
  Users,
  User,
  Shield,
  Trophy,
  RotateCcw
} from 'lucide-react';
import {
  BingoTile,
  DifficultyLevel,
  GameState,
  InsigniaType,
  MarvelQuestion,
  PlayerState,
  TurnPhase
} from '../types/bingo.js';
import { DIMENSIONS, DIFFICULTY_LEVELS } from '../data/marvelQuestions.js';
import { MarvelInsignia } from './MarvelInsignia.js';
import { soundFX } from '../utils/soundEffects.js';
import {
  MARVEL_AVENGERS_TEAMS,
  getRandomMarvelTeams,
  getRandomHeroCallsign,
  MarvelTeamPreset
} from '../data/marvelTeams.js';

interface PlayerBoardProps {
  socket: Socket | null;
  initialPin?: string | null;
  onExit: () => void;
  onMatchFinished?: (gameState: GameState, rankings: PlayerState[]) => void;
}

// Adaptive typography helper to dynamically reduce font size for longer terms (e.g. "Containerization") so they fit inside compact 3x5 matrix boxes
const getTileTermClass = (term: string, isStamped: boolean) => {
  const words = term.trim().split(/\s+/);
  const longestWord = Math.max(...words.map((w) => w.length));
  const totalLength = term.length;

  // Ultra-long terms (e.g. >= 14 chars single word like "Containerization", or total length >= 22)
  if (longestWord >= 14 || totalLength >= 22) {
    return isStamped
      ? 'font-tactical font-black text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10.5px] leading-[1.08] tracking-tighter break-words text-center line-through text-slate-200 line-clamp-3'
      : 'font-tactical font-bold text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] leading-[1.1] tracking-tight break-words text-center text-white drop-shadow-sm line-clamp-3';
  }

  // Moderately long terms (e.g. >= 10 chars single word or total length >= 16)
  if (longestWord >= 10 || totalLength >= 16) {
    return isStamped
      ? 'font-tactical font-black text-[9px] xs:text-[10px] sm:text-[11px] leading-[1.12] tracking-tight break-words text-center line-through text-slate-200 line-clamp-3'
      : 'font-tactical font-bold text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] md:text-xs leading-[1.15] tracking-tight break-words text-center text-white drop-shadow-sm line-clamp-3';
  }

  // Standard terms
  return isStamped
    ? 'font-tactical font-black text-[10px] xs:text-[11px] sm:text-xs leading-tight break-words text-center line-through text-slate-200 line-clamp-3'
    : 'font-tactical font-bold text-[11px] xs:text-[12px] sm:text-[13px] md:text-sm leading-tight break-words text-center text-white drop-shadow-sm line-clamp-3';
};

export const PlayerBoard: React.FC<PlayerBoardProps> = ({
  socket,
  initialPin,
  onExit,
  onMatchFinished
}) => {
  // Join Form State
  // Permanent default PIN is always AVENGERS
  const [sessionPinInput, setSessionPinInput] = useState(initialPin || 'AVENGERS');
  const [joinMode, setJoinMode] = useState<'individual' | 'team'>('team');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [selectedInsignia, setSelectedInsignia] = useState<InsigniaType>('arc_reactor');
  const [joinError, setJoinError] = useState<string | null>(null);
  const [autoDetectedPin, setAutoDetectedPin] = useState<string | null>(null);
  const [takenNames, setTakenNames] = useState<string[]>([]);

  // Generated Marvel Avengers Team Names for Team Mode
  const [generatedTeams, setGeneratedTeams] = useState<MarvelTeamPreset[]>(() => getRandomMarvelTeams(6));
  const [selectedTeamPreset, setSelectedTeamPreset] = useState<MarvelTeamPreset | null>(null);

  // Client Session State
  const [hasJoined, setHasJoined] = useState(false);
  const [isQueued, setIsQueued] = useState(false);
  const [queueMessage, setQueueMessage] = useState<string>('');
  const [queuePosition, setQueuePosition] = useState<number>(0);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  // Match State
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [myPlayer, setMyPlayer] = useState<PlayerState | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<MarvelQuestion | null>(null);
  const [turnPhase, setTurnPhase] = useState<TurnPhase>('reading');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Local Interactivity State
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [showBingoCelebration, setShowBingoCelebration] = useState(false);
  const [recentlyStampedId, setRecentlyStampedId] = useState<string | null>(null);
  const [recentlyFailedId, setRecentlyFailedId] = useState<string | null>(null);

  // Ref to trigger confetti only once on BINGO
  const bingoCelebratedRef = useRef(false);

  // Dedicated Player Debrief State (Personal stats only, no global leaderboard)
  const [isDebriefMode, setIsDebriefMode] = useState(false);
  const [personalDebriefData, setPersonalDebriefData] = useState<{
    rank: number;
    player: PlayerState | null;
  } | null>(null);

  // Sync initialPin from URL or probe active session from server for universal QR code
  useEffect(() => {
    if (initialPin) {
      setSessionPinInput(initialPin);
    } else {
      setSessionPinInput('AVENGERS');
    }

    if (socket) {
      socket.emit('player:get_active_session', (res: {
        hasActiveSession?: boolean;
        sessionPin?: string;
        gameMode?: 'individual' | 'team';
        takenNames?: string[];
      }) => {
        if (res && res.sessionPin) {
          setSessionPinInput(res.sessionPin);
          setAutoDetectedPin(res.sessionPin);
        }
        if (res && res.gameMode) {
          setJoinMode(res.gameMode);
        }
        if (res && res.takenNames) {
          setTakenNames(res.takenNames);
        }
      });
    }
  }, [initialPin, socket]);

  // Set initial selected team if in team mode and none selected yet
  useEffect(() => {
    if (joinMode === 'team' && !selectedTeamPreset && generatedTeams.length > 0) {
      const available = generatedTeams.find(t => !takenNames.includes(t.name)) || generatedTeams[0];
      setSelectedTeamPreset(available);
      setSelectedInsignia(available.insignia);
      setPlayerNameInput(available.name);
    }
  }, [joinMode, generatedTeams, takenNames, selectedTeamPreset]);

  // WebSocket Listeners for Player View
  useEffect(() => {
    if (!socket) return;

    const handlePlayerPromoted = ({
      promotedPlayerId
    }: {
      promotedPlayerId: string;
      playerName: string;
    }) => {
      if (promotedPlayerId === myPlayerId) {
        setIsQueued(false);
        setHasJoined(true);
        soundFX.playCorrectStamp();
      }
    };

    const handleGameStarted = ({ state }: { state: GameState }) => {
      setGameState(state);
      const found = state.players.find((p) => p.id === myPlayerId);
      if (found) {
        setMyPlayer(found);
      }
      if (state.selectedQuestions.length > 0) {
        setActiveQuestion(state.selectedQuestions[0]);
      }
      setTurnPhase('reading');
      setTimerSeconds(0);
    };

    const handleTurnTick = ({
      currentQuestionIndex,
      timerSeconds: sec,
      phase,
      activeQuestion: q
    }: {
      currentQuestionIndex: number;
      timerSeconds: number;
      phase: TurnPhase;
      activeQuestion: MarvelQuestion;
    }) => {
      setTimerSeconds(sec);
      setTurnPhase(phase);
      setActiveQuestion(q);
    };

    const handleNextQuestion = ({
      currentQuestionIndex,
      activeQuestion: q,
      players
    }: {
      currentQuestionIndex: number;
      activeQuestion: MarvelQuestion;
      players: PlayerState[];
    }) => {
      setActiveQuestion(q);
      setTimerSeconds(0);
      setTurnPhase('reading');
      setErrorBanner(null);

      if (myPlayerId) {
        const updated = players.find((p) => p.id === myPlayerId);
        if (updated) {
          setMyPlayer(updated);
        }
      }
    };

    const handleBingoAchieved = ({
      playerId,
      playerName,
      rank
    }: {
      playerId: string;
      playerName: string;
      rank: number;
      score: number;
    }) => {
      if (playerId === myPlayerId && !bingoCelebratedRef.current) {
        bingoCelebratedRef.current = true;
        setShowBingoCelebration(true);
        soundFX.playBingoVictoryChords();

        // Canvas Confetti blast
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 160,
            angle: 60,
            spread: 60,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 160,
            angle: 120,
            spread: 60,
            origin: { x: 1 }
          });
        }, 400);
      }
    };

    const handleGameFinished = ({
      state,
      rankings
    }: {
      state: GameState;
      rankings: PlayerState[];
    }) => {
      setGameState(state);
      // Sort rankings descending by score, columns, least wrong taps to calculate accurate personal rank
      const sorted = [...rankings].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.columnsCompleted !== a.columnsCompleted) return b.columnsCompleted - a.columnsCompleted;
        return a.wrongTaps - b.wrongTaps;
      });
      const myRankIndex = sorted.findIndex((p) => p.id === myPlayerId);
      const personalRank = myRankIndex !== -1 ? myRankIndex + 1 : 1;
      const myFinishedData = sorted.find((p) => p.id === myPlayerId) || myPlayer;

      setPersonalDebriefData({
        rank: personalRank,
        player: myFinishedData || myPlayer
      });
      setIsDebriefMode(true);
    };

    const handleLobbyModeChanged = ({ gameMode }: { gameMode: 'individual' | 'team' }) => {
      setJoinMode(gameMode);
    };

    const handleLobbyDifficultyChanged = ({ difficulty }: { difficulty: DifficultyLevel }) => {
      setGameState((prev) => (prev ? { ...prev, difficulty } : prev));
    };

    const handleLobbyUpdated = (updatedState: GameState) => {
      setGameState(updatedState);
      if (updatedState.gameMode) {
        setJoinMode(updatedState.gameMode);
      }
      setTakenNames(updatedState.players.map(p => p.name));
    };

    socket.on('queue:player_promoted', handlePlayerPromoted);
    socket.on('game:started', handleGameStarted);
    socket.on('game:turn_tick', handleTurnTick);
    socket.on('game:next_question', handleNextQuestion);
    socket.on('game:bingo_achieved', handleBingoAchieved);
    socket.on('game:finished', handleGameFinished);
    socket.on('lobby:mode_changed', handleLobbyModeChanged);
    socket.on('lobby:difficulty_changed', handleLobbyDifficultyChanged);
    socket.on('lobby:updated', handleLobbyUpdated);

    return () => {
      socket.off('queue:player_promoted', handlePlayerPromoted);
      socket.off('game:started', handleGameStarted);
      socket.off('game:turn_tick', handleTurnTick);
      socket.off('game:next_question', handleNextQuestion);
      socket.off('game:bingo_achieved', handleBingoAchieved);
      socket.off('game:finished', handleGameFinished);
      socket.off('lobby:mode_changed', handleLobbyModeChanged);
      socket.off('lobby:difficulty_changed', handleLobbyDifficultyChanged);
      socket.off('lobby:updated', handleLobbyUpdated);
    };
  }, [socket, myPlayerId, onMatchFinished]);

  // Helper to reroll random Marvel teams inspired by Avengers Multiverse
  const handleRerollTeams = () => {
    soundFX.playTelemetryChime();
    const currentShown = generatedTeams.map(t => t.name);
    const exclude = [...takenNames, ...currentShown];
    let newTeams = getRandomMarvelTeams(6, exclude);
    if (newTeams.length < 6) {
      newTeams = getRandomMarvelTeams(6, takenNames);
    }
    setGeneratedTeams(newTeams);
    const available = newTeams.find(t => !takenNames.includes(t.name)) || newTeams[0];
    if (available) {
      setSelectedTeamPreset(available);
      setSelectedInsignia(available.insignia);
      setPlayerNameInput(available.name);
    }
  };

  const handleRandomCallsign = () => {
    soundFX.playTelemetryChime();
    const callsign = getRandomHeroCallsign();
    setPlayerNameInput(callsign);
  };

  const handleSelectTeam = (team: MarvelTeamPreset) => {
    if (takenNames.includes(team.name)) return;
    soundFX.playCorrectStamp();
    setSelectedTeamPreset(team);
    setSelectedInsignia(team.insignia);
    setPlayerNameInput(team.name);
    setJoinError(null);
  };

  // Action: Play Again on Player side
  // Directly returns player to choose player name / team name, keeping the active Session PIN
  const handlePlayerPlayAgain = () => {
    setIsDebriefMode(false);
    setPersonalDebriefData(null);
    setHasJoined(false);
    setIsQueued(false);
    setGameState(null);
    setMyPlayer(null);
    setActiveQuestion(null);
    setTimerSeconds(0);
    setErrorBanner(null);
    setShowBingoCelebration(false);
    bingoCelebratedRef.current = false;
    // Refresh generated teams so user has fresh choices
    setGeneratedTeams(getRandomMarvelTeams(6, takenNames));
  };

  // Join Lobby Action
  const handleJoinLobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket) return;
    setJoinError(null);

    const pin = (sessionPinInput || 'AVENGERS').trim().toUpperCase();
    let name = '';
    let insigniaToUse: InsigniaType = selectedInsignia;

    if (joinMode === 'team') {
      if (!selectedTeamPreset) {
        setJoinError('Please select a Marvel Avengers team.');
        return;
      }
      name = selectedTeamPreset.name;
      insigniaToUse = selectedTeamPreset.insignia;
    } else {
      name = playerNameInput.trim() || 'Agent Stark';
    }

    if (!pin) {
      setJoinError('Please enter a valid Session PIN.');
      return;
    }

    socket.emit(
      'player:join_lobby',
      {
        sessionPin: pin,
        playerName: name,
        insignia: insigniaToUse
      },
      (res: {
        success?: boolean;
        queued?: boolean;
        message?: string;
        queuePosition?: number;
        playerId?: string;
        player?: PlayerState;
        state?: GameState;
        error?: string;
      }) => {
        if (res.error) {
          setJoinError(res.error);
          return;
        }

        if (res.playerId) {
          setMyPlayerId(res.playerId);
        }

        if (res.queued) {
          setIsQueued(true);
          setQueueMessage(
            res.message ||
              'Room at Maximum Capacity (6/6). You are currently in the waiting queue. You will automatically join if an active participant drops out.'
          );
          setQueuePosition(res.queuePosition || 1);
        } else {
          setHasJoined(true);
          if (res.player) setMyPlayer(res.player);
          if (res.state) setGameState(res.state);
        }
      }
    );
  };

  // Tile Tap Mechanic (Only in Answering Period: seconds 10 to 40)
  const handleTileTap = (tile: BingoTile) => {
    if (!socket || !gameState || !myPlayer || !myPlayerId) return;

    if (timerSeconds < 10) {
      setErrorBanner('Transmission in Reading Period! Answering window unlocks at 10s.');
      setTimeout(() => setErrorBanner(null), 2500);
      return;
    }

    if (tile.isStamped) {
      return;
    }

    socket.emit(
      'player:submit_tile',
      {
        sessionPin: gameState.sessionPin,
        playerId: myPlayerId,
        tileId: tile.id
      },
      (res: {
        success?: boolean;
        correct?: boolean;
        tile?: BingoTile;
        pointsEarned?: number;
        basePoints?: number;
        speedBonus?: number;
        attemptNumber?: number;
        newlyCompletedColumns?: number;
        isBingo?: boolean;
        errorBanner?: string;
        lockedOut?: boolean;
        player?: PlayerState;
        error?: string;
      }) => {
        if (res.error) {
          setErrorBanner(res.error);
          setTimeout(() => setErrorBanner(null), 2500);
          return;
        }

        if (res.player) {
          setMyPlayer(res.player);
        }

        if (res.correct) {
          soundFX.playCorrectStamp();
          setRecentlyStampedId(tile.id);
          setTimeout(() => setRecentlyStampedId(null), 1200);

          if (res.newlyCompletedColumns && res.newlyCompletedColumns > 0) {
            soundFX.playColumnCompleteFanfare();
          }
        } else {
          soundFX.playIncorrectBuzz();
          setRecentlyFailedId(tile.id);
          setErrorBanner('Keep exploring!');
          setTimeout(() => {
            setRecentlyFailedId(null);
            setErrorBanner(null);
          }, 1800);
        }
      }
    );
  };

  // Card Toolbar: Shuffle Grid
  const handleShuffleGrid = () => {
    if (!myPlayer) return;
    const currentMatrix = myPlayer.cardMatrix;
    const newMatrix: BingoTile[][] = [[], [], []];
    for (let c = 0; c < 5; c++) {
      const colTiles = [currentMatrix[0][c], currentMatrix[1][c], currentMatrix[2][c]];
      for (let i = colTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colTiles[i], colTiles[j]] = [colTiles[j], colTiles[i]];
      }
      for (let r = 0; r < 3; r++) {
        newMatrix[r][c] = { ...colTiles[r], rowIndex: r };
      }
    }
    setMyPlayer({ ...myPlayer, cardMatrix: newMatrix });
  };

  // Card Toolbar: Clear Marks
  const handleClearMarks = () => {
    if (!myPlayer) return;
    if (confirm('Clear stamped marks visual preview on this card? Note: active score on server is preserved.')) {
      const resetMatrix = myPlayer.cardMatrix.map((row) =>
        row.map((tile) => ({ ...tile, isStamped: false }))
      );
      setMyPlayer({
        ...myPlayer,
        cardMatrix: resetMatrix,
        columnsCompleted: 0,
        completedColumnsList: []
      });
    }
  };

  // Card Toolbar: Print Card
  const handlePrintCard = () => {
    window.print();
  };

  // ==========================================
  // VIEW 1: JOIN FORM
  // ==========================================
  if (!hasJoined && !isQueued) {
    return (
      <div className="max-w-lg mx-auto px-4 py-6 sm:py-8">
        <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/95 p-5 sm:p-7 shadow-2xl hud-glow">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 mx-auto mb-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Grid3X3 className="w-6 h-6" />
            </div>
            <h1 className="font-hud text-xl sm:text-2xl font-bold text-white tracking-wider">
              MULTIVERSE MATRIX
            </h1>
            <p className="text-[11px] font-mono text-cyan-400/90 mt-0.5">
              AVENGERS TACTICAL SQUAD DEPLOYMENT // 3x5 BINGO
            </p>

            {autoDetectedPin && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>ACTIVE TRANSMISSION ARENA: {autoDetectedPin}</span>
              </div>
            )}
          </div>

          {/* Mode Switcher: Team Mode vs Solo Agent */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-4">
            <button
              type="button"
              onClick={() => {
                setJoinMode('team');
                if (selectedTeamPreset) {
                  setPlayerNameInput(selectedTeamPreset.name);
                  setSelectedInsignia(selectedTeamPreset.insignia);
                }
              }}
              className={`flex-1 py-2 rounded-lg font-hud text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                joinMode === 'team'
                  ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>AVENGERS TEAM SQUAD</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setJoinMode('individual');
                if (playerNameInput === selectedTeamPreset?.name) {
                  setPlayerNameInput('');
                }
              }}
              className={`flex-1 py-2 rounded-lg font-hud text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                joinMode === 'individual'
                  ? 'bg-blue-950 border border-blue-400 text-blue-200 font-bold shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4 text-blue-400" />
              <span>SOLO AGENT</span>
            </button>
          </div>

          {joinError && (
            <div className="mb-4 p-3 rounded-lg border border-red-500/50 bg-red-950/60 text-red-200 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{joinError}</span>
            </div>
          )}

          <form onSubmit={handleJoinLobby} className="space-y-4">
            {/* Permanent Universal Session PIN */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SESSION ACCESS PIN (SAME FOR ALL GAMES)</span>
                </label>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  PERMANENT
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={sessionPinInput}
                  onChange={(e) => setSessionPinInput(e.target.value.toUpperCase())}
                  required
                  className="w-full bg-slate-950 border border-cyan-500/40 focus:border-cyan-400 px-3.5 py-2.5 rounded-lg font-hud text-base tracking-widest text-cyan-300 font-bold focus:outline-none"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/40">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>CONSTANT</span>
                </div>
              </div>
            </div>

            {/* TEAM MODE: Random Marvel Avengers Teams Picker (No manual text entry) */}
            {joinMode === 'team' ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      CHOOSE YOUR AVENGERS TEAM NAME
                    </label>
                    <p className="text-[10px] font-mono text-slate-400">
                      Pick a random Marvel tactical unit (no manual typing needed)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRerollTeams}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] cursor-pointer"
                    title="Generate different random Marvel Avengers team names"
                  >
                    <Dices className="w-3.5 h-3.5 text-cyan-400" />
                    <span>REROLL TEAMS</span>
                  </button>
                </div>

                {/* Grid of Generated Marvel Team Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {generatedTeams.map((team) => {
                    const isSelected = selectedTeamPreset?.name === team.name;
                    const isTaken = takenNames.includes(team.name);

                    return (
                      <button
                        key={team.name}
                        type="button"
                        disabled={isTaken}
                        onClick={() => handleSelectTeam(team)}
                        className={`p-2.5 rounded-xl border text-left transition-all relative flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_15px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400'
                            : isTaken
                            ? 'border-slate-800 bg-slate-950/40 opacity-40 cursor-not-allowed'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900/80 cursor-pointer'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-900/60 text-cyan-300'
                              : 'border-slate-800 bg-slate-900 text-slate-400'
                          }`}
                        >
                          <MarvelInsignia type={team.insignia} size={18} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`font-hud text-xs font-bold truncate block ${
                                isSelected ? 'text-cyan-200' : 'text-slate-100'
                              }`}
                            >
                              {team.name}
                            </span>
                            {isSelected && (
                              <span className="shrink-0 flex items-center gap-0.5 text-[8px] font-mono font-bold text-cyan-300 bg-cyan-950 px-1 py-0.5 rounded border border-cyan-500/40">
                                <Check className="w-2.5 h-2.5 text-cyan-400" /> SELECTED
                              </span>
                            )}
                            {isTaken && (
                              <span className="shrink-0 text-[8px] font-mono text-red-400 bg-red-950/80 px-1 py-0.2 rounded border border-red-500/40">
                                TAKEN
                              </span>
                            )}
                          </div>

                          <div className="text-[10px] font-tactical text-amber-300/90 truncate mt-0.5">
                            {team.hero}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                            "{team.motto}"
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Squad Confirmation Banner */}
                {selectedTeamPreset && (
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <div className="p-1 rounded bg-cyan-900/50 border border-cyan-500/30 shrink-0">
                        <MarvelInsignia type={selectedTeamPreset.insignia} size={14} />
                      </div>
                      <span className="text-slate-200 truncate">
                        Selected Squad:{' '}
                        <strong className="text-cyan-300 font-hud tracking-wide font-bold">
                          {selectedTeamPreset.name}
                        </strong>
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-300 shrink-0 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40">
                      READY TO DEPLOY
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* INDIVIDUAL MODE: Agent Callsign */
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono text-slate-400">
                      AGENT CALLSIGN
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomCallsign}
                      className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>RANDOM CALLSIGN</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Tony Stark, Wanda Maximoff"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 px-3.5 py-2.5 rounded-lg font-tactical text-sm text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                {/* Custom Marvel Stamp Insignia Picker */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    CUSTOM STAMP INSIGNIA
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'arc_reactor', label: 'Arc Reactor' },
                      { id: 'cap_shield', label: "Cap's Shield" },
                      { id: 'thor_hammer', label: 'Thor Mjolnir' },
                      { id: 'quantum_core', label: 'Quantum Core' }
                    ].map((ins) => (
                      <button
                        key={ins.id}
                        type="button"
                        onClick={() => setSelectedInsignia(ins.id as InsigniaType)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          selectedInsignia === ins.id
                            ? 'border-cyan-400 bg-cyan-950/80 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        }`}
                      >
                        <MarvelInsignia type={ins.id as InsigniaType} size={20} />
                        <span className="text-[9px] font-mono text-slate-300 line-clamp-1">
                          {ins.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-3 py-3 rounded-xl font-hud font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 tracking-wider transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              {joinMode === 'team'
                ? `DEPLOY ${selectedTeamPreset?.name ? selectedTeamPreset.name.toUpperCase() : 'TEAM'} TO ARENA`
                : 'INITIALIZE MATRIX ACCESS'}
            </button>
          </form>

          <div className="mt-5 pt-3 border-t border-slate-800/80 text-center">
            <button
              onClick={onExit}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO MAIN GATEWAY</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: PERSONAL MISSION DEBRIEF (PLAYER ONLY)
  // Shows ONLY this player's points, rank, accuracy & columns.
  // No other player stats, no CSV download, no game time telemetry banner.
  // ==========================================
  if (isDebriefMode) {
    const debriefPlayer = personalDebriefData?.player || myPlayer;
    const personalRank = personalDebriefData?.rank || 1;
    const totalTaps = debriefPlayer
      ? (debriefPlayer.totalAttempts || (debriefPlayer.correctTaps + debriefPlayer.wrongTaps))
      : 0;
    const accuracy = totalTaps > 0 && debriefPlayer
      ? ((debriefPlayer.correctTaps / totalTaps) * 100).toFixed(0)
      : '0';
    const personalScore = debriefPlayer?.score || 0;
    const columnsCompleted = debriefPlayer?.columnsCompleted || 0;
    const firstAttemptStamps = debriefPlayer?.firstAttemptStamps || 0;

    const rankSuffix = personalRank === 1 ? '1ST PLACE' : personalRank === 2 ? '2ND PLACE' : personalRank === 3 ? '3RD PLACE' : `#${String(personalRank).padStart(2, '0')} STANDING`;
    const rankTitle = personalRank === 1 ? 'CHAMPION OF THE MULTIVERSE' : personalRank === 2 ? 'DEPUTY VANGUARD' : personalRank === 3 ? 'TACTICAL OPERATIVE' : 'HONORABLE MULTIVERSE AGENT';

    return (
      <div className="max-w-xl mx-auto px-4 py-8 sm:py-12 animate-fade-in text-center">
        <div className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl hud-glow relative overflow-hidden">
          {/* Subtle Stark blue background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Insignia & Callsign Header */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-cyan-950/90 border-2 border-cyan-400/80 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <MarvelInsignia type={debriefPlayer?.insignia || selectedInsignia} size={42} />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>MISSION DEBRIEF // AGENT DOSSIER</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </div>

            <h1 className="font-hud text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
              {debriefPlayer?.name || 'MULTIVERSE AGENT'}
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              SESSION PIN: <span className="text-cyan-300 font-bold">{gameState?.sessionPin || sessionPinInput}</span>
            </p>
          </div>

          {/* Personal Standing & Rank Badge */}
          <div className="relative z-10 max-w-sm mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900/80 to-amber-950/30 border border-amber-500/40 shadow-inner">
            <div className="font-hud font-black text-2xl sm:text-3xl text-amber-300 tracking-wider">
              {rankSuffix}
            </div>
            <div className="text-xs font-mono text-amber-200 mt-0.5 tracking-wide">
              {rankTitle}
            </div>
          </div>

          {/* 4 Dedicated Personal Metrics (Only this player's stats) */}
          <div className="relative z-10 grid grid-cols-2 gap-3 mb-8 text-left">
            {/* 1. Personal Score */}
            <div className="rounded-xl border border-cyan-500/40 bg-slate-950/80 p-4 hud-glow">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                <span>YOUR SCORE</span>
              </div>
              <div className="font-hud font-black text-2xl sm:text-3xl text-cyan-300 tracking-wider">
                {personalScore} <span className="text-xs font-normal text-slate-400">PTS</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                1st Try: {firstAttemptStamps} / 15
              </div>
            </div>

            {/* 2. Completed Columns */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>COLUMNS</span>
              </div>
              <div className="font-hud font-black text-2xl sm:text-3xl text-amber-300 tracking-wider">
                {columnsCompleted} <span className="text-xs font-normal text-slate-400">/ 5</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                +{columnsCompleted * 250} Bonus Pts
              </div>
            </div>

            {/* 3. Tactical Accuracy */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ACCURACY</span>
              </div>
              <div className="font-hud font-black text-2xl sm:text-3xl text-emerald-300 tracking-wider">
                {accuracy}%
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                {debriefPlayer?.correctTaps || 0} Correct / {totalTaps} Attempts
              </div>
            </div>

            {/* 4. Full B-I-N-G-O Status */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>BINGO STATUS</span>
              </div>
              <div className="font-hud font-bold text-lg sm:text-xl text-white tracking-wider mt-1">
                {debriefPlayer?.bingoAchieved ? (
                  <span className="text-amber-400 font-black">ACHIEVED!</span>
                ) : (
                  <span className="text-slate-400">CONCLUDED</span>
                )}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                15 Transmissions
              </div>
            </div>
          </div>

          {/* Action: Play Again (Directly routes to choose player / team name keeping the PIN) */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handlePlayerPlayAgain}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-hud font-black text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-slate-950" />
              <span>PLAY AGAIN (CHOOSE HERO / TEAM)</span>
            </button>
            <p className="text-[11px] font-mono text-slate-500">
              Preserves Session PIN <span className="text-cyan-400 font-bold">{gameState?.sessionPin || sessionPinInput}</span> for your next match
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: OVERFLOW QUEUE STATE
  // ==========================================
  if (isQueued) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="rounded-2xl border border-amber-500/50 bg-slate-900/90 p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-950 border border-amber-500/60 flex items-center justify-center text-amber-400 mx-auto mb-4 animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h2 className="font-hud text-xl font-bold text-white mb-2">
            OVERFLOW QUEUE ACTIVE
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-200 text-xs font-mono mb-6 leading-relaxed">
            {queueMessage}
          </div>

          <div className="font-mono text-sm text-slate-300 mb-6">
            YOUR QUEUE POSITION: <span className="font-bold text-amber-400">#{queuePosition}</span>
          </div>

          <p className="text-xs font-mono text-slate-500 mb-6">
            Persistent WebSocket link active. Do not close this browser window. You will be automatically admitted if an active player disconnects.
          </p>

          <button
            onClick={onExit}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-700 cursor-pointer"
          >
            LEAVE QUEUE
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: LOBBY WAITING STATE (Before host launches match)
  // ==========================================
  if (gameState && gameState.status === 'lobby') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-8 shadow-2xl hud-glow">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <MarvelInsignia type={selectedInsignia} size={32} />
          </div>

          <h2 className="font-hud text-xl font-bold text-white mb-2">
            STARK ARENA LINKED
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 text-sm font-mono mb-4 animate-pulse">
            Connected to Host Arena. Waiting for host to start...
          </div>

          <div className="text-xs font-mono text-slate-400 mb-6 space-y-1">
            <div>CALLSIGN: <span className="text-white font-bold">{myPlayer?.name}</span></div>
            <div>SESSION PIN: <span className="text-cyan-300 font-bold">{gameState.sessionPin}</span></div>
            <div>PARTICIPANTS JOINED: <span className="text-emerald-400 font-bold">{gameState.players.length} / {gameState.maxCapacity}</span></div>
            {(() => {
              const diffLevel = DIFFICULTY_LEVELS.find((d) => d.id === (gameState.difficulty || 'tech_easy')) || DIFFICULTY_LEVELS[1];
              return (
                <div className="pt-2">
                  <span
                    className="inline-block px-3 py-1 rounded-full border text-[11px] font-hud font-bold tracking-wider"
                    style={{
                      backgroundColor: `${diffLevel.badgeColor}20`,
                      borderColor: `${diffLevel.badgeColor}60`,
                      color: diffLevel.badgeColor
                    }}
                  >
                    MISSION TRACK: {diffLevel.label}
                  </span>
                </div>
              );
            })()}
          </div>

          <button
            onClick={onExit}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-700 cursor-pointer"
          >
            DISCONNECT
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 4: COMPACT NO-SCROLL 3x5 BINGO MATRIX INTERFACE
  // Entire view is engineered to fit within mobile viewport without scrolling!
  // ==========================================
  if (!myPlayer || !myPlayer.cardMatrix || myPlayer.cardMatrix.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-mono text-xs text-cyan-300">GENERATING INDEPENDENT 3x5 QUANTUM MATRIX...</p>
      </div>
    );
  }

  const timeRemaining = Math.max(0, 40 - timerSeconds);
  const isAnsweringWindow = timerSeconds >= 10 && timerSeconds <= 40;

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100dvh-54px)] max-h-[calc(100dvh-54px)] flex flex-col justify-between p-1.5 sm:p-3 overflow-hidden select-none relative">
      {/* Full House B-I-N-G-O Celebration Overlay */}
      {showBingoCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in zoom-in-95">
          <div className="p-6 rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 to-amber-950 text-center max-w-sm shadow-[0_0_50px_rgba(245,158,11,0.6)]">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-3 animate-bounce">
              <Award className="w-8 h-8 text-amber-400" />
            </div>

            <h2 className="font-hud text-2xl font-black text-white tracking-widest mb-1">
              B-I-N-G-O ACHIEVED!
            </h2>

            <div className="font-hud text-sm text-amber-300 font-bold mb-3">
              MULTIVERSE RESTORED!
            </div>

            <p className="text-xs font-tactical text-slate-200 mb-4">
              Agent {myPlayer.name}, all 15 matrix tiles have been stamped!
            </p>

            <button
              onClick={() => setShowBingoCelebration(false)}
              className="px-5 py-2 rounded-xl font-hud font-bold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
            >
              CLOSE VICTORY HUD
            </button>
          </div>
        </div>
      )}

      {/* COMPACT TOP HUD HEADER (~50px) */}
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/90 px-2.5 py-1.5 backdrop-blur-sm shadow-md shrink-0">
        <div className="flex items-center justify-between gap-2">
          {/* Agent Badge & Name */}
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="p-1 rounded bg-cyan-950 border border-cyan-500/40 shrink-0">
              <MarvelInsignia type={myPlayer.insignia} size={16} />
            </div>
            <div className="truncate">
              <span className="font-hud text-xs font-bold text-white block truncate leading-none">
                {myPlayer.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-mono text-slate-400">
                  MATRIX ACTIVE
                </span>
                {(() => {
                  const diffLevel = DIFFICULTY_LEVELS.find((d) => d.id === (gameState?.difficulty || 'tech_easy')) || DIFFICULTY_LEVELS[1];
                  return (
                    <span
                      className="text-[8px] font-mono px-1 rounded border leading-none py-0.5"
                      style={{
                        backgroundColor: `${diffLevel.badgeColor}15`,
                        borderColor: `${diffLevel.badgeColor}50`,
                        color: diffLevel.badgeColor
                      }}
                    >
                      {diffLevel.label}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Turn Timer & Phase */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span
              className={`font-hud font-black text-xs sm:text-sm tracking-wider ${
                timerSeconds >= 35 ? 'text-red-400 animate-pulse' : 'text-cyan-300'
              }`}
            >
              {timeRemaining}s
            </span>
            <span
              className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold shrink-0 ${
                !isAnsweringWindow
                  ? 'bg-blue-950 text-blue-300'
                  : 'bg-emerald-950 text-emerald-300 animate-pulse'
              }`}
            >
              {!isAnsweringWindow ? 'READ' : 'ANSWER'}
            </span>
          </div>

          {/* Score & Columns */}
          <div className="flex items-center gap-2 text-right shrink-0">
            <div>
              <span className="text-[8px] font-mono text-slate-400 block leading-none">PTS</span>
              <span className="font-hud text-xs sm:text-sm font-black text-cyan-300 leading-none">
                {myPlayer.score}
              </span>
            </div>
            <div className="pl-2 border-l border-slate-800">
              <span className="text-[8px] font-mono text-slate-400 block leading-none">COLS</span>
              <span className="font-hud text-xs sm:text-sm font-bold text-amber-400 leading-none">
                {myPlayer.columnsCompleted}/5
              </span>
            </div>
          </div>
        </div>

        {/* Compact Clue Preview Banner */}
        {activeQuestion && (
          <div className="mt-1 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-tactical text-slate-200">
            <div className="flex items-center gap-1.5 truncate">
              <span className="px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-500/40 text-orange-400 font-mono text-[8px] font-bold shrink-0 flex items-center gap-1">
                <MarvelInsignia type="miss_minutes" size={12} />
                <span>MISS MINUTES:</span>
              </span>
              <span className="truncate italic">
                "{activeQuestion.clue}"
              </span>
            </div>
            <span className="text-[9px] font-mono text-amber-300/90 shrink-0 ml-2 hidden xs:inline">
              {(myPlayer.currentQAttempts || 0) === 0
                ? '1st: +100 PTS'
                : (myPlayer.currentQAttempts || 0) === 1
                ? '2nd: +75 PTS'
                : '3rd+: +50 PTS'}
            </span>
          </div>
        )}
      </div>

      {/* Exploratory Banner (Brief Flash) */}
      {errorBanner && (
        <div className="my-1 px-2.5 py-1 rounded-lg border border-amber-500/50 bg-amber-950/85 text-amber-200 text-[11px] font-mono flex items-center gap-1.5 animate-in fade-in shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-bold">{errorBanner}</span>
          <span className="text-[9px] text-amber-300/70 ml-auto font-normal">All tiles remain active</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3x5 BINGO MATRIX (FIT COMPLETELY ON MOBILE WITHOUT SCROLL) */}
      {/* ========================================================= */}
      <div className="bingo-print-card flex-1 min-h-0 flex flex-col justify-between my-1 sm:my-2 w-full rounded-xl border border-cyan-500/40 bg-slate-950/95 p-1 sm:p-2 hud-glow">
        {/* Dimension Headers (5 Columns) */}
        <div className="grid grid-cols-5 gap-1 sm:gap-1.5 mb-1 shrink-0">
          {DIMENSIONS.map((dim, cIdx) => {
            const isColComplete = myPlayer.completedColumnsList.includes(cIdx);
            return (
              <div
                key={dim.name}
                className={`py-1 px-0.5 text-center rounded-md border transition-all duration-300 ${
                  isColComplete
                    ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.6)] line-through'
                    : 'bg-slate-900/90'
                }`}
                style={{
                  borderColor: isColComplete ? '#f59e0b' : `${dim.color}60`
                }}
              >
                <div
                  className={`text-[8px] xs:text-[9px] sm:text-[11px] font-hud font-bold tracking-tight uppercase truncate ${
                    isColComplete ? 'text-slate-950 font-black' : 'text-slate-200'
                  }`}
                >
                  {dim.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Rows of High-Contrast Clearly Readable Tiles */}
        <div className="flex-1 min-h-0 flex flex-col justify-between gap-1 sm:gap-1.5">
          {myPlayer.cardMatrix.map((row, rIdx) => (
            <div key={`row-${rIdx}`} className="grid grid-cols-5 gap-1 sm:gap-1.5 flex-1 min-h-0">
              {row.map((tile) => {
                const isStamped = tile.isStamped;
                const isRecentlyStamped = recentlyStampedId === tile.id;
                const isRecentlyFailed = recentlyFailedId === tile.id;
                const tileDim = DIMENSIONS.find((d) => d.name === tile.dimension) || DIMENSIONS[0];

                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => handleTileTap(tile)}
                    disabled={isStamped || !isAnsweringWindow}
                    className={`relative w-full h-full min-h-0 p-1 sm:p-1.5 rounded-lg border text-center flex flex-col items-center justify-center transition-all duration-150 cursor-pointer overflow-hidden ${
                      isStamped
                        ? 'border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : isRecentlyFailed
                        ? 'border-red-500 bg-red-950/90 text-red-200 animate-shake'
                        : 'border-slate-800 bg-slate-900/90 hover:border-cyan-400/80 active:scale-95'
                    } ${
                      !isAnsweringWindow ? 'opacity-85' : ''
                    } ${isRecentlyStamped ? 'animate-bounce' : ''}`}
                    style={{
                      // Subtle dimension ambient tint to aid visual tracking
                      backgroundColor: isStamped
                        ? undefined
                        : isRecentlyFailed
                        ? undefined
                        : `${tileDim.color}0c`
                    }}
                  >
                    {isStamped ? (
                      <div className="flex flex-col items-center justify-center w-full px-0.5">
                        <div className="flex items-center gap-0.5 text-emerald-400 mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <MarvelInsignia type={myPlayer.insignia} size={12} />
                        </div>
                        <span className={getTileTermClass(tile.term, true)}>
                          {tile.term}
                        </span>
                      </div>
                    ) : (
                      <div className="w-full px-0.5 flex flex-col items-center justify-center">
                        {/* High-Contrast, Clearly Legible Term with adaptive font size */}
                        <span className={getTileTermClass(tile.term, false)}>
                          {tile.term}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* COMPACT CARD TOOLBAR (~32px) */}
      <div className="no-print mt-1 p-1.5 rounded-lg border border-slate-800 bg-slate-900/90 flex items-center justify-between gap-1 text-[11px] font-mono shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowReferenceModal(true)}
            className="px-2 py-1 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="View Rules & Matrix Reference"
          >
            <Info className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px]">INFO</span>
          </button>

          <button
            type="button"
            onClick={handleShuffleGrid}
            className="px-2 py-1 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="Randomize row layout"
          >
            <Shuffle className="w-3 h-3 text-blue-400" />
            <span className="text-[10px]">SHUFFLE</span>
          </button>

          <button
            type="button"
            onClick={handleClearMarks}
            className="px-2 py-1 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset board mark view"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" />
            <span className="text-[10px]">CLEAR</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrintCard}
          className="px-2.5 py-1 rounded border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Printer className="w-3 h-3" />
          <span className="text-[10px]">PRINT</span>
        </button>
      </div>

      {/* Reference Card Modal */}
      {showReferenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md">
          <div className="max-w-xs w-full rounded-2xl border border-cyan-500/50 bg-slate-900 p-5 shadow-2xl hud-glow">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="font-hud text-xs font-bold text-white flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>3x5 MATRIX GUIDE</span>
              </h3>
              <button
                onClick={() => setShowReferenceModal(false)}
                className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                ESC
              </button>
            </div>

            <div className="text-[11px] font-tactical text-slate-300 mb-3 space-y-1.5 leading-snug">
              <p>
                <strong>Zero Penalties & Open Exploration:</strong> Incorrect taps cost 0 points and never freeze your board—keep trying until the answer is found!
              </p>
              <div className="p-2 rounded bg-slate-950/80 border border-cyan-500/30 font-mono text-[10px] space-y-0.5 text-cyan-300">
                <div>• 1st Attempt: <span className="text-emerald-400 font-bold">+100 PTS</span></div>
                <div>• 2nd Attempt: <span className="text-cyan-400 font-bold">+75 PTS</span></div>
                <div>• 3rd+ Attempt: <span className="text-slate-300 font-bold">+50 PTS</span></div>
                <div>• Column Complete: <span className="text-amber-400 font-bold">+250 PTS</span></div>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {DIMENSIONS.map((dim, i) => (
                <div
                  key={dim.name}
                  className="flex items-center justify-between p-1.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono"
                >
                  <span className="font-bold text-slate-200">{dim.name}</span>
                  <span className="text-slate-400">COL 0{i + 1}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowReferenceModal(false)}
              className="w-full py-1.5 rounded-lg font-hud font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
