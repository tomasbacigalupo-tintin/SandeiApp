import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFormationDto {
  @ApiProperty({ required: false, example: '4-3-3' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'Offensive style' })
  @IsOptional()
  @IsString()
  description?: string;
}
