import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, Radio, Home } from 'lucide-react';
import { orchestralEngine } from '../utils/audioEngine.js';
import { MarvelInsignia } from './MarvelInsignia.js';

interface NavbarProps {
  sessionPin?: string | null;
  onGoHome?: () => void;
  gameStatus?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  sessionPin,
  onGoHome,
  gameStatus
}) => {
  const [isMuted, setIsMuted] = useState(orchestralEngine.getMuted());

  const handleToggleMute = () => {
    const muted = orchestralEngine.toggleMute();
    setIsMuted(muted);
    // If unmuted and soundtrack was stopped, ensure soundtrack starts
    if (!muted) {
      orchestralEngine.startMatchSoundtrack();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/30 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 shadow-lg shadow-cyan-950/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Stark Industries Brand */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 group ${onGoHome ? 'cursor-pointer' : ''}`}
            onClick={onGoHome}
            title={onGoHome ? 'Return to Multiverse Command' : undefined}
          >
            <div className="p-1 rounded-full bg-cyan-950/60 border border-cyan-500/50 group-hover:border-cyan-400 transition-colors animate-pulse">
              <MarvelInsignia type="arc_reactor" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-hud font-bold text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  STARK INDUSTRIES
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  HUD v3.5
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 tracking-wider hidden sm:block">
                MULTIVERSE BINGO // PROTOCOL 3x5
              </p>
            </div>
          </div>
        </div>

        {/* Center telemetry if in active room */}
        {sessionPin && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-slate-900/80 border border-cyan-500/30 font-mono text-xs">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-400">SESSION PIN:</span>
            <span className="font-bold text-cyan-300 tracking-wider">{sessionPin}</span>
            {gameStatus && (
              <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 uppercase">
                {gameStatus}
              </span>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              isMuted
                ? 'border-red-500/40 bg-red-950/40 text-red-300 hover:bg-red-900/50'
                : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'
            }`}
            title={isMuted ? 'Unmute Orchestral Sound & FX' : 'Mute Orchestral Sound & FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>

          {/* Go Home */}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="p-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
              title="Dashboard Menu"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">MENU</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
