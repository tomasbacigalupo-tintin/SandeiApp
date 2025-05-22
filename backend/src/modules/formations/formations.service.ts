import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Formation } from "./formation.entity";

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation) private formationsRepo: Repository<Formation>,
  ) {}

  create(data: Partial<Formation>) {
    const formation = this.formationsRepo.create(data);
    return this.formationsRepo.save(formation);
  }

  findAll() {
    return this.formationsRepo.find();
  }

  findById(id: string) {
    return this.formationsRepo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Formation>) {
    await this.formationsRepo.update(id, data);
    return this.formationsRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const formation = await this.formationsRepo.findOne({ where: { id } });
    if (formation) {
      await this.formationsRepo.remove(formation);
    }
    return formation;
  }
}
