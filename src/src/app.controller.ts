import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public, Throttle } from './decorators';
import { appMetaDataConfig } from './config';
import { GrpcMethod } from '@nestjs/microservices';
import { GetApiHealthResponse } from './types/proto/index.data_gateway';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Throttle(30, 30)
  @ApiOperation({
    summary: 'Health Check',
    description: 'Returns API status and basic information',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status retrieved successfully!',
    schema: {
      example: {
        statusCode: HttpStatus.OK,
        message: 'Heath Status',
        data: {
          service: appMetaDataConfig.APP_NAME,
          version: appMetaDataConfig.APP_VERSION,
          timestamp: '2025-07-30T01:50:58.988Z',
          uptime: 27.0994054,
        },
      },
    },
  })
  @Get()
  getHealth() {
    return this.appService.getHealth();
  }
}

@Controller()
export class GrpcAppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('DataGatewayService')
  getApiHealth(): GetApiHealthResponse {
    const { data } = this.appService.getHealth();

    return {
      ...data,
      uptime: data.uptime.toString(),
    };
  }
}
