import { Test, TestingModule } from '@nestjs/testing';
import { DownloadService } from './download.service';
import { Response } from 'express';
import * as path from 'path';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadService],
    }).compile();

    service = module.get<DownloadService>(DownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call res.download with the correct file path', () => {
    const res = {
      download: jest.fn(),
    } as unknown as Response;

    const filePath = 'test/file.txt';
    const expectedPath = path.join(process.cwd(), filePath);

    service.getFromLocal(res, filePath);

    expect(res.download).toHaveBeenCalledWith(expectedPath);
  });
});
