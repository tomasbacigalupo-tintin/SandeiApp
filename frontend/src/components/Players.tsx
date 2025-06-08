import { toast } from '@/components/ui/use-toast';

export interface PlayerStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

const initialStats: PlayerStats = {
  gamesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
};

// ...existing code...