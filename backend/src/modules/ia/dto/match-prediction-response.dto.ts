import { IsString } from 'class-validator';

export class MatchPredictionResponseDto {
  @IsString()
  prediction!: string;
}
