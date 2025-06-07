import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { EntityNotFoundFilter } from './filters/entity-not-found.filter';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new EntityNotFoundFilter());
  await app.listen(env.backendPort);
  logger.log(`🚀 Backend listening on port ${env.backendPort}`);
}
bootstrap();
