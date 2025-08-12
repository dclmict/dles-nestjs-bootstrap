import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from 'src/guards';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          ttl: parseInt(configService.get('THROTTLE_TTL') || '') * 1000,
          limit: parseInt(configService.get('THROTTLE_LIMIT') || ''),
        },
      ],
      inject: [ConfigService],
    }),

    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT') || ''),
        username: configService.get<string>('DATABASE_USERNAME'),
        database: configService.get<string>('DATABASE_NAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        models: ['./models/*.model{.ts,.js}'],
        autoLoadModels: true,
        synchronize: true,
        sync: {},
        logging: console.log,
      }),
      inject: [ConfigService],
    }),

    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
