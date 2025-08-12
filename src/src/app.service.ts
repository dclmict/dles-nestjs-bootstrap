import { HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { appMetaDataConfig } from './config';

@Injectable()
export class AppService {
  constructor(private readonly utilsService: UtilsService) {}

  getHealth() {
    return this.utilsService.HttpSuccess(
      HttpStatus.OK,
      'Health status retrieved successfully!',
      {
        service: appMetaDataConfig.APP_NAME,
        version: appMetaDataConfig.APP_VERSION,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    );
  }
}
