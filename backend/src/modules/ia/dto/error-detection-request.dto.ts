import { IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetectionRequestDto {
  @ApiProperty({ type: [String], example: ['player1', 'player2'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  lineup!: string[];

  @ApiProperty({ required: false, example: '4-4-2' })
  @IsOptional()
  @IsString()
  formation?: string;
}
