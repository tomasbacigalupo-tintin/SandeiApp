import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { CreateMatchDto } from "./create-match.dto";

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  date?: Date;
}
