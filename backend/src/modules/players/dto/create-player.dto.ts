import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { PlayerPosition } from '../player.entity';

export class CreatePlayerDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEnum(PlayerPosition)
  position?: PlayerPosition;

  @IsOptional()
  @IsNumber()
  score?: number;
}
