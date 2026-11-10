import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import {
  Users,
  Play,
  Pause,
  SkipForward,
  Square,
  QrCode,
  Copy,
  Check,
  Volume2,
  AlertCircle,
  Radio,
  ExternalLink,
  Shield,
  Clock,
  Sparkles,
  Zap,
  RotateCcw,
  VolumeX,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { DifficultyLevel, GameState, MarvelQuestion, PlayerState, TurnPhase } from '../types/bingo.js';
import { DIMENSIONS, DIFFICULTY_LEVELS } from '../data/marvelQuestions.js';
import { voiceEngine, orchestralEngine } from '../utils/audioEngine.js';
import { soundFX } from '../utils/soundEffects.js';
import { MarvelInsignia } from './MarvelInsignia.js';
import { MARVEL_AVENGERS_TEAMS } from '../data/marvelTeams.js';
import { MissMinutesDancingMascot } from './MissMinutesDancingMascot.js';

interface HostArenaProps {
  socket: Socket | null;
  initialDifficulty?: DifficultyLevel;
  onExit: () => void;
  onMatchFinished: (gameState: GameState, rankings: PlayerState[]) => void;
}

export const HostArena: React.FC<HostArenaProps> = ({
  socket,
  initialDifficulty,
  onExit,
  onMatchFinished
}) => {
  // Lobby Setup State
  const [inLobby, setInLobby] = useState(true);
  const [gameMode, setGameMode] = useState<'individual' | 'team'>('individual');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty || 'tech_easy');
  const [maxCapacity, setMaxCapacity] = useState<number>(6);
  const [capacityError, setCapacityError] = useState<string | null>(null);
  const [sessionPin, setSessionPin] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [joinUrl, setJoinUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active Game State
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showOrangeFlash, setShowOrangeFlash] = useState(false);
  const [isLobbyMuted, setIsLobbyMuted] = useState(false);
  const [isCelebrationMode, setIsCelebrationMode] = useState(false);
  const [finalState, setFinalState] = useState<GameState | null>(null);
  const [finalRankings, setFinalRankings] = useState<PlayerState[]>([]);
  const lastSpokenQIndexRef = useRef<number>(-1);
  const lastTickedSecondRef = useRef<number>(-1);

  // 1. Initialize Lobby on Mount & Start Avengers Theme in Waiting Lobby at 20%
  useEffect(() => {
    orchestralEngine.startMatchSoundtrack();
    if (!socket) return;

    socket.emit(
      'host:create_lobby',
      { gameMode: 'individual', maxCapacity: 6, difficulty: initialDifficulty || 'tech_easy' },
      (res: { success?: boolean; sessionPin?: string; qrCode?: string; joinUrl?: string; state?: GameState; error?: string }) => {
        if (res.success && res.sessionPin && res.state) {
          setSessionPin(res.sessionPin);
          setQrCodeData(res.qrCode || null);
          setJoinUrl(res.joinUrl || '');
          setGameState(res.state);
          if (res.state.difficulty) {
            setDifficulty(res.state.difficulty);
          }
        } else if (res.error) {
          setCapacityError(res.error);
        }
      }
    );

    // Socket Event Listeners for Host Arena
    const handleLobbyUpdated = (updatedState: GameState) => {
      setGameState(updatedState);
      if (updatedState.difficulty) {
        setDifficulty(updatedState.difficulty);
      }
    };

    const handlePlayerScored = ({ player }: { player: PlayerState }) => {
      setGameState((prev) => {
        if (!prev) return prev;
        const newPlayers = prev.players.map((p) => (p.id === player.id ? player : p));
        return { ...prev, players: newPlayers };
      });
    };

    const handleTurnTick = ({
      currentQuestionIndex,
      timerSeconds,
      phase,
      activeQuestion
    }: {
      currentQuestionIndex: number;
      timerSeconds: number;
      phase: TurnPhase;
      activeQuestion: MarvelQuestion;
    }) => {
      setGameState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentQuestionIndex,
          timerSeconds,
          phase
        };
      });

      // Voiceover trigger during Phase 1 (at second 0 or question start)
      if (currentQuestionIndex !== lastSpokenQIndexRef.current && timerSeconds <= 2) {
        lastSpokenQIndexRef.current = currentQuestionIndex;
        voiceEngine.speakQuestion(activeQuestion);
      }

      // Phase 3: Audible clock-ticking sound effect during final 5 seconds (seconds 35 to 40)
      if (timerSeconds >= 35 && timerSeconds <= 40 && timerSeconds !== lastTickedSecondRef.current) {
        lastTickedSecondRef.current = timerSeconds;
        orchestralEngine.duckVolume();
        soundFX.playClockTick(timerSeconds >= 38);
      }

      // Second 40: Trigger full TVA Orange Screen CRT flash and scanline wipe
      if (timerSeconds === 40) {
        soundFX.playTvaScreenFlash();
        setShowOrangeFlash(true);
        setTimeout(() => {
          setShowOrangeFlash(false);
        }, 650);
      }
    };

    const handleNextQuestion = ({
      currentQuestionIndex,
      activeQuestion,
      players
    }: {
      currentQuestionIndex: number;
      activeQuestion: MarvelQuestion;
      players: PlayerState[];
    }) => {
      setGameState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentQuestionIndex,
          timerSeconds: 0,
          phase: 'reading',
          players
        };
      });
      lastSpokenQIndexRef.current = currentQuestionIndex;
      // Trigger full TVA Orange CRT Screen Flash & Scanlines Wipe
      soundFX.playTvaScreenFlash();
      setShowOrangeFlash(true);
      setTimeout(() => {
        setShowOrangeFlash(false);
      }, 650);
      voiceEngine.speakQuestion(activeQuestion);
    };

    const handlePauseUpdated = ({ isPaused }: { isPaused: boolean }) => {
      setGameState((prev) => (prev ? { ...prev, isPaused } : prev));
    };

    const handleGameFinished = ({
      state,
      rankings
    }: {
      state: GameState;
      rankings: PlayerState[];
    }) => {
      setFinalState(state);
      setFinalRankings(rankings);
      setIsCelebrationMode(true);
      // Play Miss Minutes triumphant celebration conclusion thanking all Multiverse heroes
      voiceEngine.speakFinalConclusion();
    };

    socket.on('lobby:updated', handleLobbyUpdated);
    socket.on('player:scored', handlePlayerScored);
    socket.on('game:turn_tick', handleTurnTick);
    socket.on('game:next_question', handleNextQuestion);
    socket.on('game:pause_updated', handlePauseUpdated);
    socket.on('game:finished', handleGameFinished);

    return () => {
      socket.off('lobby:updated', handleLobbyUpdated);
      socket.off('player:scored', handlePlayerScored);
      socket.off('game:turn_tick', handleTurnTick);
      socket.off('game:next_question', handleNextQuestion);
      socket.off('game:pause_updated', handlePauseUpdated);
      socket.off('game:finished', handleGameFinished);
      voiceEngine.stop();
      orchestralEngine.stopMatchSoundtrack();
    };
  }, [socket, onMatchFinished]);

  // Capacity validation handler (1 to 6)
  const handleCapacityChange = (val: number) => {
    if (val > 6) {
      setCapacityError('A maximum of 6 Players or Teams can participate in a single session.');
      setMaxCapacity(val);
    } else if (val < 1) {
      setMaxCapacity(1);
      setCapacityError(null);
    } else {
      setMaxCapacity(val);
      setCapacityError(null);
    }
  };

  // Launch Match from Lobby
  const handleStartGame = () => {
    if (!socket || !sessionPin) return;
    if (capacityError) return;

    socket.emit('host:start_game', { sessionPin }, (res: { success?: boolean; state?: GameState; error?: string }) => {
      if (res.success && res.state) {
        setInLobby(false);
        setGameState(res.state);
        // Start authentic orchestral soundtrack looping & play Miss Minutes greeting
        orchestralEngine.startMatchSoundtrack();
        voiceEngine.speakMissMinutesGreeting();
      } else if (res.error) {
        alert(res.error);
      }
    });
  };

  // Admin Toolbar actions
  const handleTogglePause = () => {
    if (!socket || !sessionPin) return;
    socket.emit('host:toggle_pause', { sessionPin });
  };

  const handleSkipQuestion = () => {
    if (!socket || !sessionPin) return;
    socket.emit('host:skip_question', { sessionPin });
  };

  const handleForceEnd = () => {
    if (!socket || !sessionPin) return;
    if (confirm('Force terminate active mission and return to command menu?')) {
      orchestralEngine.stopMatchSoundtrack();
      voiceEngine.stop();
      socket.emit('host:force_end', { sessionPin });
      onExit();
    }
  };

  // Re-voice active question button
  const handleRevoice = () => {
    if (!gameState || gameState.selectedQuestions.length === 0) return;
    const currentQ = gameState.selectedQuestions[gameState.currentQuestionIndex];
    if (currentQ) {
      voiceEngine.speakQuestion(currentQ);
    }
  };

  // Copy Join URL
  const handleCopyLink = () => {
    if (!joinUrl) return;
    navigator.clipboard.writeText(joinUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Quick Demo Agent Generator (for instant local testing without a second device)
  const handleAddDemoAgent = () => {
    if (!socket || !sessionPin || !gameState) return;
    if (gameState.players.length >= maxCapacity) {
      alert('Room has reached maximum capacity.');
      return;
    }

    if (gameMode === 'team') {
      const availableTeam = MARVEL_AVENGERS_TEAMS.find(
        t => !gameState.players.some(p => p.name === t.name)
      ) || MARVEL_AVENGERS_TEAMS[gameState.players.length % MARVEL_AVENGERS_TEAMS.length];

      socket.emit('player:join_lobby', {
        sessionPin,
        playerName: availableTeam.name,
        insignia: availableTeam.insignia
      }, () => {});
    } else {
      const demoNames = ['Tony Stark', 'Peter Parker', 'Shuri', 'Steve Rogers', 'Stephen Strange', 'Natasha Romanoff'];
      const chosenName = demoNames[gameState.players.length % demoNames.length];
      socket.emit('player:join_lobby', {
        sessionPin,
        playerName: `${chosenName}`,
        insignia: 'arc_reactor'
      }, () => {});
    }
  };

  const handleSelectGameMode = (mode: 'individual' | 'team') => {
    setGameMode(mode);
    if (socket && sessionPin) {
      socket.emit('host:set_game_mode', { sessionPin, gameMode: mode });
    }
  };

  const handleSelectDifficulty = (newDiff: DifficultyLevel) => {
    setDifficulty(newDiff);
    if (socket && sessionPin) {
      socket.emit('host:set_difficulty', { sessionPin, difficulty: newDiff });
    }
  };

  // ==========================================
  // VIEW 1: LOBBY CONFIGURATION & ROOM MONITOR
  // ==========================================
  if (inLobby) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h1 className="font-hud text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
                HOST ARENA LAUNCHER
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400">
              TRANSMISSION STAGE // LOBBY WAITING ROOM & CAPACITY VALIDATION
            </p>
            {/* Avengers Theme Waiting Lobby Audio Status */}
            <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
              <button
                type="button"
                onClick={() => setIsLobbyMuted(orchestralEngine.toggleMute())}
                className="hover:text-cyan-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                title={isLobbyMuted ? 'Unmute Lobby Music' : 'Mute Lobby Music'}
              >
                {isLobbyMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                )}
                <span>LOBBY MUSIC: THE AVENGERS THEME (ALAN SILVESTRI) • 20% VOL</span>
              </button>
              {!isLobbyMuted && (
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse rounded-full" />
                  <span className="w-0.5 h-3.5 bg-cyan-300 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse delay-150 rounded-full" />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              orchestralEngine.stopMatchSoundtrack();
              voiceEngine.stop();
              onExit();
            }}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
          >
            EXIT TO MENU
          </button>
        </div>

        {/* Capacity Error Banner */}
        {capacityError && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/50 bg-red-950/60 text-red-200 flex items-center gap-3 font-mono text-sm hud-glow-red">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{capacityError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Lobby Configuration (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Configuration Card */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-6 hud-glow">
              <h2 className="font-hud text-base font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>MISSION PARAMETERS</span>
              </h2>

              {/* Difficulty Track Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-400">MISSION DIFFICULTY TRACK</label>
                  <span className="text-[10px] font-mono text-cyan-400">150 QUESTIONS PER BANK</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {DIFFICULTY_LEVELS.map((diff) => {
                    const isSelected = difficulty === diff.id;
                    return (
                      <button
                        key={diff.id}
                        type="button"
                        onClick={() => handleSelectDifficulty(diff.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'shadow-md'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: diff.badgeColor,
                                backgroundColor: `${diff.badgeColor}18`,
                                boxShadow: `0 0 14px ${diff.badgeColor}35`
                              }
                            : {}
                        }
                      >
                        <div
                          className="font-hud text-xs font-bold truncate leading-tight"
                          style={{ color: isSelected ? diff.badgeColor : '#94a3b8' }}
                        >
                          {diff.label}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 mt-1 line-clamp-1">
                          {diff.tagline}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Game Mode Selection */}
              <div className="mb-5">
                <label className="block text-xs font-mono text-slate-400 mb-2">GAME MODE</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectGameMode('individual')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-mono transition-all ${
                      gameMode === 'individual'
                        ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    INDIVIDUAL MODE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectGameMode('team')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-mono transition-all ${
                      gameMode === 'team'
                        ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    TEAM MODE
                  </button>
                </div>
              </div>

              {/* Capacity Input (Enforcing 1 to 6) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-400">PARTICIPANT CAPACITY (1 TO 6)</label>
                  <span className="font-mono text-xs text-cyan-300 font-bold">{maxCapacity} / 6</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={maxCapacity}
                  onChange={(e) => handleCapacityChange(parseInt(e.target.value, 10) || 1)}
                  className={`w-full bg-slate-950 border px-3 py-2 rounded-lg font-mono text-sm text-white focus:outline-none ${
                    capacityError
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                <p className="text-[11px] font-mono text-slate-500 mt-1">
                  Enforces strict capacity of up to 6 players or teams per session.
                </p>
              </div>

              {/* Universal QR Code & Session PIN */}
              {sessionPin && (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 mb-2">
                    <QrCode className="w-3 h-3 text-cyan-400" />
                    <span>UNIVERSAL JOIN QR CODE (IDENTICAL FOR ALL GAMES)</span>
                  </div>

                  {qrCodeData && (
                    <div className="inline-block p-2 bg-slate-950 rounded-xl border border-cyan-500/40 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                      <img src={qrCodeData} alt="Universal Multiverse QR Code" className="w-40 h-40 mx-auto rounded-lg" />
                      <p className="text-[10px] font-mono text-slate-400 mt-1.5">
                        Scan once from mobile to access the 3x5 Matrix
                      </p>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-cyan-300 font-bold mb-1 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3 text-cyan-400" />
                    <span>PERMANENT SESSION ACCESS PIN (SAME FOR ALL GAMES)</span>
                  </div>
                  <div className="font-hud text-3xl font-extrabold text-cyan-300 tracking-widest mb-3 bg-cyan-950/50 py-1.5 rounded-lg border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    {sessionPin}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 py-2 px-3 rounded-lg border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'COPIED LINK' : 'COPY ACCESS URL'}</span>
                    </button>

                    <a
                      href={joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center gap-1 transition-colors"
                      title="Open Player in New Window"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Demo Agent button for instant preview */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-300 block font-bold">SOLO TESTING / PREVIEW</span>
                <span className="text-[11px] font-mono text-slate-500">Inject automated participant to test live HUD.</span>
              </div>
              <button
                type="button"
                onClick={handleAddDemoAgent}
                disabled={Boolean(gameState && gameState.players.length >= maxCapacity)}
                className="px-3 py-1.5 rounded-lg border border-blue-500/40 bg-blue-950/50 hover:bg-blue-900/60 text-blue-300 font-mono text-xs transition-colors disabled:opacity-50"
              >
                + ADD AGENT
              </button>
            </div>
          </div>

          {/* Right Column: Lobby Monitor (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-6 flex flex-col justify-between min-h-[460px] hud-glow">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <h2 className="font-hud text-base font-bold text-white">
                      LOBBY MONITOR ({gameState?.players.length || 0} / {maxCapacity})
                    </h2>
                  </div>

                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    STATUS: WAITING FOR HOST
                  </span>
                </div>

                {/* Entry Cards for Connected Participants */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {gameState && gameState.players.length > 0 ? (
                    gameState.players.map((player, idx) => (
                      <div
                        key={player.id}
                        className="p-3.5 rounded-xl border border-cyan-500/30 bg-slate-950/80 flex items-center justify-between shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40">
                            <MarvelInsignia type={player.insignia} size={20} />
                          </div>
                          <div>
                            <div className="font-hud font-bold text-sm text-white">
                              {player.name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              SLOT 0{idx + 1} // ACTIVE
                            </div>
                          </div>
                        </div>

                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center border-2 border-dashed border-slate-800 rounded-xl">
                      <Radio className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-pulse" />
                      <p className="font-mono text-sm text-slate-400">
                        Awaiting incoming participant transmissions...
                      </p>
                      <p className="font-mono text-xs text-slate-500 mt-1">
                        Scan the QR code or enter Session PIN on a mobile device or browser tab.
                      </p>
                    </div>
                  )}
                </div>

                {/* Overflow Waiting Queue list if any */}
                {gameState && gameState.waitingQueue.length > 0 && (
                  <div className="mt-4 p-3 rounded-xl border border-amber-500/30 bg-amber-950/20">
                    <span className="font-mono text-xs text-amber-300 font-bold block mb-1">
                      WAITING QUEUE (OVERFLOW): {gameState.waitingQueue.length}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {gameState.waitingQueue.map((q) => (
                        <span
                          key={q.id}
                          className="px-2 py-1 rounded bg-slate-900 border border-amber-500/30 text-[11px] font-mono text-amber-200"
                        >
                          {q.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Start Game Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  {gameState && gameState.players.length > 0
                    ? `Ready to launch match with ${gameState.players.length} participant(s).`
                    : 'Requires at least 1 joined participant to start.'}
                </div>

                <button
                  type="button"
                  onClick={handleStartGame}
                  disabled={!gameState || gameState.players.length === 0 || Boolean(capacityError)}
                  className="px-6 py-3 rounded-xl font-hud font-bold text-sm tracking-wider flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>START MISSION (15 QUESTIONS)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: MISSION ACCOMPLISHED CELEBRATION
  // Miss Minutes thanks Multiverse heroes & Host navigates to Leaderboard
  // ==========================================
  if (isCelebrationMode) {
    const participantCount = (finalRankings || gameState?.players || []).length;
    const totalQuestionsCount = (finalState || gameState)?.selectedQuestions.length || 15;

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center relative animate-fade-in">
        <div className="rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-950/40 via-slate-900/95 to-slate-950 p-8 sm:p-12 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative overflow-hidden hud-glow-amber">
          {/* TVA temporal glow backdrop */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Dancing Miss Minutes in Celebration Mode */}
          <div className="flex justify-center mb-6 relative z-10">
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-bounce">
              <MissMinutesDancingMascot size={130} showBadge={false} />
            </div>
          </div>

          {/* Celebration Header */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>TVA MULTIVERSE RESCUE PROTOCOL COMPLETE</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          </div>

          <h1 className="font-hud text-3xl sm:text-5xl font-extrabold text-amber-300 tracking-wider mb-4 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            MULTIVERSE ASSEMBLED!
          </h1>

          {/* Miss Minutes Celebration Thank You Speech Bubble */}
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-amber-400/40 rounded-2xl p-6 sm:p-7 mb-8 text-amber-100 font-mono shadow-inner relative">
            <div className="text-[11px] tracking-widest text-amber-400 uppercase font-bold mb-2 flex items-center justify-center gap-2">
              <span>OFFICIAL TRANSMISSION FROM MISS MINUTES</span>
            </div>
            <p className="text-base sm:text-lg italic font-medium leading-relaxed text-amber-50">
              "Y'all did it! A great big thank you to all our Multiverse heroes for assembling together to save the Multiverse! For all time, always!"
            </p>
          </div>

          {/* Quick Mission Summary HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8 font-mono text-xs">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <div className="text-slate-400">PARTICIPANTS</div>
              <div className="text-lg font-bold text-white mt-1">{participantCount} HEROES</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <div className="text-slate-400">QUESTIONS SOLVED</div>
              <div className="text-lg font-bold text-amber-400 mt-1">{totalQuestionsCount} / {totalQuestionsCount}</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <div className="text-slate-400">MULTIVERSE STATUS</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">SECURED</div>
            </div>
          </div>

          {/* Navigation to Leaderboard & Performance Audit */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              type="button"
              onClick={() => {
                orchestralEngine.stopMatchSoundtrack();
                voiceEngine.stop();
                if (onMatchFinished && (finalState || gameState)) {
                  onMatchFinished(finalState || gameState!, finalRankings);
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-hud font-extrabold text-base tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.6)] cursor-pointer transition-all transform hover:scale-105 active:scale-95"
            >
              <Trophy className="w-5 h-5 text-slate-950" />
              <span>VIEW LEADERBOARD & AUDIT REPORT</span>
              <ChevronRight className="w-5 h-5 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: ACTIVE MATCH PRESENTATION ARENA
  // Fixed horizontal two-column split: 70% Left / 30% Right
  // ==========================================
  if (!gameState || gameState.selectedQuestions.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="font-mono text-sm text-cyan-400">INITIALIZING STARK MULTIVERSE STAGE...</p>
      </div>
    );
  }

  const currentQ = gameState.selectedQuestions[gameState.currentQuestionIndex];
  const qNum = (gameState.currentQuestionIndex + 1).toString().padStart(2, '0');
  const totalQ = gameState.selectedQuestions.length.toString().padStart(2, '0');
  const timerSec = gameState.timerSeconds;
  const timeRemaining = Math.max(0, 40 - timerSec);
  const timerPercent = (timerSec / 40) * 100;

  // Active Dimension definition
  const activeDim = DIMENSIONS.find((d) => d.name === currentQ?.dimension) || DIMENSIONS[0];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-4 min-h-[calc(100vh-65px)] flex flex-col justify-between relative">
      {/* Full TVA Orange Screen CRT Flash & Scanlines Wipe (40th second transition) */}
      {showOrangeFlash && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center animate-tva-orange-flash bg-orange-600/95 overflow-hidden">
          {/* Retro TVA Cathode Ray Tube Scanlines */}
          <div className="absolute inset-0 tva-crt-scanlines opacity-75" />
          
          {/* Vintage TV horizontal beam blur line */}
          <div className="w-full h-1.5 bg-amber-200/90 blur-[1px] shadow-[0_0_20px_#fff]" />
          
          {/* Miss Minutes Time's Up Flash */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full bg-amber-950/90 border-2 border-amber-300 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.95)] animate-bounce">
              <MarvelInsignia type="miss_minutes" size={56} />
            </div>
            <div className="font-hud font-black text-4xl sm:text-6xl text-amber-100 tracking-wider drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] animate-pulse">
              Time's up!!!
            </div>
            <div className="font-mono text-xs text-amber-200 tracking-widest uppercase bg-black/50 px-4 py-1 rounded-full border border-amber-300/40">
              TEMPORAL SEQUENCE ADVANCING
            </div>
          </div>
        </div>
      )}

      {/* Top Match Telemetry Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 font-hud text-xs text-cyan-300">
            TRANSMISSION ARENA
          </div>
          <div className="font-mono text-xs text-slate-400 hidden sm:block">
            SESSION: <span className="text-cyan-300 font-bold">{sessionPin}</span> // MODE: {gameState.gameMode.toUpperCase()}
          </div>
          {/* Active Difficulty Track Badge */}
          {(() => {
            const activeLevel = DIFFICULTY_LEVELS.find((d) => d.id === (gameState.difficulty || 'tech_easy')) || DIFFICULTY_LEVELS[1];
            return (
              <div
                className="px-2.5 py-0.5 rounded-full border text-[11px] font-hud font-bold tracking-wider"
                style={{
                  backgroundColor: `${activeLevel.badgeColor}20`,
                  borderColor: `${activeLevel.badgeColor}60`,
                  color: activeLevel.badgeColor
                }}
              >
                TRACK: {activeLevel.label}
              </div>
            );
          })()}
        </div>

        {/* Phase Indicator Badge */}
        <div className="flex items-center gap-2">
          {gameState.phase === 'reading' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/50 text-blue-300 font-mono text-xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>PHASE 1: READING PERIOD (HERO SPEECH SYNTHESIS)</span>
            </div>
          )}
          {gameState.phase === 'answering' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>PHASE 2: ANSWERING MATRIX UNLOCKED (30S WINDOW)</span>
            </div>
          )}
          {gameState.phase === 'warning' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 font-mono text-xs animate-bounce shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>PHASE 3: COUNTDOWN ALERT (5 SECONDS REMAINING)</span>
            </div>
          )}
          {gameState.phase === 'reveal' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>FLASH REVEAL TRANSITION</span>
            </div>
          )}
        </div>
      </div>

      {/* FIXED HORIZONTAL TWO-COLUMN SPLIT (70% Primary Stage Left, 30% Status Tracker Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 flex-1 items-stretch">
        {/* ========================================================= */}
        {/* PRIMARY STAGE (LEFT 70% -> lg:col-span-7)                 */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 sm:p-8 hud-glow relative overflow-hidden">
          {/* Miss Minutes 5-Second Dancing Ascent (35s - 40s) without hiding the question */}
          {timerSec >= 35 && timerSec <= 40 && (
            <div className="absolute right-4 sm:right-10 bottom-0 z-30 pointer-events-none flex flex-col items-center animate-miss-minutes-dance-ascent">
              <MissMinutesDancingMascot size={115} showBadge={false} />
            </div>
          )}

          <div>
            {/* Stage Header: Question Counter & Dimension Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-hud font-black text-2xl sm:text-3xl text-cyan-400">
                  QUESTION {qNum} <span className="text-slate-600 text-xl font-normal">/ {totalQ}</span>
                </span>

                <div
                  className="px-3 py-1 rounded-lg border font-mono text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeDim.color}15`,
                    borderColor: `${activeDim.color}60`,
                    color: activeDim.color
                  }}
                >
                  {currentQ.dimension}
                </div>
              </div>

              {/* 40-Second Circular Countdown Gauge Timer */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400">TURN CLOCK</div>
                  <div
                    className={`font-hud text-2xl font-black tracking-widest ${
                      timerSec >= 35 ? 'text-red-400 animate-pulse' : 'text-cyan-300'
                    }`}
                  >
                    {timeRemaining}s
                  </div>
                </div>

                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background Ring */}
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Progress Ring */}
                    <path
                      className={`transition-all duration-1000 ${
                        timerSec >= 35
                          ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                          : timerSec >= 25
                          ? 'text-amber-400'
                          : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      }`}
                      strokeDasharray={`${timerPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <Clock
                    className={`w-5 h-5 absolute ${
                      timerSec >= 35 ? 'text-red-400 animate-spin' : 'text-cyan-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Miss Minutes TVA Vocal Badge with Re-Voice Button */}
            <div className="mb-6 p-4 rounded-xl border border-orange-500/40 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-950/90 border border-orange-500/50 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  <MarvelInsignia
                    type="miss_minutes"
                    size={28}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-hud font-bold text-base text-white tracking-wide">
                      MISS MINUTES
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase bg-orange-950/70 border-orange-500/40 text-orange-300 font-bold">
                      TVA TEMPORAL BROADCAST
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    DIAGNOSTIC QUERY // TIME VARIANCE AUTHORITY
                  </span>
                </div>
              </div>

              {/* Re-Voice Button */}
              <button
                type="button"
                onClick={handleRevoice}
                className="px-4 py-2 rounded-lg border border-cyan-500/50 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RE-VOICE TRANSMISSION</span>
              </button>
            </div>

            {/* Technical Trivia Clue Prompt */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 shadow-inner mb-6">
              <span className="font-mono text-[11px] text-cyan-400/80 tracking-widest uppercase block mb-3">
                MISSION BRIEFING PROMPT //
              </span>
              <p className="font-tactical text-xl sm:text-2xl text-slate-100 leading-relaxed font-semibold">
                "{currentQ.clue}"
              </p>
            </div>

            {/* Answer Explanation Brief */}
            <div className="text-xs font-mono text-slate-400 flex items-start gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-300">STARK INTEL:</strong> {currentQ.explanation}
              </span>
            </div>
          </div>

          {/* Timeline Bar Visualizer (0 to 40 seconds) */}
          <div className="mt-8 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className={timerSec < 10 ? 'text-cyan-300 font-bold' : ''}>
                00s READING [10s]
              </span>
              <span className={timerSec >= 10 && timerSec < 35 ? 'text-emerald-300 font-bold' : ''}>
                10s ANSWERING WINDOW [25s]
              </span>
              <span className={timerSec >= 35 ? 'text-red-400 font-bold animate-pulse' : ''}>
                35s - 40s ALERT & REVEAL
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex">
              <div
                className="bg-cyan-500 transition-all duration-300"
                style={{ width: `${Math.min(25, (timerSec / 40) * 100)}%` }}
              />
              <div
                className="bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(62.5, ((timerSec - 10) / 40) * 100)
                  )}%`
                }}
              />
              <div
                className="bg-red-500 transition-all duration-300"
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(12.5, ((timerSec - 35) / 40) * 100)
                  )}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STATUS TRACKER (RIGHT 30% -> lg:col-span-3)               */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 hud-glow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <h3 className="font-hud text-sm font-bold text-white tracking-wide">
                  PARTICIPANT TRACKER
                </h3>
              </div>
              <span className="font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                {gameState.players.length} CONNECTED
              </span>
            </div>

            {/* Vertical Progress Cards for Connected Participants ("Player 1 to N") */}
            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              {gameState.players.map((player, pIdx) => (
                <div
                  key={player.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    player.bingoAchieved
                      ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MarvelInsignia type={player.insignia} size={18} />
                      <div>
                        <span className="font-hud font-bold text-xs text-white block">
                          {gameState.gameMode === 'team' ? `Team: ` : ''}{player.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          AGENT 0{pIdx + 1}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-hud font-bold text-sm text-cyan-300 block">
                        {player.score} <span className="text-[9px] font-normal text-slate-400">PTS</span>
                      </span>
                      {player.bingoAchieved && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400">
                          B-I-N-G-O! #{player.bingoRank}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 5 Column Status Blocks (representing the 5 digital dimensions) */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex justify-between">
                      <span>DIMENSIONS CLEARED:</span>
                      <span className="text-cyan-300 font-bold">{player.columnsCompleted} / 5</span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5">
                      {DIMENSIONS.map((dim, dimIdx) => {
                        const isCompleted = player.completedColumnsList.includes(dimIdx);
                        const bingoLetter = ['B', 'I', 'N', 'G', 'O'][dimIdx];
                        return (
                          <div
                            key={dim.name}
                            title={`${bingoLetter}: ${dim.name} (${isCompleted ? 'COMPLETED' : 'INCOMPLETE'})`}
                            className={`py-1 text-center rounded border transition-all ${
                              isCompleted
                                ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                                : 'bg-slate-900 border-slate-800 text-slate-400 font-semibold'
                            }`}
                          >
                            <span className="font-hud font-bold text-xs block">
                              {bingoLetter}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Learning Metrics */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                    <span className="text-emerald-400">Solved: {player.correctTaps}</span>
                    <span className="text-cyan-400">Attempts: {player.totalAttempts || (player.correctTaps + player.wrongTaps)}</span>
                    <span className="text-amber-400">1st-Go: {player.firstAttemptStamps || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Match Stats */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>QUESTION {gameState.currentQuestionIndex + 1} OF 15</span>
            <span className="text-cyan-400">REALTIME WS SYNC</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ADMIN PERSISTENT TOOLBAR (BOTTOM)                          */}
      {/* ========================================================= */}
      <div className="mt-4 p-3 rounded-xl border border-cyan-500/40 bg-slate-950/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">ADMIN MISSION CONTROLS:</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Pause / Resume Button */}
          <button
            type="button"
            onClick={handleTogglePause}
            className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
              gameState.isPaused
                ? 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                : 'border-amber-500/50 bg-amber-950/60 text-amber-300'
            }`}
          >
            {gameState.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{gameState.isPaused ? 'RESUME TIMER' : 'PAUSE ROUND'}</span>
          </button>

          {/* Skip Question Button */}
          <button
            type="button"
            onClick={handleSkipQuestion}
            className="px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-1.5 border border-cyan-500/40 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>SKIP QUESTION</span>
          </button>

          {/* Force End Match */}
          <button
            type="button"
            onClick={handleForceEnd}
            className="px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-1.5 border border-red-500/50 bg-red-950/60 hover:bg-red-900/70 text-red-300 transition-colors cursor-pointer"
          >
            <Square className="w-3.5 h-3.5" />
            <span>FORCE END MATCH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
