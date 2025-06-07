import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LineupRequestDto {
  @ApiProperty({ type: [String], example: ['player1', 'player2'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  players!: string[];

  @ApiProperty({ example: '4-4-2' })
  @IsString()
  formation!: string;
}
