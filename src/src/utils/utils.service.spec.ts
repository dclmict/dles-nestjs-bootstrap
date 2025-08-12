import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { HttpStatus } from '@nestjs/common';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('HttpSuccess', () => {
    it('should call UtilsService.HttpSuccess and return the result', () => {
      const response = service.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        null,
      );

      expect(response).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Data retrieved successfully',
        data: null,
      });
    });
  });
});
