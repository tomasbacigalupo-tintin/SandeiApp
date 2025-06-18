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

  async getStats(range: 'month' | 'season', tenantId?: string): Promise<StatItem[]> {
    const players = await this.playersService.findAll(tenantId ?? '');
    const since =
      range === 'month'
        ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        : undefined;

    const avgPromises = players.map(player =>
      this.ratingsService.averageForPlayer(player.id, since),
    );

    const averages = await Promise.all(avgPromises);
    return players.map((player, index) => ({
      name: player.name,
      value: averages[index],
    }));
  }
}
