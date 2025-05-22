import { IsString } from 'class-validator';

export class LineupResponseDto {
  @IsString()
  lineup!: string;
}
