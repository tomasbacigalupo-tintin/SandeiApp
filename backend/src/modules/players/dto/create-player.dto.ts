import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  score?: number;
}
