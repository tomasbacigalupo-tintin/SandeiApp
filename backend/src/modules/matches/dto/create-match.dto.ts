import { IsDateString } from "class-validator";

export class CreateMatchDto {
  @IsDateString()
  date!: string;
}
