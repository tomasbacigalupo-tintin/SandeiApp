import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Player } from './player.entity';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playersRepo: Repository<Player>,
    private readonly ratingsService: RatingsService,
  ) {}

  create(data: Partial<Player>): Promise<Player> {
    const player = this.playersRepo.create(data);
    return this.playersRepo.save(player);
  }

  findAll(): Promise<Player[]> {
    return this.playersRepo.find();
  }

  findOne(id: string): Promise<Player> {
    return this.playersRepo.findOneByOrFail({ id });
  }

  searchByName(name: string): Promise<Player[]> {
    return this.playersRepo.find({ where: { name: ILike(`%${name}%`) } });
  }

  searchByPosition(position: string): Promise<Player[]> {
    return this.playersRepo.find({ where: { position: ILike(`%${position}%`) } });
  }

  async update(id: string, data: Partial<Player>): Promise<Player> {
    await this.playersRepo.update(id, data);
    return this.playersRepo.findOneByOrFail({ id });
  }

  async remove(id: string): Promise<Player> {
    const player = await this.playersRepo.findOneByOrFail({ id });
    await this.playersRepo.remove(player);
    return player;
  }

  getAverageRating(id: string): Promise<number> {
    return this.ratingsService.averageForPlayer(id);
  }
}
