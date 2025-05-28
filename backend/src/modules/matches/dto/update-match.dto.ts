import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsOptional } from "class-validator";
wg5n1l-codex/debugging-sandeiapp-con-docker-compose
import { Transform, TransformFnParams } from "class-transformer";

import { CreateMatchDto } from "./create-match.dto";

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsOptional()
  @IsDateString()
 wg5n1l-codex/debugging-sandeiapp-con-docker-compose
  @Transform(({ value }: TransformFnParams) => value ? new Date(value) : undefined)
  date?: Date;
}
