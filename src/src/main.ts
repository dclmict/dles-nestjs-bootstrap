/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ForbiddenException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigService } from '@nestjs/config';
import { appMetaDataConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOrigins = configService.get('CORS_ORIGINS')?.split(',');

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new ForbiddenException('CORS policy: This origin is not allowed'),
          false,
        );
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'data_gateway',
      protoPath: join(__dirname, 'proto/index.proto'),
      url: `localhost:${configService.get('GRPC_PORT')}`,
    },
  });

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ApiKeyGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle(appMetaDataConfig.APP_NAME)
    .setDescription(`Documentation of ${appMetaDataConfig.APP_NAME}`)
    .setVersion(appMetaDataConfig.APP_VERSION)
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .addSecurityRequirements('X-API-KEY', ['X-API-KEY'])
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT') || 3000);

  console.log(
    `🚀 HTTP Server running on http://localhost:${configService.get('HTTP_PORT')}`,
  );
  console.log(
    `📡 gRPC Server running on http://localhost:${configService.get('GRPC_PORT')}`,
  );
  console.log(
    `📚 API Documentation available at http://localhost:${configService.get('HTTP_PORT')}/docs`,
  );
}

bootstrap();
