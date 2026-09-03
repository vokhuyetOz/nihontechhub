import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { ResetPasswordService } from './reset-password.service';
import { ResetPassword } from './entities/reset-password.entity';
import { VerifyResetPasswordDTO } from '../auth/dto/reset-password-otp.dto';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        {
          provide: getRepositoryToken(ResetPassword),
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('invalidateToken', () => {
    it('should invalidate token if it is not expired', async () => {
      const token = new ResetPassword();
      token.id = '1';
      token.expiredAt = new Date(Date.now() + 100000); // 10 seconds in the future
      token.isUsed = false;

      jest.spyOn(service, 'getOne').mockResolvedValue(token);
      jest.spyOn(service, 'updateOne').mockResolvedValue(token);

      const result = await service.invalidateToken({
        id: '1',
      });
      expect(result.isUsed).toBe(false);
    });

    it('should throw BadRequestException if token is expired', async () => {
      const token = new ResetPassword();
      token.id = '1';
      token.expiredAt = new Date(Date.now() - 100000); // 10 seconds in the future
      token.isUsed = false;

      jest.spyOn(service, 'getOne').mockResolvedValue(token);
      jest.spyOn(service, 'updateOne').mockResolvedValue(token);

      const res = await service.handleValidateResetPasswordOTP(token);
      expect(res.isInValidOTP).toBe(true);
    });
  });

  describe('verifyOtp', () => {
    it('should return reset password token object if valid', async () => {
      const resetPasswordTokenObj = new ResetPassword();
      const resetPasswordOtpDto: VerifyResetPasswordDTO = {
        otp: '123456',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(resetPasswordTokenObj);

      const result = await service.verifyOtp(resetPasswordOtpDto);
      expect(result).toBe(resetPasswordTokenObj);
    });

    it('should throw BadRequestException if token is not found', async () => {
      const resetPasswordOtpDto: VerifyResetPasswordDTO = {
        otp: '123456',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(null);

      await expect(service.verifyOtp(resetPasswordOtpDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if an error occurs', async () => {
      const resetPasswordOtpDto: VerifyResetPasswordDTO = {
        otp: '123456',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'getOne').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(service.verifyOtp(resetPasswordOtpDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
