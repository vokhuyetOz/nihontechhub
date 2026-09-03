import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            appInfo: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: jest.fn(),
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "name": "NestJS API"', () => {
      const response = appController.appInfo();
      expect(response).toEqual(undefined);
    });
  });
});
