import { IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ example: 'player-uuid' })
  @IsUUID()
  playerId!: string;

  @ApiProperty({ minimum: 0, maximum: 10, example: 7 })
  @IsInt()
  @Min(0)
  @Max(10)
  score!: number;

  @ApiProperty({ required: false, example: 'Great match!' })
  @IsOptional()
  @IsString()
  comment?: string;
}
