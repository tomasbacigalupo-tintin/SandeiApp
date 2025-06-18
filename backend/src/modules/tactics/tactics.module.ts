import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tactic } from './tactic.entity';
import { TacticsService } from './tactics.service';
import { TacticsController } from './tactics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tactic])],
  controllers: [TacticsController],
  providers: [TacticsService],
})
export class TacticsModule {}
