import { IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class ErrorDetectionRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  lineup!: string[];

  @IsOptional()
  @IsString()
  formation?: string;
}
