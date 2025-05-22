import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(@InjectRepository(Player) private repo: Repository<Player>) {}

  create(data: CreatePlayerDto) {
    const player = this.repo.create(data);
    return this.repo.save(player);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const player = await this.repo.findOne({ where: { id } });
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async update(id: string, data: UpdatePlayerDto) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Player not found');
  }
}
