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
    return this.matchesRepo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Match>) {
    await this.matchesRepo.update(id, data);
    return this.matchesRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const match = await this.matchesRepo.findOne({ where: { id } });
    if (match) {
      await this.matchesRepo.remove(match);
    }
    return match;
  }
}
