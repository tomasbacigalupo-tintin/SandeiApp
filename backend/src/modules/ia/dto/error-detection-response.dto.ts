import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetectionResponseDto {
  @ApiProperty({ example: 'No errors found' })
  @IsString()
  report!: string;
}
