import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Zap,
  Activity,
  Globe2,
  AlertTriangle,
  Radio,
  Volume2,
  VolumeX,
  FastForward,
  Cpu,
  Layers,
  Sparkles,
  Shield,
  Crosshair
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects.js';
import { orchestralEngine, voiceEngine } from '../utils/audioEngine.js';
import { MarvelInsignia } from './MarvelInsignia.js';

interface CinematicIntroSceneProps {
  onComplete: () => void;
}

export const CinematicIntroScene: React.FC<CinematicIntroSceneProps> = ({ onComplete }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isWarpingOut, setIsWarpingOut] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(orchestralEngine.getMuted());
  const [glitchCardIndex, setGlitchCardIndex] = useState<number>(0);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const beat1Triggered = useRef<boolean>(false);
  const beat2Triggered = useRef<boolean>(false);
  const beat3Triggered = useRef<boolean>(false);

  // 16 seconds total timeline
  const TOTAL_DURATION = 16.0;

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Sound unlock attempt
    soundFX.playSubBassDrop();

    timerRef.current = setInterval(() => {
      const sec = (Date.now() - startTimeRef.current) / 1000;
      setElapsedTime(Math.min(TOTAL_DURATION, sec));

      // 0.5s glitch card montage cycling during Beat 1 (0s to 5s)
      if (sec < 5) {
        setGlitchCardIndex(Math.floor((sec * 2) % 4));
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      voiceEngine.stop();
    };
  }, []);

  // Audio & Voice Choreography across Beats
  useEffect(() => {
    // BEAT 1 (0.0s - 5.0s): The Multiverse Collapse
    if (elapsedTime >= 0.2 && !beat1Triggered.current) {
      beat1Triggered.current = true;
      soundFX.playSubBassDrop();
      soundFX.playEmergencyKlaxon();

      setTimeout(() => {
        soundFX.playRealityGlitchStatic();
      }, 1200);

      voiceEngine.speakFridayLine(
        "Emergency override. Reality integrity has breached zero. Dimensional barriers have failed... and the Avengers are falling across every sector."
      );
    }

    // BEAT 2 (5.0s - 10.0s): The Last Stand
    if (elapsedTime >= 5.0 && !beat2Triggered.current) {
      beat2Triggered.current = true;
      soundFX.playLightningBlast();

      setTimeout(() => {
        soundFX.playEmergencyKlaxon();
      }, 800);

      voiceEngine.speakFridayLine(
        "Brace for impact. The only way to prevent total cosmic collapse is to synchronize our tactical systems and restore the multidimensional matrix."
      );
    }

    // BEAT 3 (10.0s - 16.0s): War Room Directive
    if (elapsedTime >= 10.0 && !beat3Triggered.current) {
      beat3Triggered.current = true;
      soundFX.playTargetLockLatch();

      // Start looping orchestral background score gently
      orchestralEngine.startMatchSoundtrack();

      voiceEngine.speakFridayLine(
        "All surviving heroes and operators report to battle stations immediately. Enter the War Room."
      );
    }
  }, [elapsedTime]);

  // Action: Skip Transmission
  const handleSkip = () => {
    voiceEngine.stop();
    soundFX.playQuantumWipe();
    orchestralEngine.startMatchSoundtrack();
    triggerWarpTransition();
  };

  // Action: Enter the War Room (Click button)
  const handleEnterWarRoom = () => {
    voiceEngine.stop();
    soundFX.playTargetLockLatch();
    soundFX.playQuantumWipe();
    orchestralEngine.startMatchSoundtrack();
    triggerWarpTransition();
  };

  // Quantum tunnel / iris zoom animation into Arc Reactor
  const triggerWarpTransition = () => {
    if (isWarpingOut) return;
    setIsWarpingOut(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('introViewed', 'true');
    }
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = orchestralEngine.toggleMute();
    setIsMuted(muted);
  };

  // Beat classification
  const isBeat1 = elapsedTime < 5.0;
  const isBeat2 = elapsedTime >= 5.0 && elapsedTime < 10.0;
  const isBeat3 = elapsedTime >= 10.0;

  // Glitch montages for Beat 1
  const GLITCH_MONTAGES = [
    {
      title: "CAPTAIN AMERICA'S SHIELD",
      status: "SHATTERED // SECTOR 4 RUBBLE",
      quote: "Vibranium core fractured under cosmic compression.",
      accent: "#ef4444",
      insignia: 'cap_shield' as const
    },
    {
      title: "IRON MAN MK-LXXXV HUD",
      status: "CRITICAL FAILURE // CORE POWER 02%",
      quote: "Armor nanites depleted. Life support operating on backup capacitors.",
      accent: "#f59e0b",
      insignia: 'arc_reactor' as const
    },
    {
      title: "DOCTOR STRANGE SANCTUM",
      status: "ELDRITCH SHIELDS CRUMBLING",
      quote: "Cosmic embers scattering across timeline breaches.",
      accent: "#a855f7",
      insignia: 'quantum_core' as const
    },
    {
      title: "THOR STORMBREAKER CHRONOS",
      status: "REALITY PIXELATION IN PROGRESS",
      quote: "Quantum entanglement tearing neighborhood coordinate matrix.",
      accent: "#06b6d4",
      insignia: 'thor_hammer' as const
    }
  ];

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden select-none bg-black transition-all duration-700 ${
        isWarpingOut ? 'scale-[3.5] opacity-0 blur-xl pointer-events-none' : 'scale-100 opacity-100'
      }`}
      style={{
        backgroundColor: isBeat3 ? '#070b13' : '#030508'
      }}
    >
      {/* Background Stark CRT Scanlines & Grid */}
      <div className="absolute inset-0 pointer-events-none stark-scanline opacity-75" />

      {/* Atmospheric Radial Gradients */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: isBeat1
            ? 'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.22) 0%, rgba(10,5,10,0.85) 65%, #000 100%)'
            : isBeat2
            ? 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2) 0%, rgba(6,182,212,0.18) 50%, #03060a 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.25) 0%, rgba(15,23,42,0.9) 70%, #030712 100%)'
        }}
      />

      {/* Top Telemetry Header & Skip Toggle */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900/90 border border-cyan-500/50 flex items-center justify-center text-cyan-400 animate-pulse">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="font-hud font-bold text-xs tracking-widest text-slate-200">
              STARK INDUSTRIES TACTICAL BROADCAST
            </div>
            <div className="font-mono text-[10px] text-cyan-400/80">
              QUANTUM TIMELINE AUDIT // INCURSION EVENT
            </div>
          </div>
        </div>

        {/* Action Controls: Audio Mute & Skip Transmission */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-lg border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>

          {/* Persistent Skip Transmission Button */}
          <button
            onClick={handleSkip}
            className="px-3.5 py-1.5 rounded-lg border border-cyan-400/60 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>SKIP TRANSMISSION</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BEAT 1: THE MULTIVERSE COLLAPSE (00:00 – 00:05) */}
      {/* ========================================================= */}
      {isBeat1 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
          {/* Diagnostic Wireframe Globe with 5 Dimensional Rings */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center mb-6">
            {/* Pulsing Red Core */}
            <div className="absolute w-28 h-28 rounded-full bg-red-600/20 border-2 border-red-500 animate-ping opacity-60" />
            <div className="absolute w-36 h-36 rounded-full border border-red-500/40 animate-spin" style={{ animationDuration: '8s' }} />

            {/* 5 Dimensional Rings */}
            {[
              { label: 'AI HEROES', color: '#06b6d4', deg: 0 },
              { label: 'PROGRAMMING', color: '#3b82f6', deg: 72 },
              { label: 'CLOUD', color: '#8b5cf6', deg: 144 },
              { label: 'ANALYTICS', color: '#10b981', deg: 216 },
              { label: 'EMERGING TECH', color: '#f59e0b', deg: 288 }
            ].map((ring, idx) => (
              <div
                key={ring.label}
                className="absolute inset-0 rounded-full border border-dashed transition-all"
                style={{
                  borderColor: `${ring.color}60`,
                  transform: `rotate(${ring.deg + elapsedTime * 30}deg) scale(${0.8 + idx * 0.08})`
                }}
              />
            ))}

            <div className="relative z-10 p-5 rounded-full bg-slate-950/90 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.7)] flex flex-col items-center justify-center">
              <Globe2 className="w-12 h-12 text-red-400 animate-pulse" />
              <span className="font-mono text-[9px] text-red-300 mt-1 font-bold">EARTH-616</span>
            </div>

            {/* SVG Glass Shatter Fracture Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <line x1="10%" y1="20%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="90%" y1="15%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="2.5" />
              <line x1="80%" y1="85%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="3" />
              <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="2" />
              <line x1="5%" y1="50%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="2" />
            </svg>
          </div>

          {/* 0.5s Glitch Montage Box */}
          <div className="max-w-md w-full rounded-xl border border-red-500/60 bg-red-950/40 backdrop-blur-md p-4 shadow-[0_0_25px_rgba(239,68,68,0.4)] animate-pulse">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-900/60 border border-red-500 text-red-200">
                <MarvelInsignia type={GLITCH_MONTAGES[glitchCardIndex].insignia} size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-hud font-bold text-xs text-white">
                    {GLITCH_MONTAGES[glitchCardIndex].title}
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                    REALITY TEAR
                  </span>
                </div>
                <div className="font-mono text-[10px] text-red-400 font-bold mt-0.5">
                  {GLITCH_MONTAGES[glitchCardIndex].status}
                </div>
                <p className="font-tactical text-xs text-slate-300 mt-1 italic">
                  "{GLITCH_MONTAGES[glitchCardIndex].quote}"
                </p>
              </div>
            </div>
          </div>

          {/* Stark Telemetry Code 0-Omega */}
          <div className="mt-6 text-center max-w-xl">
            <div className="font-mono text-xs text-red-400 font-bold tracking-widest flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>[WARNING: CODE 0-OMEGA] // TIMELINES COLLAPSING</span>
            </div>
            <p className="font-mono text-xs text-slate-300 mt-1">
              INCURSION DETECTED // TIMELINES EARTH-616, 838 & 199999 COLLAPSING
              <br />
              <span className="text-red-400 font-bold">ALLIED FORCES STATUS: 74% CASUALTIES REPORTED ACROSS REALITIES</span>
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* BEAT 2: THE LAST STAND (00:05 – 00:10) */}
      {/* ========================================================= */}
      {isBeat2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
          {/* Perimeter of Surviving Heroes */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
            {[
              { name: 'THOR', role: 'SUMMONING LIGHTNING', insignia: 'thor_hammer' as const, color: '#06b6d4' },
              { name: 'SCARLET WITCH', role: 'CHAOS CONTAINMENT', insignia: 'quantum_core' as const, color: '#ef4444' },
              { name: 'BLACK PANTHER', role: 'KINETIC VIBRANIUM', insignia: 'cap_shield' as const, color: '#a855f7' },
              { name: 'IRON MAN', role: 'DEFENSIVE PERIMETER', insignia: 'arc_reactor' as const, color: '#f59e0b' }
            ].map(hero => (
              <div
                key={hero.name}
                className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-900/80 border border-slate-700 shadow-lg"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-1.5 border animate-pulse"
                  style={{
                    backgroundColor: `${hero.color}20`,
                    borderColor: hero.color
                  }}
                >
                  <MarvelInsignia type={hero.insignia} size={24} />
                </div>
                <span className="font-hud font-bold text-[10px] text-white tracking-wider">{hero.name}</span>
                <span className="font-mono text-[8px] text-cyan-300">{hero.role}</span>
              </div>
            ))}
          </div>

          {/* 3x5 Coordinate Quantum Blueprint Matrix holding realities together */}
          <div className="w-full max-w-lg rounded-2xl border-2 border-cyan-400 bg-slate-950/90 p-4 shadow-[0_0_35px_rgba(6,182,212,0.4)]">
            <div className="flex items-center justify-between font-mono text-[11px] text-cyan-300 pb-2 border-b border-cyan-500/30 mb-3">
              <span className="flex items-center gap-1.5 font-bold">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>INITIALIZING QUANTUM MULTIVERSE MATRIX (3x5)</span>
              </span>
              <span className="text-amber-400">STABILIZING SPATETIME</span>
            </div>

            {/* 3x5 Grid preview */}
            <div className="grid grid-cols-5 gap-1.5">
              {[
                'B // AI',
                'I // CODE',
                'N // CLOUD',
                'G // DATA',
                'O // TECH'
              ].map((dimLabel, cIdx) => (
                <div key={dimLabel} className="space-y-1">
                  <div className="p-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-center font-hud font-bold text-[9px] text-cyan-300 truncate">
                    {dimLabel}
                  </div>
                  {[0, 1, 2].map(rIdx => (
                    <div
                      key={`grid-${cIdx}-${rIdx}`}
                      className="h-10 rounded border border-cyan-500/30 bg-slate-900/80 flex items-center justify-center font-mono text-[9px] text-slate-400"
                    >
                      <span className="opacity-70">R0{rIdx + 1}C0{cIdx + 1}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* 5 Core Dimensions Stabilizers */}
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-[10px] text-cyan-400">
              <span>[AI] • [PROGRAMMING] • [CLOUD] • [ANALYTICS] • [EMERGING TECH]</span>
              <span className="text-emerald-400 font-bold">SYNC: 82%</span>
            </div>
          </div>

          <p className="font-tactical text-xs sm:text-sm text-cyan-200 mt-4 text-center max-w-md">
            "The only way to prevent total cosmic collapse is to synchronize our tactical systems and restore the multidimensional matrix."
          </p>
        </div>
      )}

      {/* ========================================================= */}
      {/* BEAT 3: THE WAR ROOM DIRECTIVE & CALL TO ACTION (00:10 – 00:16) */}
      {/* ========================================================= */}
      {isBeat3 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
          {/* Holographic Glowing Arc Reactor */}
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)] animate-pulse">
              <MarvelInsignia type="arc_reactor" size={60} />
            </div>
            {/* Target brackets */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
          </div>

          {/* Game Title with Tactical HUD */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-mono text-xs mb-2">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>ALLIED REALITIES SYNCHRONIZED // DEFENSE PROTOCOL ACTIVE</span>
            </div>
            <h1 className="font-hud text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 tracking-wider">
              MARVEL MULTIVERSE
              <span className="block text-cyan-400 font-extrabold text-2xl sm:text-4xl mt-1 tracking-widest">
                TECH BINGO
              </span>
            </h1>
            <p className="font-tactical text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              All surviving heroes and operators report to battle stations immediately. Enter the War Room.
            </p>
          </div>

          {/* Primary Interactive Call-To-Action Button */}
          <div className="relative group">
            {/* Outer Target Brackets */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />

            <button
              onClick={handleEnterWarRoom}
              className="px-8 py-4 sm:px-12 sm:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 font-hud font-black text-base sm:text-lg tracking-widest shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:shadow-[0_0_60px_rgba(6,182,212,0.9)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1 border-2 border-white/50"
            >
              <div className="flex items-center gap-2 text-slate-950">
                <Zap className="w-5 h-5 fill-current" />
                <span>ENTER THE WAR ROOM</span>
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-mono text-[10px] text-slate-900 tracking-wider uppercase font-bold">
                [ INITIALIZE TACTICAL TRANSMISSION PROTOCOLS ]
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Timeline Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-bold">
              {isBeat1 ? 'BEAT 01: MULTIVERSE COLLAPSE' : isBeat2 ? 'BEAT 02: THE LAST STAND' : 'BEAT 03: WAR ROOM DIRECTIVE'}
            </span>
          </div>
          <div>
            <span>{elapsedTime.toFixed(1)}s / {TOTAL_DURATION}.0s</span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="max-w-4xl mx-auto h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div
            className="h-full transition-all duration-75"
            style={{
              width: `${(elapsedTime / TOTAL_DURATION) * 100}%`,
              background: isBeat1
                ? 'linear-gradient(to r, #ef4444, #f59e0b)'
                : isBeat2
                ? 'linear-gradient(to r, #a855f7, #06b6d4)'
                : 'linear-gradient(to r, #06b6d4, #3b82f6)'
            }}
          />
        </div>
      </div>
    </div>
  );
};
