import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201 })
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    const tenantId = (req as any).tenantId || registerDto.tenantId;
    return this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
      tenantId,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201 })
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.authService.login(loginDto.email, loginDto.password, tenantId);
  }
}
