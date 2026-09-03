import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';
import { UploadService } from './upload.service';
import * as fse from 'fs-extra';
import { StorageObjectDTO } from './dto/storage-object.dto';

describe('UploadService', () => {
  let service: UploadService;
  let minioService: MinioService;

  const mockFile = {
    originalname: 'test.jpg',
    mimetype: 'image/jpeg',
    buffer: Buffer.from('file buffer'),
    size: 1234,
    path: '/path/to/file',
  };

  beforeEach(async () => {
    const mockMinioService = {
      client: {
        putObject: jest.fn(),
      },
    };
    const mockConfigService = {
      get: jest.fn().mockReturnValue('value'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        { provide: MinioService, useValue: mockMinioService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    minioService = module.get<MinioService>(MinioService);
  });

  describe('uploadToBucket', () => {
    it('should upload a file to the specified bucket', async () => {
      await service.uploadToBucket('test-bucket', 'test-file', mockFile as any);
      expect(minioService.client.putObject).toHaveBeenCalledWith(
        'test-bucket',
        'test-file',
        mockFile.buffer,
        mockFile.size,
        { 'content-type': mockFile.mimetype },
      );
    });
  });

  describe('uploadFile', () => {
    it('should upload a file and return its details', async () => {
      const result = await service.uploadFile(mockFile as any, 'localhost');
      expect(minioService.client.putObject).toHaveBeenCalled();
      expect(result).toHaveProperty('filename');
      expect(result).toHaveProperty('url');
    });
  });

  describe('saveFileMulter', () => {
    it('should save a chunk of the file and merge if final chunk', async () => {
      jest.spyOn(fse, 'moveSync').mockImplementation(() => {});
      jest.spyOn(fse, 'existsSync').mockReturnValue(false);
      jest.spyOn(fse, 'mkdirSync').mockImplementation(() => {});
      jest.spyOn(fse, 'appendFileSync').mockImplementation(() => {});
      jest.spyOn(fse, 'readFileSync').mockReturnValue('');
      jest
        .spyOn(service, 'mergeChunkedFile')
        .mockImplementation(() => Promise.resolve());

      const data = new StorageObjectDTO();
      data.chunkIndex = 1;
      data.fileId = 'testFile';
      data.fileType = 'image/jpeg';
      data.endFile = true;

      const result = await service.saveFileMulter(
        'localhost',
        mockFile as any,
        data,
      );
      expect(result).toHaveProperty('isMerged', false);
    });
  });
});
