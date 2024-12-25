export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';

export interface Match {
  id: string;
  status: MatchStatus;
  teams: {
    home: Team;
    away: Team;
  };
  venue: Venue;
  startTime: Date;
  lastUpdated: Date;
  currentInnings?: Innings;
  previousInnings?: Innings[];
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  role: 'BATSMAN' | 'BOWLER' | 'ALL_ROUNDER';
  battingStats?: BattingStats;
  bowlingStats?: BowlingStats;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
}

export interface Innings {
  battingTeam: string;
  bowlingTeam: string;
  runs: number;
  wickets: number;
  overs: number;
  currentBatsmen: {
    striker: BatsmanScore;
    nonStriker: BatsmanScore;
  };
  currentBowler: BowlerStats;
}

export interface BatsmanScore {
  playerId: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
}

export interface BowlerStats {
  playerId: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
}

export interface BattingStats {
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  highestScore: number;
}

export interface BowlingStats {
  matches: number;
  wickets: number;
  economy: number;
  average: number;
  bestFigures: string;
}