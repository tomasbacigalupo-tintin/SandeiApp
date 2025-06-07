import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { EntityNotFoundFilter } from './filters/entity-not-found.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('backendPort', 3000);
  const logger = new Logger('Bootstrap');

  // Seguridad con headers HTTP
  app.use(helmet());

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );

  // Filtro global para errores de entidad no encontrada
  app.useGlobalFilters(new EntityNotFoundFilter());

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sandei API')
    .setDescription('Sandei REST API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Configuración de CORS
  app.enableCors({
    origin: config.get<string>('frontendUrl', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Prefijo global y versionado
  const globalPrefix = config.get<string>('globalPrefix', 'api');
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning();

  // Soporte para shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port);
  logger.log(`🚀 Backend listening on port ${port}`);
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', err.stack);
  process.exit(1);
});
