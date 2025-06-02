import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsObject()
  stats?: Record<string, unknown>;

  @IsOptional()
  @IsNumber()
  fitness?: number;

  @IsOptional()
  @IsNumber()
  technical?: number;
}
