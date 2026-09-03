import { Test, TestingModule } from '@nestjs/testing';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { Response } from 'express';

describe('DownloadController', () => {
  let downloadController: DownloadController;
  let downloadService: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [
        {
          provide: DownloadService,
          useValue: {
            getFromLocal: jest.fn(),
          },
        },
      ],
    }).compile();

    downloadController = module.get<DownloadController>(DownloadController);
    downloadService = module.get<DownloadService>(DownloadService);
  });

  it('should be defined', () => {
    expect(downloadController).toBeDefined();
  });

  describe('getFileLocal', () => {
    it('should call downloadService.getFromLocal with correct parameters', () => {
      const res = {} as Response;
      const filePath = 'test-file-path';
      downloadController.getFileLocal(res, filePath);
      expect(downloadService.getFromLocal).toHaveBeenCalledWith(res, filePath);
    });
  });
});
