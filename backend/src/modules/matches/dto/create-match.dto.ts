import { IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMatchDto {
  @IsDateString()
  @Transform(({ value }: { value: string }) => new Date(value))
  date!: Date;
}
