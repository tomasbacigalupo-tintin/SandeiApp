import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playersRepo: Repository<Player>,
  ) {}

  create(data: Partial<Player>) {
    const player = this.playersRepo.create(data);
    return this.playersRepo.save(player);
  }

  findAll() {
    return this.playersRepo.find();
  }

  findOne(id: string) {
    return this.playersRepo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Player>) {
    await this.playersRepo.update(id, data);
    return this.playersRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const player = await this.playersRepo.findOne({ where: { id } });
    if (player) {
      await this.playersRepo.remove(player);
    }
    return player;
  }
}
