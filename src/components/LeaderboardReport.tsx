import React from 'react';
import {
  Trophy,
  Award,
  Download,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Percent,
  Clock,
  Timer,
  Zap,
  Sparkles
} from 'lucide-react';
import { GameState, PlayerState } from '../types/bingo.js';
import { MarvelInsignia } from './MarvelInsignia.js';

interface LeaderboardReportProps {
  gameState: GameState;
  rankings: PlayerState[];
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const LeaderboardReport: React.FC<LeaderboardReportProps> = ({
  gameState,
  rankings,
  onPlayAgain,
  onGoHome
}) => {
  // Sort players by score descending
  const sortedPlayers = [...rankings].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.columnsCompleted !== a.columnsCompleted) return b.columnsCompleted - a.columnsCompleted;
    return a.wrongTaps - b.wrongTaps;
  });

  // Calculate Total Game Time & Average Time Per Question
  const totalQuestions = gameState.selectedQuestions?.length || 15;
  const startTime = gameState.startTime || (Date.now() - 15 * 40 * 1000);
  const endTime = gameState.endTime || Date.now();
  const totalDurationMs = Math.max(1000, endTime - startTime);
  const totalSeconds = Math.round(totalDurationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  const formattedGameTime = `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
  const avgSecondsPerQ = (totalSeconds / totalQuestions).toFixed(1);

  // Client-side CSV generation & download
  const handleExportCSV = () => {
    const rows: string[] = [];
    rows.push('# MULTIVERSE BINGO - MATCH PERFORMANCE AUDIT');
    rows.push(`# Session PIN: ${gameState.sessionPin}`);
    rows.push(`# Difficulty Track: ${gameState.difficulty || 'tech_easy'}`);
    rows.push(`# Game Mode: ${gameState.gameMode || 'individual'}`);
    rows.push(`# Total Game Time: ${formattedGameTime} (${totalSeconds}s)`);
    rows.push(`# Average Time Per Question: ${avgSecondsPerQ}s`);
    rows.push(`# Total Questions Completed: ${totalQuestions}`);
    rows.push('');
    rows.push(['Rank', 'Name', 'Score', 'Columns Completed', 'Correct Tiles', 'Total Attempts', '1st Attempt Solves', 'Accuracy %', 'BINGO Achieved', 'Finish Timestamp'].join(','));

    sortedPlayers.forEach((p, idx) => {
      const totalTaps = p.totalAttempts || (p.correctTaps + p.wrongTaps);
      const accuracy = totalTaps > 0 ? ((p.correctTaps / totalTaps) * 100).toFixed(1) : '0.0';
      const bingoTime = p.bingoTimestamp ? new Date(p.bingoTimestamp).toLocaleTimeString() : 'N/A';
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
        `"${bingoTime}"`
      ].join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `marvel-multiverse-bingo-${gameState.sessionPin}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Report Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>MISSION DEBRIEF // FINAL PERFORMANCE AUDIT</span>
        </div>

        <h1 className="font-hud text-3xl sm:text-4xl font-extrabold text-white tracking-wider">
          MULTIVERSE LEADERBOARD
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1">
          SESSION PIN: <span className="text-cyan-400 font-bold">{gameState.sessionPin}</span> // 15 TRANSMISSIONS COMPLETED
        </p>
      </div>

      {/* Total Game Time & Mission Performance Top Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        <div className="rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 to-slate-900/90 p-4 text-center hud-glow-amber">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-amber-400 mb-1">
            <Timer className="w-3.5 h-3.5" />
            <span>TOTAL GAME TIME</span>
          </div>
          <div className="font-hud font-black text-2xl text-amber-300 tracking-wider">
            {formattedGameTime}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            {totalSeconds} SECONDS TOTAL
          </div>
        </div>

        <div className="rounded-xl border border-cyan-500/40 bg-slate-900/80 p-4 text-center hud-glow">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>AVG TIME / QUESTION</span>
          </div>
          <div className="font-hud font-black text-2xl text-cyan-300 tracking-wider">
            {avgSecondsPerQ}s
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            PACING EFFICIENCY
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>QUESTIONS SOLVED</span>
          </div>
          <div className="font-hud font-black text-2xl text-white tracking-wider">
            {totalQuestions} / {totalQuestions}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            ALL QUESTIONS FINISHED
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>PARTICIPANTS</span>
          </div>
          <div className="font-hud font-black text-2xl text-white tracking-wider">
            {sortedPlayers.length}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            {gameState.gameMode === 'team' ? 'TEAMS CONTESTED' : 'HEROES CONTESTED'}
          </div>
        </div>
      </div>

      {/* Top 3 Podium Highlights (if >= 2 participants) */}
      {sortedPlayers.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          {sortedPlayers[1] && (
            <div className="order-2 md:order-1 rounded-2xl border border-slate-700 bg-slate-900/80 p-5 text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center mx-auto mb-3 font-hud font-bold text-slate-200">
                  2ND
                </div>
                <div className="font-hud font-bold text-lg text-white mb-1">
                  {sortedPlayers[1].name}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  AGENT 02
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="font-hud text-2xl font-black text-slate-300">
                  {sortedPlayers[1].score} <span className="text-xs font-normal text-slate-400">PTS</span>
                </span>
              </div>
            </div>
          )}

          {/* 1st Place (Center / Taller) */}
          {sortedPlayers[0] && (
            <div className="order-1 md:order-2 rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-950/40 to-slate-900/90 p-6 text-center flex flex-col justify-between shadow-[0_0_30px_rgba(245,158,11,0.25)]">
              <div>
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-3 font-hud font-black text-2xl text-amber-400 animate-pulse">
                  1ST
                </div>
                <div className="font-hud font-black text-xl text-white mb-1">
                  {sortedPlayers[0].name}
                </div>
                <div className="text-xs font-mono text-amber-400">
                  CHAMPION OF THE MULTIVERSE
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/30">
                <span className="font-hud text-3xl font-black text-amber-300">
                  {sortedPlayers[0].score} <span className="text-xs font-normal text-slate-400">PTS</span>
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {sortedPlayers[2] && (
            <div className="order-3 rounded-2xl border border-amber-900/60 bg-slate-900/80 p-5 text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-amber-950 border-2 border-amber-700 flex items-center justify-center mx-auto mb-3 font-hud font-bold text-amber-600">
                  3RD
                </div>
                <div className="font-hud font-bold text-lg text-white mb-1">
                  {sortedPlayers[2].name}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  AGENT 03
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="font-hud text-2xl font-black text-amber-600">
                  {sortedPlayers[2].score} <span className="text-xs font-normal text-slate-400">PTS</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detailed Metrics Table */}
      <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-6 mb-8 hud-glow overflow-x-auto">
        <h2 className="font-hud text-base font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>RANKED PARTICIPANT PERFORMANCE AUDIT</span>
        </h2>

        <table className="w-full text-left text-xs font-mono min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-3 px-3">RANK</th>
              <th className="pb-3 px-3">CALLSIGN</th>
              <th className="pb-3 px-3 text-right">TOTAL POINTS</th>
              <th className="pb-3 px-3 text-center">COLUMNS</th>
              <th className="pb-3 px-3 text-center">ACCURACY</th>
              <th className="pb-3 px-3 text-center">TOTAL ATTEMPTS</th>
              <th className="pb-3 px-3 text-center">1ST-TRY SOLVES</th>
              <th className="pb-3 px-3 text-right">BINGO TIME</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedPlayers.map((player, idx) => {
              const totalTaps = player.totalAttempts || (player.correctTaps + player.wrongTaps);
              const accuracy = totalTaps > 0 ? ((player.correctTaps / totalTaps) * 100).toFixed(0) : '0';
              const isWinner = idx === 0;

              return (
                <tr
                  key={player.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isWinner ? 'bg-amber-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-hud font-bold text-sm">
                    {idx === 0 ? (
                      <span className="text-amber-400">#01</span>
                    ) : (
                      <span className="text-slate-400">#{String(idx + 1).padStart(2, '0')}</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2 font-hud font-bold text-slate-100">
                      <MarvelInsignia type={player.insignia} size={18} />
                      <span>{player.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-hud font-bold text-cyan-300 text-sm">
                    {player.score}
                  </td>
                  <td className="py-3 px-3 text-center text-amber-400 font-bold">
                    {player.columnsCompleted} / 5
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                      {accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300">
                    <span className="text-cyan-400 font-bold">{totalTaps}</span> attempts
                  </td>
                  <td className="py-3 px-3 text-center text-amber-400 font-bold">
                    {player.firstAttemptStamps || 0} / 15
                  </td>
                  <td className="py-3 px-3 text-right text-slate-400">
                    {player.bingoTimestamp ? (
                      <span className="text-amber-400 font-bold">
                        {new Date(player.bingoTimestamp).toLocaleTimeString()}
                      </span>
                    ) : (
                      <span className="text-slate-600">INCOMPLETE</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>DOWNLOAD MATCH PERFORMANCE CSV</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onPlayAgain}
            className="px-5 py-2.5 rounded-xl font-hud font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            onClick={onGoHome}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>COMMAND MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
