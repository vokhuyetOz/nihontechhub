import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Request } from 'express';
import { StorageObjectDTO } from './dto/storage-object.dto';

describe('UploadController', () => {
  let uploadController: UploadController;
  let uploadService: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: UploadService,
          useValue: {
            uploadFile: jest.fn().mockResolvedValue('file uploaded'),
            saveFileMulter: jest.fn().mockResolvedValue('file saved'),
          },
        },
      ],
    }).compile();

    uploadController = module.get<UploadController>(UploadController);
    uploadService = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(uploadController).toBeDefined();
  });

  describe('uploadedFile', () => {
    it('should upload a file', async () => {
      const file = { originalname: 'test.jpg' } as Express.Multer.File;
      const req = { hostname: 'localhost' } as Request;

      const result = await uploadController.uploadedFile(file, req);

      expect(result).toBe('file uploaded');
      expect(uploadService.uploadFile).toHaveBeenCalledWith(file, req.hostname);
    });
  });

  describe('uploadFileMultiPart', () => {
    it('should save a multipart file', async () => {
      const file = { originalname: 'test.jpg' } as Express.Multer.File;
      const data: StorageObjectDTO = {
        /* fill with appropriate test data */
      };
      const req = { headers: { host: 'localhost' } } as Request;
      process.env.ENABLE_HTTPS = 'false';

      const result = await uploadController.uploadFileMultiPart(
        file,
        data,
        req,
      );

      expect(result).toBe('file saved');
      expect(uploadService.saveFileMulter).toHaveBeenCalledWith(
        'http://localhost',
        file,
        data,
      );
    });
  });
});
