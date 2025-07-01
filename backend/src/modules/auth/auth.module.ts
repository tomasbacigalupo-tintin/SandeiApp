import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';
import { env } from '../../config/env';
import { KeycloakModule } from './keycloak.module';
import { KeycloakAuthGuard } from './keycloak-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    KeycloakModule,
  ],
  providers: [AuthService, JwtStrategy, KeycloakAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, KeycloakAuthGuard, KeycloakModule],
})
export class AuthModule {}
