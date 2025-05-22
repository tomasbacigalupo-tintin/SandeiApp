import { IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsUUID()
  playerId!: string;

  @IsInt()
  @Min(0)
  @Max(10)
  score!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
