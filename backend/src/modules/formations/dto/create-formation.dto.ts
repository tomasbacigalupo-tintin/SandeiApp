import { IsString, IsOptional } from 'class-validator';

export class CreateFormationDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
