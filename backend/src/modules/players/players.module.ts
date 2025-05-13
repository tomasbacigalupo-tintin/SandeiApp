// File: src/modules/players/players.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
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

