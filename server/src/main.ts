import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
