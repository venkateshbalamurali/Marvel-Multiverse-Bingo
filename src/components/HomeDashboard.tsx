import React, { useState } from 'react';
import { Tv, Grid3X3, BookOpen, ShieldCheck, Zap, Sparkles, ChevronRight, Activity, Cpu, Layers } from 'lucide-react';
import { MarvelInsignia } from './MarvelInsignia.js';
import { DifficultyLevel } from '../types/bingo.js';

interface HomeDashboardProps {
  onSelectHostArena: (difficulty?: DifficultyLevel) => void;
  onSelectPlayerBoard: () => void;
  onSelectMissionProtocol: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectHostArena,
  onSelectPlayerBoard,
  onSelectMissionProtocol
}) => {
  const [showDifficultyGateway, setShowDifficultyGateway] = useState(false);

  const handleHostClick = () => {
    setShowDifficultyGateway(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Stark Hero Banner */}
      <div className="text-center mb-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>STARK TACTICAL PROTOCOL // MULTIVERSE BINGO ENGINE</span>
        </div>

        <h1 className="font-hud text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-400 mb-4 drop-shadow-sm">
          MARVEL MULTIVERSE
          <span className="block text-cyan-400 font-extrabold text-2xl sm:text-4xl lg:text-5xl mt-1 tracking-widest">
            BINGO
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 font-tactical text-base sm:text-lg leading-relaxed">
          Synchronized real-time 3x5 multiplayer tech trivia arena. Project the Host transmission stage, join via mobile Matrix, unlock tactical dimensions, and restore the timeline.
        </p>

        {/* Tactical HUD Accent Lines */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-2 h-2 rotate-45 border border-cyan-400 bg-cyan-950" />
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
      </div>

      {/* MODULE 1: The Three Prominent Interactive Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* TILE A: HOST ARENA */}
        <div
          onClick={handleHostClick}
          className="group relative cursor-pointer rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-7 transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col justify-between"
        >
          <div className="absolute top-3 right-3 font-mono text-[10px] text-cyan-400/70 border border-cyan-500/30 px-2 py-0.5 rounded">
            TRANSMISSION STAGE
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 mb-6 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              <Tv className="w-7 h-7" />
            </div>

            <div className="font-hud text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              HOST ARENA
            </div>

            <p className="text-slate-400 font-tactical text-sm leading-relaxed mb-6">
              Launcher console for hosting the 15-question presentation match on a main projector or shared screen with synchronized speech synthesis and turn clocks.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-cyan-400 font-mono text-xs group-hover:translate-x-1 transition-transform">
            <span>CONFIGURE ARENA</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* TILE B: PLAYER BOARD */}
        <div
          onClick={onSelectPlayerBoard}
          className="group relative cursor-pointer rounded-2xl border border-blue-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-7 transition-all duration-300 hover:border-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] flex flex-col justify-between"
        >
          <div className="absolute top-3 right-3 font-mono text-[10px] text-blue-400/70 border border-blue-500/30 px-2 py-0.5 rounded">
            MULTIVERSE MATRIX
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400 mb-6 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
              <Grid3X3 className="w-7 h-7" />
            </div>

            <div className="font-hud text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              PLAYER BOARD
            </div>

            <p className="text-slate-400 font-tactical text-sm leading-relaxed mb-6">
              Mobile-first 3x5 BINGO matrix interface for individual participants or team captains. Tap tiles during the answering window to claim dimension victories.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-blue-400 font-mono text-xs group-hover:translate-x-1 transition-transform">
            <span>ENTER SESSION PIN</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* TILE C: MISSION PROTOCOL */}
        <div
          onClick={onSelectMissionProtocol}
          className="group relative cursor-pointer rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-7 transition-all duration-300 hover:border-amber-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col justify-between"
        >
          <div className="absolute top-3 right-3 font-mono text-[10px] text-amber-400/70 border border-amber-500/30 px-2 py-0.5 rounded">
            AVENGERS PROTOCOL
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400 mb-6 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all">
              <BookOpen className="w-7 h-7" />
            </div>

            <div className="font-hud text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
              MISSION PROTOCOL
            </div>

            <p className="text-slate-400 font-tactical text-sm leading-relaxed mb-6">
              Rulebook briefing detailing scoring math, timer phases, character voice mechanics, and victory patterns across the 5 dimensions.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-amber-400 font-mono text-xs group-hover:translate-x-1 transition-transform">
            <span>VIEW DOSSIER</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* DIFFICULTY LEVEL GATEWAY MODAL */}
      {showDifficultyGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/50 bg-slate-900 p-6 sm:p-8 shadow-2xl hud-glow">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <div>
                  <h2 className="font-hud text-xl font-bold text-white tracking-wide">
                    DIFFICULTY LEVEL GATEWAY
                  </h2>
                  <p className="text-xs font-mono text-slate-400">
                    SELECT SIMULATION COMPLEXITY MATRIX (ALL TRACKS UNLOCKED)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDifficultyGateway(false)}
                className="text-slate-400 hover:text-white font-mono text-sm px-2.5 py-1 rounded border border-slate-700 bg-slate-800 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* 3 Difficulty Tiers - ALL UNLOCKED & ACTIVE */}
            <div className="space-y-4">
              {/* Tier 1: Non-Tech (Very Easy) */}
              <div
                onClick={() => {
                  setShowDifficultyGateway(false);
                  onSelectHostArena('non_tech');
                }}
                className="group cursor-pointer rounded-xl border-2 border-emerald-500/60 bg-emerald-950/20 p-5 hover:bg-emerald-900/30 hover:border-emerald-400 transition-all flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-400 text-emerald-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-hud font-bold text-lg text-white group-hover:text-emerald-300">
                        NON-TECH (VERY EASY)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                        150 QUESTIONS // UNLOCKED
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-tactical mt-1">
                      Superhero pop culture, everyday digital tools, basic computing concepts, and smart workplace tech across all 5 dimensions.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>

              {/* Tier 2: Tech (Easy) */}
              <div
                onClick={() => {
                  setShowDifficultyGateway(false);
                  onSelectHostArena('tech_easy');
                }}
                className="group cursor-pointer rounded-xl border-2 border-cyan-400 bg-cyan-950/30 p-5 hover:bg-cyan-900/40 hover:border-cyan-300 transition-all flex items-center justify-between hud-glow shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-hud font-bold text-lg text-white group-hover:text-cyan-300">
                        TECH (EASY)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                        150 QUESTIONS // ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-tactical mt-1">
                      Foundational software development, cloud services, data science basics, and modern AI algorithms.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>

              {/* Tier 3: Tech (Medium) */}
              <div
                onClick={() => {
                  setShowDifficultyGateway(false);
                  onSelectHostArena('tech_medium');
                }}
                className="group cursor-pointer rounded-xl border-2 border-amber-500/60 bg-amber-950/20 p-5 hover:bg-amber-900/30 hover:border-amber-400 transition-all flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-950 border border-amber-400 text-amber-300">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-hud font-bold text-lg text-white group-hover:text-amber-300">
                        TECH (MEDIUM)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        150 QUESTIONS // UNLOCKED
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-tactical mt-1">
                      Advanced distributed architecture, Kubernetes, LLM fine-tuning, complex data pipelines, and quantum crypto across all 5 dimensions.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowDifficultyGateway(false)}
                className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
