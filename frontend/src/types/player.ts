export interface PlayerStats {
  [key: string]: number;
}

export interface Player {
  id: string;
  name: string;
  position?: string;
  score?: number;
  stats?: PlayerStats;
  fitness?: number;
  technical?: number;
}

export interface CreatePlayerInput {
  name: string;
  position?: string;
  score?: number;
  stats?: PlayerStats;
  fitness?: number;
  technical?: number;
}
