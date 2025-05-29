import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class MatchPredictionRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  homeTeam!: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  awayTeam!: string[];
}
