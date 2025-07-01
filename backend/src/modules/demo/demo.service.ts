import { Injectable } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { MatchesService } from '../matches/matches.service';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class DemoService {
  constructor(
    private players: PlayersService,
    private matches: MatchesService,
    private ratings: RatingsService,
  ) {}

  async createDemoData() {
    const tenant = 'demo';
    const playerPromises = Array.from({ length: 11 }).map((_, i) =>
      this.players.create({
        name: `Demo ${i + 1}`,
        position: 'N/A',
        score: Math.floor(Math.random() * 10),
        technical: Math.floor(Math.random() * 10),
        fitness: Math.floor(Math.random() * 10),
      }, tenant),
    );
    const players = await Promise.all(playerPromises);

    const match1 = await this.matches.create({ date: new Date() }, tenant);
    const match2 = await this.matches.create({
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    }, tenant);

    for (const match of [match1, match2]) {
      for (const player of players) {
        await this.ratings.create(match.id, player.id, Math.floor(Math.random() * 10));
      }
    }
    return { players, matches: [match1, match2] };
  }
}
