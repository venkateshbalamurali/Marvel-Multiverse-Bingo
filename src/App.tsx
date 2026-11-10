import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Navbar } from './components/Navbar.js';
import { HomeDashboard } from './components/HomeDashboard.js';
import { HostArena } from './components/HostArena.js';
import { PlayerBoard } from './components/PlayerBoard.js';
import { MissionProtocol } from './components/MissionProtocol.js';
import { LeaderboardReport } from './components/LeaderboardReport.js';
import { DifficultyLevel, GameState, PlayerState } from './types/bingo.js';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'host' | 'player' | 'protocol' | 'leaderboard'>('dashboard');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('tech_easy');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionPin, setSessionPin] = useState<string | null>(null);
  const [urlJoinPin, setUrlJoinPin] = useState<string | null>(null);
  const [finishedMatchState, setFinishedMatchState] = useState<GameState | null>(null);
  const [finishedRankings, setFinishedRankings] = useState<PlayerState[]>([]);

  // Initialize Socket.io connection on mount & parse URL parameters
  useEffect(() => {
    const s = io(window.location.origin, {
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });
    setSocket(s);

    // Check URL parameters for direct join or mode
    const params = new URLSearchParams(window.location.search);
    const joinParam = params.get('join');
    const modeParam = params.get('mode');

    if (joinParam) {
      setUrlJoinPin(joinParam.toUpperCase());
      setCurrentView('player');
    } else if (modeParam === 'host') {
      setCurrentView('host');
    } else if (modeParam === 'player') {
      setCurrentView('player');
    }

    return () => {
      s.disconnect();
    };
  }, []);

  const handleGoHome = () => {
    setCurrentView('dashboard');
    setSessionPin(null);
  };

  const handleMatchFinished = (gameState: GameState, rankings: PlayerState[]) => {
    setFinishedMatchState(gameState);
    setFinishedRankings(rankings);
    setCurrentView('leaderboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 stark-scanline flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Persistent Stark Industries Top Navbar */}
      <Navbar
        sessionPin={sessionPin || urlJoinPin}
        onGoHome={currentView === 'host' || currentView === 'protocol' || currentView === 'leaderboard' ? handleGoHome : undefined}
        gameStatus={
          currentView === 'host'
            ? 'HOST ARENA'
            : currentView === 'player'
            ? 'MATRIX CLIENT'
            : currentView === 'protocol'
            ? 'PROTOCOL'
            : undefined
        }
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'dashboard' && (
          <HomeDashboard
            onSelectHostArena={(diff) => {
              if (diff) setSelectedDifficulty(diff);
              setCurrentView('host');
            }}
            onSelectPlayerBoard={() => setCurrentView('player')}
            onSelectMissionProtocol={() => setCurrentView('protocol')}
          />
        )}

        {currentView === 'host' && (
          <HostArena
            socket={socket}
            initialDifficulty={selectedDifficulty}
            onExit={handleGoHome}
            onMatchFinished={handleMatchFinished}
          />
        )}

        {currentView === 'player' && (
          <PlayerBoard
            socket={socket}
            initialPin={urlJoinPin}
            onExit={handleGoHome}
          />
        )}

        {currentView === 'protocol' && (
          <MissionProtocol onBack={handleGoHome} />
        )}

        {currentView === 'leaderboard' && finishedMatchState && (
          <LeaderboardReport
            gameState={finishedMatchState}
            rankings={finishedRankings}
            onPlayAgain={() => setCurrentView('host')}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Persistent Subtle Stark Telemetry Footer */}
      <footer className="no-print border-t border-slate-900 bg-slate-950/80 px-4 py-2.5 text-center text-[11px] font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>STARK INDUSTRIES TACTICAL HUD // 3x5 MULTIVERSE BINGO ENGINE</span>
          </div>
          <div>
            <span>SYSTEM ENCRYPTION: AES-256 // PROTOCOL SYNCHRONIZED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
