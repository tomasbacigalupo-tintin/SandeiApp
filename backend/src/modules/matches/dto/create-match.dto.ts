import { IsDateString } from "class-validator";
 wg5n1l-codex/debugging-sandeiapp-con-docker-compose
import { Transform, TransformFnParams } from "class-transformer";

export class CreateMatchDto {
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  date!: Date;
}
