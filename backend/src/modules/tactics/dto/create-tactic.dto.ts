import { IsString, IsObject } from 'class-validator';

export class CreateTacticDto {
  @IsString()
  name!: string;

  @IsString()
  formation!: string;

  @IsObject()
  positions!: Record<string, string>;
}
