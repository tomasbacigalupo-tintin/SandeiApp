import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Player } from './player.entity';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playersRepo: Repository<Player>,
    private readonly ratingsService: RatingsService,
  ) {}

  create(data: Partial<Player>, tenantId: string): Promise<Player> {
    const player = this.playersRepo.create({ ...data, tenantId });
    return this.playersRepo.save(player);
  }

  findAll(tenantId: string): Promise<Player[]> {
    return this.playersRepo.find({ where: { tenantId } });
  }

  findOne(id: string, tenantId: string): Promise<Player> {
    return this.playersRepo.findOneByOrFail({ id, tenantId });
  }

  searchByName(name: string, tenantId: string): Promise<Player[]> {
    return this.playersRepo.find({ where: { name: ILike(`%${name}%`), tenantId } });
  }

  searchByPosition(position: string, tenantId: string): Promise<Player[]> {
    return this.playersRepo.find({
      where: { position: ILike(`%${position}%`), tenantId },
    });
  }

  async update(id: string, tenantId: string, data: Partial<Player>): Promise<Player> {
    await this.playersRepo.update({ id, tenantId }, data as QueryDeepPartialEntity<Player>);
    return this.playersRepo.findOneByOrFail({ id, tenantId });
  }

  async remove(id: string, tenantId: string): Promise<Player> {
    const player = await this.playersRepo.findOneByOrFail({ id, tenantId });
    await this.playersRepo.remove(player);
    return player;
  }

  getAverageRating(id: string, tenantId: string): Promise<number> {
    void tenantId;
    return this.ratingsService.averageForPlayer(id);
  }
}
