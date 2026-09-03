import { EntityRepository } from '@mikro-orm/mysql';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VerifyAccount } from './entities/verify-account.entity';
import { VerifyAccountService } from './verify-account.service';

describe('VerifyAccountService', () => {
  let service: VerifyAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyAccountService,
        {
          provide: getRepositoryToken(VerifyAccount),
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<VerifyAccountService>(VerifyAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('invalidateToken', () => {
    it('should return a token if found', async () => {
      const token = new VerifyAccount();
      jest.spyOn(service, 'getOne').mockResolvedValue(token);

      const result = await service.invalidateToken({ id: 1 });
      expect(result).toEqual(token);
    });

    it('should log an error if an exception occurs', async () => {
      const error = new Error('Some error');
      jest.spyOn(service, 'getOne').mockRejectedValue(error);
      const loggerSpy = jest
        .spyOn(Logger, 'error')
        .mockImplementation(() => {});

      await service.invalidateToken({ id: 1 });

      expect(loggerSpy).toHaveBeenCalledWith(error);
    });
  });
});
