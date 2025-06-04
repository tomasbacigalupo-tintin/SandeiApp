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

  async create(data: Partial<Match>) {
    const match = this.matchesRepo.create(data);
    const saved = await this.matchesRepo.save(match);
    await this.rabbit.publish('matches.created', saved);
    return saved;
  }

  findAll() {
    return this.matchesRepo.find();
  }

  findById(id: string) {
    return this.matchesRepo.findOneByOrFail({ id });
  }

  async update(id: string, data: Partial<Match>) {
    await this.matchesRepo.update(id, data);
    return this.matchesRepo.findOneByOrFail({ id });
  }

  async remove(id: string) {
    const match = await this.matchesRepo.findOneByOrFail({ id });
    await this.matchesRepo.remove(match);
    return match;
  }
}
