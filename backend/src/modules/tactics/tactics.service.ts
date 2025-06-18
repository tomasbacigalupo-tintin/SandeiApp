import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tactic } from './tactic.entity';

@Injectable()
export class TacticsService {
  constructor(
    @InjectRepository(Tactic) private tacticsRepo: Repository<Tactic>,
  ) {}

  create(data: Partial<Tactic>, tenantId: string) {
    const tactic = this.tacticsRepo.create({ ...data, tenantId });
    return this.tacticsRepo.save(tactic);
  }

  findAll(tenantId: string) {
    return this.tacticsRepo.find({ where: { tenantId } });
  }
}
