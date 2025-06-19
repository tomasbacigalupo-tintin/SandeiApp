import { IsEmail, IsString, MinLength, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'mypassword', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: '2d40776d-6bb0-4dcb-93b5-6fa6867ddba7', description: 'Tenant identifier', required: false })
  @IsUUID()
  @IsOptional()
  tenantId?: string;
}

