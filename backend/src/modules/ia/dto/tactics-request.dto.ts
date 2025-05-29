import { IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class TacticsRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  players!: string[];

  @IsOptional()
  @IsString()
  style?: string;
}
