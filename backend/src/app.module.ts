import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { PlayersModule } from './modules/players/players.module';
import { FormationsModule } from './modules/formations/formations.module';
import { MatchesModule } from './modules/matches/matches.module';
import { IaModule } from './modules/ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PlayersModule,
    FormationsModule,
    MatchesModule,
    IaModule,
  ],
})
export class AppModule {}
