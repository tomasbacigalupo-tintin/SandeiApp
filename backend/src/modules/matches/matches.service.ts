import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match } from "./match.entity";
import { RabbitMQService } from "../../messaging/rabbitmq.service";

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private matchesRepo: Repository<Match>,
    private readonly rabbit: RabbitMQService,
  ) {}

  async create(data: Partial<Match>, tenantId: string) {
    const match = this.matchesRepo.create({ ...data, tenantId });
    const saved = await this.matchesRepo.save(match);
    await this.rabbit.publish('matches.created', saved);
    return saved;
  }

  findAll(tenantId: string) {
    return this.matchesRepo.find({ where: { tenantId } });
  }

  findById(id: string, tenantId: string) {
    return this.matchesRepo.findOneByOrFail({ id, tenantId });
  }

  async update(id: string, tenantId: string, data: Partial<Match>) {
    await this.matchesRepo.update({ id, tenantId }, data);
    return this.matchesRepo.findOneByOrFail({ id, tenantId });
  }

  async remove(id: string, tenantId: string) {
    const match = await this.matchesRepo.findOneByOrFail({ id, tenantId });
    await this.matchesRepo.remove(match);
    return match;
  }
}
