// File: src/modules/players/players.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    RatingsModule,
  ],
  providers: [
    PlayersService,
  ],
  controllers: [
    PlayersController,
  ],
  exports: [
    PlayersService,
  ],
})
export class PlayersModule {}

