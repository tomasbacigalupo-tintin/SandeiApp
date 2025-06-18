import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateScoutedPlayerDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
