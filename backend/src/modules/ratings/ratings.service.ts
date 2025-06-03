import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Rating } from './rating.entity';
import { Match } from '../matches/match.entity';
import { Player } from '../players/player.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingsRepo: Repository<Rating>,
    @InjectRepository(Match) private matchesRepo: Repository<Match>,
    @InjectRepository(Player) private playersRepo: Repository<Player>,
    private dataSource: DataSource,
  ) {}

  async create(matchId: string, playerId: string, score: number, comment?: string): Promise<Rating> {
    return this.dataSource.transaction(async manager => {
      const match = await manager.findOne(Match, { where: { id: matchId } });
      if (!match) throw new NotFoundException('Match not found');

      const player = await manager.findOne(Player, { where: { id: playerId } });
      if (!player) throw new NotFoundException('Player not found');

      if (score < 0 || score > 10) {
        throw new BadRequestException('Score must be between 0 and 10');
      }

      const existing = await manager.findOne(Rating, {
        where: { match: { id: matchId }, player: { id: playerId } },
      });
      if (existing) {
        throw new BadRequestException('Rating already exists for this player and match');
      }

      const rating = manager.create(Rating, { score, comment, match, player });
      return manager.save(rating);
    });
  }

  async averageForPlayer(playerId: string, since?: Date): Promise<number> {
    const qb = this.ratingsRepo
      .createQueryBuilder('rating')
      .select('AVG(rating.score)', 'avg')
      .where('rating.playerId = :playerId', { playerId });

    if (since) {
      qb.leftJoin('rating.match', 'match').andWhere('match.date >= :since', {
        since,
      });
    }

    const result = await qb.getRawOne<{ avg: string | null }>();
    const avg = result?.avg;
    return avg ? parseFloat(avg) : 0;
  }
}

