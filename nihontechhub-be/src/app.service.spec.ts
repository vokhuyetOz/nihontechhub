import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return app info', () => {
    const appName = 'TestApp';
    jest.spyOn(configService, 'get').mockReturnValue(appName);

    const result = service.appInfo();
    expect(result).toEqual({ name: appName });
    expect(configService.get).toHaveBeenCalledWith('cfg.app.name', {
      infer: true,
    });
  });
});
