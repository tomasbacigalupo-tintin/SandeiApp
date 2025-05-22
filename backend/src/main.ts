import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.BACKEND_PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend listening on port ${port}`);
}
bootstrap();
