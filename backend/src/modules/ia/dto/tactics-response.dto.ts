import { IsString } from 'class-validator';

export class TacticsResponseDto {
  @IsString()
  tactics!: string;
}
