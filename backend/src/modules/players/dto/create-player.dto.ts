import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ required: false, example: 'Forward' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ required: false, example: 85 })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({ required: false, example: { goals: 5, assists: 3 } })
  @IsOptional()
  @IsObject()
  stats?: Record<string, unknown>;

  @ApiProperty({ required: false, example: 80 })
  @IsOptional()
  @IsNumber()
  fitness?: number;

  @ApiProperty({ required: false, example: 75 })
  @IsOptional()
  @IsNumber()
  technical?: number;
}
