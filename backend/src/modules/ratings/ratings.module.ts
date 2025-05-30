import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Match } from '../matches/match.entity';
import { Player } from '../players/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Match, Player])],
  providers: [RatingsService],
  controllers: [RatingsController],
  exports: [RatingsService],
})
export class RatingsModule {}

