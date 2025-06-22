import 'reflect-metadata';
import * as Sentry from '@sentry/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions-filter';

async function bootstrap() {
  // Initialize Sentry
  Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 1.0 });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen(3000);
  console.log('Running on http://localhost:3000');
}
bootstrap();