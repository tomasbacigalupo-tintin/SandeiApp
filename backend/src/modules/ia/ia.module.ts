import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { env } from '../../config/env';

@Module({
  imports: [
    HttpModule.register({
      baseURL: env.iaServiceUrl,
    }),
  ],
  providers: [IaService],
  controllers: [IaController],
})
export class IaModule {}
