import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoutedPlayer } from './scouted-player.entity';
import { ScoutingService } from './scouting.service';
import { ScoutingController } from './scouting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScoutedPlayer])],
  controllers: [ScoutingController],
  providers: [ScoutingService],
})
export class ScoutingModule {}
