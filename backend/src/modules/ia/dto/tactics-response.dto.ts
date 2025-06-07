import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TacticsResponseDto {
  @ApiProperty({ example: 'Press high and attack on wings' })
  @IsString()
  tactics!: string;
}
