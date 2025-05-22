import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.IA_SERVICE_URL || 'http://localhost:8000',
    }),
  ],
  providers: [IaService],
  controllers: [IaController],
})
export class IaModule {}
