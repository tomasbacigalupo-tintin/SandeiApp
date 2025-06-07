import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { EntityNotFoundFilter } from './filters/entity-not-found.filter';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const config = app.get(ConfigService);
  const port = config.get<number>('backendPort', 3000);
  const logger = new Logger('Bootstrap');

  // Security headers
  app.use(helmet());

  // Global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );

  // Global exception filters
  app.useGlobalFilters(new EntityNotFoundFilter());

  // Enable CORS with config
  app.enableCors({
    origin: config.get<string>('frontendUrl', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global prefix and versioning
  const globalPrefix = config.get<string>('globalPrefix', 'api');
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning();

  // Graceful shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port);
  logger.log(`🚀 Backend listening on port ${port}`);
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', err.stack);
  process.exit(1);
});