import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  score?: number;
}
