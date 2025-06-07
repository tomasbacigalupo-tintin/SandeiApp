import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormationDto {
  @ApiProperty({ example: '4-4-2' })
  @IsString()
  name!: string;

  @ApiProperty({ required: false, example: 'Classic formation' })
  @IsOptional()
  @IsString()
  description?: string;
}
