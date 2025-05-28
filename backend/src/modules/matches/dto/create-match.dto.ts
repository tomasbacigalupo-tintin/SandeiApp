import { IsDateString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class CreateMatchDto {
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  date!: Date;
}
