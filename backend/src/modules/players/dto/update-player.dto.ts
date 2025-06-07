import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsOptional, IsString, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty({ required: false, example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'Forward' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ required: false, example: 85 })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({ required: false, example: 80 })
  @IsOptional()
  @IsNumber()
  fitness?: number;

  @ApiProperty({ required: false, example: 75 })
  @IsOptional()
  @IsNumber()
  technical?: number;

  @ApiProperty({ required: false, example: { goals: 5 } })
  @IsOptional()
  @IsObject()
  stats?: Record<string, unknown>;
}
