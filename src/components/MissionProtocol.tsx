import React from 'react';
import { Shield, Award, Clock, Mic, Sparkles, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { MarvelInsignia } from './MarvelInsignia.js';
import { DIMENSIONS } from '../data/marvelQuestions.js';

interface MissionProtocolProps {
  onBack: () => void;
}

export const MissionProtocol: React.FC<MissionProtocolProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 shadow-lg shadow-cyan-950/40">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-hud text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
              AVENGERS MISSION PROTOCOL
            </h1>
            <p className="text-sm font-mono text-slate-400">
              CLASSIFIED BRIEFING // TACTICAL RULES OF ENGAGEMENT // HUD SPEC v3.5
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-mono text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO DASHBOARD</span>
        </button>
      </div>

      {/* Multiverse Access & Team Units Protocol */}
      <div className="mb-6 rounded-xl border border-cyan-500/40 bg-slate-900/80 p-5 sm:p-6 backdrop-blur hud-glow">
        <div className="flex items-center gap-2 mb-3 text-cyan-400">
          <Shield className="w-5 h-5" />
          <h2 className="font-hud text-lg font-bold tracking-wide">PERMANENT ACCESS & AVENGERS SQUAD SYSTEM</h2>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed mb-4 font-tactical">
          To ensure effortless participation across game rounds, access credentials remain permanently synchronized for all games hosted in the Host Arena.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-cyan-950/50 border border-cyan-500/40">
            <span className="text-cyan-300 font-bold block mb-1">PERMANENT ACCESS PIN: AVENGERS</span>
            <span className="text-slate-400 text-[11px] leading-normal block">
              The session PIN is always <strong>AVENGERS</strong>. Participants can scan the universal QR code once from any device, or bookmark the link for all matches.
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyan-950/50 border border-cyan-500/40">
            <span className="text-cyan-300 font-bold block mb-1">MARVEL AVENGERS SQUAD NAMES</span>
            <span className="text-slate-400 text-[11px] leading-normal block">
              In Team Mode, players choose from authentic randomly generated Marvel Avengers team names (e.g. Team Iron Legion, Wakanda Vanguard, Midnight Sons) with a 1-tap selector and instant reroll.
            </span>
          </div>
        </div>
      </div>

      {/* 3 Multiverse Difficulty Tracks (All Unlocked) */}
      <div className="mb-6 rounded-xl border border-cyan-500/40 bg-slate-900/80 p-5 sm:p-6 backdrop-blur hud-glow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Award className="w-5 h-5" />
            <h2 className="font-hud text-lg font-bold tracking-wide">3 UNLOCKED DIFFICULTY TRACKS (450 TOTAL QUESTIONS)</h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
            150 QUESTIONS EACH // 30 PER DIMENSION
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
            <span className="text-emerald-300 font-bold block mb-1">NON-TECH (VERY EASY)</span>
            <span className="text-slate-400 text-[11px] leading-normal block">
              Superhero pop culture, everyday digital tools, general workspace tech, and fun digital trivia across all 5 dimensions.
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40">
            <span className="text-cyan-300 font-bold block mb-1">TECH (EASY)</span>
            <span className="text-slate-400 text-[11px] leading-normal block">
              Foundational programming, web architectures, cloud essentials, database concepts, and modern AI algorithms.
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-500/40">
            <span className="text-amber-300 font-bold block mb-1">TECH (MEDIUM)</span>
            <span className="text-slate-400 text-[11px] leading-normal block">
              Deep distributed systems, Kubernetes orchestration, LLM fine-tuning, complex data streaming, and quantum cryptography.
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: The 40-Second Turn Cycle */}
        <div className="rounded-xl border border-cyan-500/30 bg-slate-900/70 p-6 backdrop-blur hud-glow">
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Clock className="w-5 h-5" />
            <h2 className="font-hud text-lg font-bold tracking-wide">40-SECOND TURN TIMELINE</h2>
          </div>

          <div className="space-y-4 text-sm font-tactical">
            <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-950/30">
              <div className="flex items-center justify-between text-blue-300 font-hud text-xs mb-1">
                <span>PHASE 1: READING PERIOD</span>
                <span className="font-mono">00s - 10s</span>
              </div>
              <p className="text-slate-300 text-xs">
                Question displays on the Host Arena projector. The active Marvel hero synthesizes the voiceover transmission aloud. Background orchestral music dynamically ducks to 4%. Participants evaluate clues.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/30">
              <div className="flex items-center justify-between text-emerald-300 font-hud text-xs mb-1">
                <span>PHASE 2: ANSWERING MATRIX UNLOCKED</span>
                <span className="font-mono">10s - 35s</span>
              </div>
              <p className="text-slate-300 text-xs">
                The 25-second active answering window opens. Participants tap matching tiles on their 3x5 matrix. Orchestral audio smoothly swells back to 20% volume.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-red-500/30 bg-red-950/30">
              <div className="flex items-center justify-between text-red-300 font-hud text-xs mb-1">
                <span>PHASE 3: COUNTDOWN ALERT</span>
                <span className="font-mono">35s - 40s</span>
              </div>
              <p className="text-slate-300 text-xs">
                Audible clock-ticking sound effect pulses with visual warning rings. Music re-ducks. At second 40, a Flash Reveal flashes the answer for Questions 1-14. On Question 15, the mission buzzer concludes the match!
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Unified Scoring Engine */}
        <div className="rounded-xl border border-amber-500/30 bg-slate-900/70 p-6 backdrop-blur">
          <div className="flex items-center gap-2 mb-4 text-amber-400">
            <Award className="w-5 h-5" />
            <h2 className="font-hud text-lg font-bold tracking-wide">LEARNING-FOCUSED SCORING ENGINE</h2>
          </div>

          <div className="p-3 mb-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300">
            <span className="font-bold block text-sm mb-0.5">ZERO PENALTIES & NO LOCKOUTS</span>
            <span>Incorrect guesses cost 0 points. Tiles never freeze—explore freely and refine your answers within the 30-second window!</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-xs font-mono mb-4">
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-emerald-500/50 text-center">
              <span className="text-emerald-400 font-bold block text-sm">+100 PTS</span>
              <span className="text-slate-200 block font-bold">1st Attempt</span>
              <span className="text-[10px] text-slate-400">300 pts/col • 1500 full</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-cyan-500/50 text-center">
              <span className="text-cyan-400 font-bold block text-sm">+75 PTS</span>
              <span className="text-slate-200 block font-bold">2nd Attempt</span>
              <span className="text-[10px] text-slate-400">Quick persistence</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-purple-500/50 text-center">
              <span className="text-purple-300 font-bold block text-sm">+50 PTS</span>
              <span className="text-slate-200 block font-bold">3rd+ Attempt</span>
              <span className="text-[10px] text-slate-400">Determined solve</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/80 border border-amber-500/40 mb-4 text-xs font-mono">
            <span className="text-amber-300 font-bold block text-sm">+250 PTS PER COLUMN</span>
            <span className="text-slate-300">Completed vertical column (striking all 3 rows across any dimension)</span>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <h3 className="font-hud text-xs text-cyan-300 mb-2">TIERED SPEED BONUSES (Within 30s Window)</h3>
            <ul className="space-y-1.5 text-xs font-mono text-slate-300">
              <li className="flex justify-between">
                <span>0s to 5s elapsed (25s-30s left):</span>
                <span className="text-emerald-400 font-bold">+50 PTS</span>
              </li>
              <li className="flex justify-between">
                <span>5s to 15s elapsed (15s-25s left):</span>
                <span className="text-cyan-400 font-bold">+30 PTS</span>
              </li>
              <li className="flex justify-between">
                <span>15s to 25s elapsed (0s-15s left):</span>
                <span className="text-slate-300 font-bold">+10 PTS</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <h3 className="font-hud text-xs text-amber-300 mb-2">FULL HOUSE B-I-N-G-O PLACEMENT</h3>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold">1st Place: +500 PTS</span>
              <span className="text-slate-300 font-bold">2nd: +300 PTS</span>
              <span className="text-amber-600 font-bold">3rd: +150 PTS</span>
            </div>
          </div>
        </div>

        {/* Section 3: Character Voice Synthesis & Alan Silvestri Theme */}
        <div className="rounded-xl border border-indigo-500/30 bg-slate-900/70 p-6 backdrop-blur">
          <div className="flex items-center gap-2 mb-3 text-indigo-400">
            <Mic className="w-5 h-5" />
            <h2 className="font-hud text-lg font-bold tracking-wide">AVENGERS THEME & VOCAL PROFILES</h2>
          </div>

          <div className="p-3 mb-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs font-mono text-indigo-200">
            <span className="font-bold text-cyan-300 block mb-1">ALAN SILVESTRI "THE AVENGERS" THEME</span>
            <span>
              The iconic orchestral score plays on the Host Arena at <strong>20% volume</strong>. When a voiceover transmits or the timer clicks (final 5s), volume ducks to <strong>3% - 4%</strong>. When the transmission concludes, music gradually swells back to <strong>20%</strong>.
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-tactical">
            <div className="p-2.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20">
              <div className="font-hud text-cyan-300 flex items-center justify-between mb-0.5">
                <span>ROBOTIC / SYNTHETIC</span>
                <span className="font-mono text-[10px]">Pitch: 0.65 - 0.80 // Telemetry Chime</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Ultron, J.A.R.V.I.S., F.R.I.D.A.Y., Vision, E.D.I.T.H., K.A.R.E.N.
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-pink-500/20 bg-pink-950/20">
              <div className="font-hud text-pink-300 flex items-center justify-between mb-0.5">
                <span>FEMALE HEROES</span>
                <span className="font-mono text-[10px]">Pitch: 1.12 - 1.45 // Crystal Chime</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Scarlet Witch, Shuri, Nebula, Jean Grey, Wasp
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-blue-500/20 bg-blue-950/20">
              <div className="font-hud text-blue-300 flex items-center justify-between mb-0.5">
                <span>MALE HEROES</span>
                <span className="font-mono text-[10px]">Pitch: 0.85 - 1.15 // Stark Radio Beep</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Iron Man, Doctor Strange, Spider-Man, Thor, Loki, Deadpool, Thanos, Hawkeye, Captain America, Black Panther, Wolverine, Hulk, Doctor Doom, Rocket Raccoon, Groot, Magneto, Fantastic Four
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: The 5 Digital Dimensions & Stamp Insignias */}
        <div className="rounded-xl border border-purple-500/30 bg-slate-900/70 p-6 backdrop-blur">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-hud text-lg font-bold tracking-wide">5 MULTIVERSE DIMENSIONS</h2>
          </div>

          <div className="space-y-2 mb-4">
            {DIMENSIONS.map((dim, i) => (
              <div
                key={dim.name}
                className="flex items-center justify-between p-2 rounded bg-slate-800/60 border border-slate-700/60 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
                  <span className="font-bold text-slate-200">{dim.name}</span>
                </div>
                <span className="text-slate-400">COLUMN {i + 1} // 3 TILES</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <h3 className="font-hud text-xs text-purple-300 mb-2">CUSTOM MARVEL STAMP INSIGNIAS</h3>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className="p-2 rounded bg-slate-800/80 border border-cyan-500/30 flex flex-col items-center gap-1">
                <MarvelInsignia type="arc_reactor" size={20} />
                <span className="text-cyan-300">Arc Reactor</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-red-500/30 flex flex-col items-center gap-1">
                <MarvelInsignia type="cap_shield" size={20} />
                <span className="text-red-300">Cap's Shield</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-blue-500/30 flex flex-col items-center gap-1">
                <MarvelInsignia type="thor_hammer" size={20} />
                <span className="text-blue-300">Thor Hammer</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-purple-500/30 flex flex-col items-center gap-1">
                <MarvelInsignia type="quantum_core" size={20} />
                <span className="text-purple-300">Quantum Core</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
