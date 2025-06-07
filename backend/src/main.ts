import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundFilter } from './filters/entity-not-found.filter';
import { env } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new EntityNotFoundFilter());

  const config = new DocumentBuilder()
    .setTitle('Sandei API')
    .setDescription('Sandei REST API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(env.backendPort);
  console.log(`🚀 Backend listening on port ${env.backendPort}`);
}
bootstrap();
