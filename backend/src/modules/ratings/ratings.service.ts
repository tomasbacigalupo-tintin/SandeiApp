import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { Match } from '../matches/match.entity';
import { Player } from '../players/player.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingsRepo: Repository<Rating>,
    @InjectRepository(Match) private matchesRepo: Repository<Match>,
    @InjectRepository(Player) private playersRepo: Repository<Player>,
  ) {}

  async create(matchId: string, playerId: string, score: number, comment?: string) {
    const match = await this.matchesRepo.findOne({ where: { id: matchId } });
    if (!match) throw new NotFoundException('Match not found');
    const player = await this.playersRepo.findOne({ where: { id: playerId } });
    if (!player) throw new NotFoundException('Player not found');
    const rating = this.ratingsRepo.create({ score, comment, match, player });
    return this.ratingsRepo.save(rating);
  }
}

