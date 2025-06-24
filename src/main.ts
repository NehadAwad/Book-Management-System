import 'reflect-metadata';
import * as Sentry from '@sentry/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as morgan from 'morgan';

async function bootstrap() {
  // Initialize Sentry
  Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 1.0 });

  const app = await NestFactory.create(AppModule, { 
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Add request logging
  app.use(morgan('dev'));

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Add global prefix
  app.setGlobalPrefix('api');

  // Enable compression
  app.use(compression());

  // Add security headers
  app.use(helmet());

  // Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const result = {
          statusCode: 400,
          error: 'Bad Request',
          message: errors
            .map((err) => Object.values(err.constraints || {}))
            .reduce((acc, val) => acc.concat(val), []),
        };
        return new BadRequestException(result);
      },
    }),
  );

  // Add global exception filter and Sentry interceptor
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SentryInterceptor());

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Book Management API')
    .setDescription('API documentation for the Book Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/v1`);
  console.log(`API Documentation available at: http://localhost:${port}/docs`);

  // Graceful shutdown
  const signals = ['SIGTERM', 'SIGINT'];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`Received ${signal}, starting graceful shutdown...`);
      await app.close();
      process.exit(0);
    });
  }
}

bootstrap();
