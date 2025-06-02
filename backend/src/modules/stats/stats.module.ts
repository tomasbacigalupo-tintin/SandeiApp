import { Module } from '@nestjs/common';
import { PlayersModule } from '../players/players.module';
import { RatingsModule } from '../ratings/ratings.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [PlayersModule, RatingsModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
