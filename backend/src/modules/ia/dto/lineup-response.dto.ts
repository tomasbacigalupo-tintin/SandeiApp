import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LineupResponseDto {
  @ApiProperty({ example: 'Suggested lineup text' })
  @IsString()
  lineup!: string;
}
