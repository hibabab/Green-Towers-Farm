import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express'; // ✅ ajouter cet import

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  // ✅ 'uploads' pas 'upload' — vérifier l'orthographe
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();