import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Radio,
  Volume2,
  VolumeX,
  FastForward,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  AlertTriangle,
  Globe2,
  ShieldAlert
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects.js';
import { orchestralEngine } from '../utils/audioEngine.js';
import { MarvelInsignia } from './MarvelInsignia.js';

interface MultiverseIncursionTeaserProps {
  onEnterWarRoom: () => void;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  decay: number;
}

interface DistressMessage {
  id: string;
  sender: string;
  origin: string;
  text: string;
  accent: string;
  status: string;
  insignia: 'cap_shield' | 'arc_reactor' | 'quantum_core' | 'thor_hammer';
}

const DISTRESS_TRANSMISSIONS: DistressMessage[] = [
  {
    id: 'msg-1',
    sender: 'REED RICHARDS',
    origin: 'EARTH-838',
    text: 'Planetary barrier compromised. The Incursion has begun. Dimensional bulkheads have breached zero... May God have mercy on us all.',
    accent: '#ef4444',
    status: 'PLANETARY FAILURE',
    insignia: 'quantum_core'
  },
  {
    id: 'msg-2',
    sender: 'TONY STARK',
    origin: 'EARTH-616',
    text: 'FRIDAY, reroute all backup fusion power to arc stabilizers! Reality is tearing at the atomic seams—we are losing structural cohesion!',
    accent: '#06b6d4',
    status: 'CORE OVERLOAD',
    insignia: 'arc_reactor'
  },
  {
    id: 'msg-3',
    sender: 'PETER PARKER',
    origin: 'EARTH-199999',
    text: 'Mr. Stark?! The sky is turning purple and people are pixelating into raw digital code! My suit sensors are reading zero temporal lock!',
    accent: '#a855f7',
    status: 'REALITY TEAR',
    insignia: 'cap_shield'
  },
  {
    id: 'msg-4',
    sender: 'DOCTOR STRANGE',
    origin: 'EARTH-616',
    text: 'The dimensional barriers have fallen! The Sanctum is folding in on itself! The multiverse is crashing down upon our timeline!',
    accent: '#fbbf24',
    status: 'ELDRITCH COLLAPSE',
    insignia: 'quantum_core'
  },
  {
    id: 'msg-5',
    sender: 'THOR ODINSON',
    origin: 'ASGARD',
    text: 'My lightning cannot mend a shattered Bifrost! Spacetime is cleaving in twain! Stand firm, heroes of Midgard!',
    accent: '#60a5fa',
    status: 'BIFROST RUPTURE',
    insignia: 'thor_hammer'
  },
  {
    id: 'msg-6',
    sender: 'SHURI',
    origin: 'WAKANDA',
    text: 'Temporal radiation is overloading our vibranium defense grid! Main generator breach in 3... 2... [STATIC // SIGNAL INTERRUPTED]',
    accent: '#ec4899',
    status: 'GRID BREACH',
    insignia: 'cap_shield'
  },
  {
    id: 'msg-7',
    sender: 'STEVE ROGERS',
    origin: 'COMMAND NEXUS',
    text: 'All allied units, hold the line! Operators, synchronize your matrices and bring the Multiverse War Room online NOW!',
    accent: '#22c55e',
    status: 'DEFENSE DIRECTIVE',
    insignia: 'cap_shield'
  }
];

export const MultiverseIncursionTeaser: React.FC<MultiverseIncursionTeaserProps> = ({
  onEnterWarRoom
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isMuted, setIsMuted] = useState<boolean>(orchestralEngine.getMuted());
  const [isWarpingOut, setIsWarpingOut] = useState<boolean>(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [isStabilized, setIsStabilized] = useState<boolean>(false);

  const startTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number | null>(null);
  const sparksRef = useRef<SparkParticle[]>([]);
  const hasTriggeredFreezeSound = useRef<boolean>(false);
  const lastChirpTimeRef = useRef<number>(0);

  // Incursion full collision duration (22 seconds)
  const INCURSION_DURATION_SEC = 22.0;

  // Complete & exit cleanly to War Room
  const handleComplete = useCallback(() => {
    if (isWarpingOut) return;
    setIsWarpingOut(true);
    soundFX.playQuantumWipe();
    orchestralEngine.startMatchSoundtrack();

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('introViewed', 'true');
    }

    setTimeout(() => {
      onEnterWarRoom();
    }, 650);
  }, [isWarpingOut, onEnterWarRoom]);

  // Global Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleComplete]);

  // Initialize atmospheric sub-bass audio
  useEffect(() => {
    soundFX.playSubBassDrop();

    // Start deep soundscape; orchestral soundtrack will swell as worlds approach collision
    const rumbleInterval = setInterval(() => {
      if (!isStabilized) {
        soundFX.playSubBassDrop();
      }
    }, 4500);

    return () => clearInterval(rumbleInterval);
  }, [isStabilized]);

  // Distress Transmissions Staggered Delivery (every 3.2s)
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setActiveMessageIndex(prev => {
        const next = Math.min(DISTRESS_TRANSMISSIONS.length - 1, prev + 1);
        if (next !== prev) {
          soundFX.playRadioStaticChirp();
          setTypedChars(0);
        }
        return next;
      });
    }, 3200);

    return () => clearInterval(messageInterval);
  }, []);

  // Typewriter text animation for active distress message
  useEffect(() => {
    const currentMsg = DISTRESS_TRANSMISSIONS[activeMessageIndex];
    if (!currentMsg) return;

    const charTimer = setInterval(() => {
      setTypedChars(prev => {
        if (prev < currentMsg.text.length) {
          if (prev % 3 === 0) {
            soundFX.playTeletypeClick();
          }
          return prev + 1;
        }
        return prev;
      });
    }, 28);

    return () => clearInterval(charTimer);
  }, [activeMessageIndex]);

  // Procedural Canvas Animation: TVA Temporal Loom & Planetary Incursion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars background
    const stars: Array<{ x: number; y: number; r: number; alpha: number; pulseSpeed: number }> = [];
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }

    // Helper: Draw 3D wireframe planet
    const drawWireframePlanet = (
      x: number,
      y: number,
      radius: number,
      rotation: number,
      primaryColor: string,
      accentColor: string,
      name: string,
      designation: string
    ) => {
      ctx.save();
      ctx.translate(x, y);

      // Atmospheric outer glow
      const glowGrad = ctx.createRadialGradient(0, 0, radius * 0.7, 0, 0, radius * 1.4);
      glowGrad.addColorStop(0, `${primaryColor}30`);
      glowGrad.addColorStop(0.5, `${primaryColor}15`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Planet outline
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude Rings
      ctx.lineWidth = 1;
      const latSteps = 6;
      for (let i = 1; i < latSteps; i++) {
        const angle = (i / latSteps) * Math.PI - Math.PI / 2;
        const ringY = Math.sin(angle) * radius;
        const ringR = Math.cos(angle) * radius;

        ctx.strokeStyle = `${primaryColor}40`;
        ctx.beginPath();
        ctx.ellipse(0, ringY, ringR, ringR * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Longitude Meridians
      const lonCount = 8;
      for (let i = 0; i < lonCount; i++) {
        const lonAngle = (i / lonCount) * Math.PI + rotation;
        const cosVal = Math.cos(lonAngle);
        const sinVal = Math.sin(lonAngle);

        ctx.strokeStyle = sinVal >= 0 ? `${primaryColor}70` : `${primaryColor}20`;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(cosVal) * radius, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Orbital telemetry rings
      ctx.strokeStyle = `${accentColor}60`;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label below planet
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = primaryColor;
      ctx.fillText(name, 0, radius + 24);

      ctx.font = '9px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(designation, 0, radius + 38);

      ctx.restore();
    };

    // Main render loop
    const render = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const progress = Math.min(1.0, elapsed / INCURSION_DURATION_SEC);

      // Check if stabilized at climax (progress >= 1.0)
      if (progress >= 0.98 && !isStabilized) {
        setIsStabilized(true);
        if (!hasTriggeredFreezeSound.current) {
          hasTriggeredFreezeSound.current = true;
          soundFX.playTargetLockLatch();
          orchestralEngine.startMatchSoundtrack();
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Dark slate deep space backdrop
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Ambient celestial dust
      const bgGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.65
      );
      bgGlow.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      bgGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw starry cosmic background
      stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * (0.6 + Math.sin(elapsed * 2 + s.pulseSpeed * 100) * 0.4)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Planetary positions moving on incursion trajectory
      // Easing: slow, tension-building gravitational approach
      const easeProgress = Math.pow(progress, 1.35);

      const planetRadius = Math.max(75, Math.min(130, width * 0.1));
      const leftStartX = width * 0.18;
      const rightStartX = width * 0.82;
      const centerY = height * 0.48;

      // Distance narrows until collision point at center
      const currentLeftX = leftStartX + (width * 0.46 - planetRadius - leftStartX) * easeProgress;
      const currentRightX = rightStartX - (rightStartX - (width * 0.54 + planetRadius)) * easeProgress;

      const planetDistance = currentRightX - currentLeftX;
      const stressRatio = 1 - Math.max(0, (planetDistance - planetRadius * 2) / (rightStartX - leftStartX));

      // Draw TVA Temporal Loom Threads bridging worlds
      const threadCount = 28;
      for (let i = 0; i < threadCount; i++) {
        const offsetRatio = (i / (threadCount - 1)) * 2 - 1; // -1 to 1
        const startY = centerY + offsetRatio * planetRadius * 0.85;
        const endY = centerY + offsetRatio * planetRadius * 0.85;

        // Loom wave vibration increases as stressRatio rises
        const freq = 3 + i * 0.4;
        const amp = (stressRatio > 0.4 ? 12 : 4) * (1 + stressRatio * 3.5);
        const wave = Math.sin(elapsed * freq + i) * amp;

        const cp1x = currentLeftX + (width * 0.5 - currentLeftX) * 0.6;
        const cp1y = startY + wave;
        const cp2x = currentRightX - (currentRightX - width * 0.5) * 0.6;
        const cp2y = endY - wave;

        // Color transition: warm gold -> volatile purple -> emergency red
        let threadColor = '#fbbf24';
        if (stressRatio > 0.65) {
          threadColor = i % 2 === 0 ? '#ef4444' : '#c084fc';
        } else if (stressRatio > 0.35) {
          threadColor = i % 2 === 0 ? '#fbbf24' : '#e879f9';
        }

        ctx.strokeStyle = threadColor;
        ctx.lineWidth = stressRatio > 0.7 ? (i % 3 === 0 ? 2.5 : 1) : 1.2;
        ctx.globalAlpha = Math.max(0.2, 0.8 - stressRatio * 0.3 + Math.sin(elapsed * 5 + i) * 0.2);

        ctx.beginPath();
        ctx.moveTo(currentLeftX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentRightX, endY);
        ctx.stroke();

        // Spawn fraying spark particles when stress is high
        if (stressRatio > 0.45 && Math.random() < 0.22) {
          sparksRef.current.push({
            x: width * 0.5 + (Math.random() * 120 - 60),
            y: centerY + (Math.random() * 120 - 60),
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            color: Math.random() > 0.5 ? '#ef4444' : '#06b6d4',
            alpha: 1.0,
            size: Math.random() * 2.5 + 1,
            decay: Math.random() * 0.03 + 0.015
          });
        }
      }
      ctx.globalAlpha = 1.0;

      // Update & Draw Fraying Sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const p = sparksRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Central Reality Fracture at collision point
      const midX = width * 0.5;
      if (stressRatio > 0.25) {
        const fractureSize = 40 + stressRatio * 140;

        ctx.save();
        ctx.translate(midX, centerY);

        // Chromatic aberration glow (cyan & red offsets)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.beginPath();
        ctx.arc(-3, 0, fractureSize * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.arc(3, 0, fractureSize * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Jagged reality fracture lightning lines
        const fracturePoints = 8;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 15;

        ctx.beginPath();
        for (let j = 0; j < fracturePoints; j++) {
          const angle = (j / fracturePoints) * Math.PI * 2;
          const r = (fractureSize * 0.5) * (0.6 + Math.random() * 0.8);
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // Draw Earth-616 (Cyan / Gold)
      drawWireframePlanet(
        currentLeftX,
        centerY,
        planetRadius,
        elapsed * 0.35,
        '#06b6d4',
        '#eab308',
        'EARTH-616',
        'ALPHA SECTOR // AVENGERS NEXUS'
      );

      // Draw Earth-838 (Crimson / Purple)
      drawWireframePlanet(
        currentRightX,
        centerY,
        planetRadius,
        -elapsed * 0.32,
        '#ef4444',
        '#a855f7',
        'EARTH-838',
        'OMEGA SECTOR // ILLUMINATI VAULT'
      );

      // CRT Scanline glitch effect
      if (Math.random() < 0.08 + stressRatio * 0.15) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        const scanY = Math.random() * height;
        ctx.fillRect(0, scanY, width, Math.random() * 6 + 2);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isStabilized]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = orchestralEngine.toggleMute();
    setIsMuted(muted);
  };

  const activeMsg = DISTRESS_TRANSMISSIONS[activeMessageIndex];

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 overflow-hidden select-none bg-slate-950 transition-all duration-700 ${
        isWarpingOut ? 'scale-110 opacity-0 blur-lg pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* 2D Canvas Incursion Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Stark CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none stark-scanline opacity-65" />

      {/* Top Header & Persistent Skip Button */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
        {/* Left Telemetry Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900/90 border border-cyan-500/50 flex items-center justify-center text-cyan-400 animate-pulse">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="font-hud font-bold text-xs tracking-widest text-slate-200">
              STARK INDUSTRIES TACTICAL BROADCAST
            </div>
            <div className="font-mono text-[10px] text-cyan-400/80">
              TEMPORAL LOOM IN SITU // MULTIVERSE INCURSION DETECTED
            </div>
          </div>
        </div>

        {/* Action Controls: Audio Toggle & Skip Transmission */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-lg border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO'}</span>
          </button>

          {/* Persistent Skip Transmission Button (Top-Right from 1st second) */}
          <button
            onClick={handleComplete}
            className="px-4 py-2 rounded-lg border border-cyan-400/70 bg-cyan-950/90 hover:bg-cyan-900 text-cyan-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Skip Transmission // Enter War Room</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LOWER-LEFT INTERCEPTED HERO DISTRESS TRANSMISSION CONSOLE */}
      {/* ========================================================= */}
      <div className="absolute bottom-6 left-4 sm:left-6 z-30 max-w-sm sm:max-w-md w-full">
        <div className="rounded-xl border border-cyan-500/50 bg-slate-950/90 backdrop-blur-md p-4 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
          {/* Telemetry Stream Header */}
          <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400 pb-2 mb-2 border-b border-cyan-500/30">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold tracking-wider">
                DISTRESS FREQ [DELTA-9] // LIVE FEED
              </span>
            </div>
            <span className="text-slate-400">
              TRANSMISSION {activeMessageIndex + 1} OF {DISTRESS_TRANSMISSIONS.length}
            </span>
          </div>

          {/* Active Message Body */}
          {activeMsg && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1.5 rounded-lg border flex items-center justify-center"
                    style={{
                      borderColor: activeMsg.accent,
                      backgroundColor: `${activeMsg.accent}20`
                    }}
                  >
                    <MarvelInsignia type={activeMsg.insignia} size={18} />
                  </div>
                  <div>
                    <div className="font-hud font-bold text-xs text-white tracking-wider">
                      {activeMsg.sender}
                    </div>
                    <div className="font-mono text-[9px] text-slate-400">
                      ORIGIN: <span style={{ color: activeMsg.accent }}>{activeMsg.origin}</span>
                    </div>
                  </div>
                </div>

                <span
                  className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wide border uppercase"
                  style={{
                    color: activeMsg.accent,
                    borderColor: `${activeMsg.accent}60`,
                    backgroundColor: `${activeMsg.accent}15`
                  }}
                >
                  {activeMsg.status}
                </span>
              </div>

              {/* Typewriter text stream */}
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 min-h-[58px] font-mono text-xs text-slate-200 leading-relaxed">
                <span>{activeMsg.text.slice(0, typedChars)}</span>
                <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* CLIMAX: ARC REACTOR FREEZE & 3x5 BLUEPRINT MATRIX MODAL */}
      {/* ========================================================= */}
      {isStabilized && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          {/* Holographic Glowing Arc Reactor Flash */}
          <div className="relative mb-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.8)] animate-pulse">
              <MarvelInsignia type="arc_reactor" size={54} />
            </div>
            {/* Target Brackets */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
          </div>

          {/* Stasis Notice */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 font-mono text-xs mb-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>INCURSION COLLISION FROZEN IN STASIS // SPATETIME LOCKED</span>
            </div>

            <h1 className="font-hud text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 tracking-wider">
              MARVEL MULTIVERSE
              <span className="block text-cyan-400 font-extrabold text-2xl sm:text-4xl mt-1 tracking-widest">
                TECH BINGO
              </span>
            </h1>

            <p className="font-tactical text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Reality stabilized by the 3x5 Quantum Tech Matrix. All allied operators and heroes report to command stations immediately.
            </p>
          </div>

          {/* 3x5 Stabilized Coordinate Blueprint Matrix */}
          <div className="w-full max-w-md rounded-xl border border-cyan-500/50 bg-slate-900/90 p-3 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400 pb-1.5 mb-2 border-b border-cyan-500/30">
              <span className="flex items-center gap-1 font-bold">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>3x5 DIMENSIONAL STABILIZER MATRIX</span>
              </span>
              <span className="text-amber-400 font-bold">LOCKED // STABLE</span>
            </div>

            <div className="grid grid-cols-5 gap-1 text-center font-hud font-bold text-[9px]">
              {[
                { letter: 'B', name: 'AI' },
                { letter: 'I', name: 'CODE' },
                { letter: 'N', name: 'CLOUD' },
                { letter: 'G', name: 'DATA' },
                { letter: 'O', name: 'TECH' }
              ].map(dim => (
                <div key={dim.letter} className="p-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  <span className="text-xs font-black block">{dim.letter}</span>
                  <span className="text-[8px] text-slate-400 font-mono">{dim.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary High-Contrast Tactical CTA Button */}
          <div className="relative group">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none group-hover:scale-110 transition-transform" />

            <button
              onClick={handleComplete}
              className="px-8 py-4 sm:px-12 sm:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 font-hud font-black text-base sm:text-lg tracking-widest shadow-[0_0_45px_rgba(6,182,212,0.8)] hover:shadow-[0_0_65px_rgba(6,182,212,1.0)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1 border-2 border-white/60"
            >
              <div className="flex items-center gap-2 text-slate-950">
                <Zap className="w-5 h-5 fill-current" />
                <span>ENTER THE WAR ROOM</span>
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-mono text-[10px] text-slate-950 tracking-wider uppercase font-bold">
                [ INITIALIZE TACTICAL TRANSMISSION PROTOCOLS ]
              </span>
            </button>
          </div>

          <div className="mt-4 font-mono text-[11px] text-slate-400">
            PRESS <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300">ESC</kbd> OR CLICK TO PROCEED
          </div>
        </div>
      )}
    </div>
  );
};
