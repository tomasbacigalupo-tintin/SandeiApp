import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoutedPlayer } from './scouted-player.entity';

@Injectable()
export class ScoutingService {
  constructor(
    @InjectRepository(ScoutedPlayer)
    private readonly repo: Repository<ScoutedPlayer>,
  ) {}

  create(data: Partial<ScoutedPlayer>, tenantId: string) {
    const entity = this.repo.create({ ...data, tenantId });
    return this.repo.save(entity);
  }

  findAll(tenantId: string) {
    return this.repo.find({ where: { tenantId } });
  }
}
