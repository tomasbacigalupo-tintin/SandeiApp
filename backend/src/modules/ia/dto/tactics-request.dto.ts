import { IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TacticsRequestDto {
  @ApiProperty({ type: [String], example: ['player1', 'player2'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  players!: string[];

  @ApiProperty({ required: false, example: 'defensive' })
  @IsOptional()
  @IsString()
  style?: string;
}
