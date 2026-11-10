export type DimensionName =
  | 'AI HEROES'
  | 'PROGRAMMING'
  | 'CLOUD'
  | 'ANALYTICS'
  | 'EMERGING TECH';

export type CharacterType = 'robotic' | 'female' | 'male';

export interface MarvelQuestion {
  id: string;
  dimension: DimensionName;
  character: string;
  characterType: CharacterType;
  clue: string;
  answer: string;
  explanation: string;
}

export interface BingoTile {
  id: string;
  dimension: DimensionName;
  term: string;
  columnIndex: number; // 0 to 4
  rowIndex: number;    // 0 to 2
  isStamped: boolean;
  stampedAtQuestionIndex?: number;
  stampedAtTimestamp?: number;
}

export type InsigniaType = 'arc_reactor' | 'cap_shield' | 'thor_hammer' | 'quantum_core' | 'miss_minutes';

export interface PlayerState {
  id: string;
  name: string;
  score: number;
  columnsCompleted: number; // 0 - 5
  completedColumnsList: number[]; // indices 0 - 4
  bingoAchieved: boolean;
  bingoRank?: number; // 1, 2, 3
  bingoTimestamp: number | null;
  correctTaps: number;
  wrongTaps: number;
  currentQAttempts: number; // Attempts for the active question (1st, 2nd, 3rd+)
  totalAttempts: number;    // Cumulative attempts across match
  firstAttemptStamps: number; // Count of tiles solved on 1st attempt
  isLockedOutForCurrentQ?: boolean; // Kept as optional false for compatibility
  cardMatrix: BingoTile[][]; // 3 rows x 5 columns
  insignia: InsigniaType;
}

export interface WaitingQueueEntry {
  id: string;
  name: string;
  joinedAt: number;
}

export type DifficultyLevel = 'non_tech' | 'tech_easy' | 'tech_medium';

export interface DifficultyConfig {
  id: DifficultyLevel;
  label: string;
  name?: string;
  tagline: string;
  badgeColor: string;
  color?: string;
  description: string;
}

export type TurnPhase = 'reading' | 'answering' | 'warning' | 'reveal';

export interface GameState {
  sessionPin: string;
  gameMode: 'individual' | 'team';
  difficulty: DifficultyLevel;
  maxCapacity: number; // 1 to 6
  status: 'lobby' | 'playing' | 'paused' | 'finished';
  currentQuestionIndex: number; // 0 to 14
  phase: TurnPhase;
  timerSeconds: number; // 0 to 40
  isPaused: boolean;
  selectedQuestions: MarvelQuestion[];
  players: PlayerState[];
  waitingQueue: WaitingQueueEntry[];
  startTime: number | null;
  endTime: number | null;
  finishOrder: Array<{ playerId: string; timestamp: number; rank: number }>;
}

export interface LobbyConfig {
  gameMode: 'individual' | 'team';
  difficulty?: DifficultyLevel;
  maxCapacity: number;
}

