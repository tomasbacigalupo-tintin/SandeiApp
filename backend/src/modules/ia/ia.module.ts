import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IaTask } from './ia.entity';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IaTask])],
  providers: [IaService],
  controllers: [IaController],
  exports: [IaService],
})
export class IaModule {}
