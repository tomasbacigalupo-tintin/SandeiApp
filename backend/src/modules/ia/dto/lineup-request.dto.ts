import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class LineupRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  players!: string[];

  @IsString()
  formation!: string;
}
