import { Injectable } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { RatingsService } from '../ratings/ratings.service';

export interface StatItem {
  name: string;
  value: number;
}

@Injectable()
export class StatsService {
  constructor(
    private playersService: PlayersService,
    private ratingsService: RatingsService,
  ) {}

  async getStats(range: 'month' | 'season'): Promise<StatItem[]> {
    const players = await this.playersService.findAll();
    const result: StatItem[] = [];
    for (const player of players) {
      const avg = await this.ratingsService.averageForPlayer(player.id);
      result.push({ name: player.name, value: avg });
    }
    return result;
  }
}
