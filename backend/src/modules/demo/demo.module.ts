import { Module } from '@nestjs/common';
import { PlayersModule } from '../players/players.module';
import { MatchesModule } from '../matches/matches.module';
import { RatingsModule } from '../ratings/ratings.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [PlayersModule, MatchesModule, RatingsModule],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
