import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match } from "./match.entity";

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private matchesRepo: Repository<Match>,
  ) {}

  create(data: Partial<Match>) {
    const match = this.matchesRepo.create(data);
    return this.matchesRepo.save(match);
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
