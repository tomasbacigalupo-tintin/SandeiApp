import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MatchPredictionResponseDto {
  @ApiProperty({ example: 'Home team wins 2-1' })
  @IsString()
  prediction!: string;
}
