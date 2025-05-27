import { IsOptional, IsString } from 'class-validator';

export class UpdateFormationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
