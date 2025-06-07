import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MatchPredictionRequestDto {
  @ApiProperty({ type: [String], example: ['player1', 'player2'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  homeTeam!: string[];

  @ApiProperty({ type: [String], example: ['player3', 'player4'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  awayTeam!: string[];
}
