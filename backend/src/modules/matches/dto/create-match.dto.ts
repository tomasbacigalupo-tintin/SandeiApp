import { IsDateString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateMatchDto {
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  date!: Date;
}
