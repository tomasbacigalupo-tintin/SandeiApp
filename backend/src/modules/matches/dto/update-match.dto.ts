import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsOptional } from "class-validator";
import { CreateMatchDto } from "./create-match.dto";

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsOptional()
  @IsDateString()
  date?: string;
}
