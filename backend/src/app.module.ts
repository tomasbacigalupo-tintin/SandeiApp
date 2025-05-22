import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { PlayersModule } from './modules/players/players.module';
import { AuthModule } from './modules/auth/auth.module';
import { MatchesModule } from './modules/matches/matches.module';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PlayersModule,
    MatchesModule,
    RatingsModule,
  ],
})
export class AppModule {}

