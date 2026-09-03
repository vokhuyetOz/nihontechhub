import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { PushNotificationService } from '../push-notification/push-notification.service';
import { RegisterService } from '../register/register.service';
import { LoginService } from '../login/login.service';
import { Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { ForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';
import { EAuthProvider } from '../../common/enums';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let userRefreshService: RefreshTokenService;
  let userResetPasswordService: ResetPasswordService;
  let userVerifyService: VerifyAccountService;
  let pushNotificationService: PushNotificationService;
  let registerService: RegisterService;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            updateOneWithId: jest.fn(),
            getOne: jest.fn(),
            createNewPassword: jest.fn(),
            updateOne: jest.fn(),
          },
        },
        {
          provide: RefreshTokenService,
          useValue: {
            updateOne: jest.fn(),
            invalidateToken: jest.fn(),
            saveRefreshToken: jest.fn(),
          },
        },
        {
          provide: ResetPasswordService,
          useValue: {
            updateOne: jest.fn(),
            getOne: jest.fn(),
            invalidateToken: jest.fn(),
          },
        },
        {
          provide: VerifyAccountService,
          useValue: {
            updateOne: jest.fn(),
          },
        },
        {
          provide: PushNotificationService,
          useValue: {
            disableDeviceTokenWithDeviceId: jest.fn(),
          },
        },
        {
          provide: RegisterService,
          useValue: {
            register: jest.fn(),
            createUserVerifyAccountOTP: jest.fn(),
          },
        },
        {
          provide: LoginService,
          useValue: {
            login: jest.fn(),
            createAccessToken: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    userRefreshService = module.get<RefreshTokenService>(RefreshTokenService);
    userResetPasswordService =
      module.get<ResetPasswordService>(ResetPasswordService);
    userVerifyService = module.get<VerifyAccountService>(VerifyAccountService);
    pushNotificationService = module.get<PushNotificationService>(
      PushNotificationService,
    );
    registerService = module.get<RegisterService>(RegisterService);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logOut', () => {
    it('should log out user successfully', async () => {
      const userId = 'userId';
      const deviceId = 'deviceId';
      const invalidToken = {
        where: { user: { id: userId } },
        dto: { isUsed: true },
      };

      jest.spyOn(userRefreshService, 'updateOne').mockResolvedValue(undefined);
      jest.spyOn(userVerifyService, 'updateOne').mockResolvedValue(undefined);
      jest
        .spyOn(userResetPasswordService, 'updateOne')
        .mockResolvedValue(undefined);
      jest
        .spyOn(pushNotificationService, 'disableDeviceTokenWithDeviceId')
        .mockResolvedValue(undefined);

      await service.logOut(userId, deviceId);

      expect(userRefreshService.updateOne).toHaveBeenCalledWith(invalidToken);
      expect(userVerifyService.updateOne).toHaveBeenCalledWith(invalidToken);
      expect(userResetPasswordService.updateOne).toHaveBeenCalledWith(
        invalidToken,
      );
      expect(
        pushNotificationService.disableDeviceTokenWithDeviceId,
      ).toHaveBeenCalledWith(userId, deviceId);
    });

    it('should log error and return undefined if an error occurs', async () => {
      const userId = 'userId';
      const deviceId = 'deviceId';
      const error = new Error('Test error');

      jest.spyOn(userRefreshService, 'updateOne').mockImplementation(() => {
        throw error;
      });

      const loggerSpy = jest
        .spyOn(Logger, 'error')
        .mockImplementation(() => {});

      const result = await service.logOut(userId, deviceId);

      expect(loggerSpy).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();
    });
  });

  describe('hashTokenByCrypto', () => {
    it('should hash token successfully', () => {
      const token = 'testToken';
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const result = service.hashTokenByCrypto(token);

      expect(result).toBe(hashedToken);
    });

    // it('should log error and return undefined if an error occurs', () => {
    //   const token = 'testToken';
    //   const error = new Error('Test error');

    //   jest.spyOn(crypto, 'createHash').mockImplementation(() => {
    //     throw error;
    //   });

    //   const loggerSpy = jest
    //     .spyOn(Logger, 'error')
    //     .mockImplementation(() => {});

    //   const result = service.hashTokenByCrypto(token);

    //   expect(loggerSpy).toHaveBeenCalledWith(error);
    //   expect(result).toBeUndefined();
    // });
  });

  describe('renewToken', () => {
    it('should renew token successfully', async () => {
      const refreshTokenDto = { token: 'validToken', device_id: 'deviceId' };
      const usedRefreshToken = {
        email: 'test@example.com',
        token: 'someToken',
        expiredAt: DateHelper.currentDate(),
        isUsed: false,
      };
      const userRecord = {
        email: 'test@example.com',
        id: 'userId',
        provider: EAuthProvider.EMAIL,
      };
      const newAccessToken = 'newAccessToken';
      const newRefreshToken = 'newRefreshToken';

      jest
        .spyOn(userRefreshService, 'invalidateToken')
        .mockResolvedValue(usedRefreshToken as any);
      jest.spyOn(userService, 'getOne').mockResolvedValue(userRecord as any);
      jest
        .spyOn(loginService, 'createAccessToken')
        .mockReturnValue(newAccessToken);
      jest
        .spyOn(userRefreshService, 'saveRefreshToken')
        .mockResolvedValue(newRefreshToken);

      const result = await service.renewToken(refreshTokenDto);

      expect(result).toEqual({
        token: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });

    // it('should throw BadRequestException if token is invalid', async () => {
    //   const refreshTokenDto = { token: 'invalidToken', device_id: 'deviceId' };

    //   jest.spyOn(userRefreshService, 'invalidateToken').mockResolvedValue(null);

    //   await expect(service.renewToken(refreshTokenDto)).rejects.toThrow(
    //     BadRequestException,
    //   );
    // });

    it('should log error and return undefined if an error occurs', async () => {
      const refreshTokenDto = { token: 'validToken', device_id: 'deviceId' };

      jest
        .spyOn(userRefreshService, 'invalidateToken')
        .mockImplementation(() => {
          throw new Error('Test error');
        });

      const loggerSpy = jest
        .spyOn(Logger, 'error')
        .mockImplementation(() => {});

      const result = await service.renewToken(refreshTokenDto);

      expect(loggerSpy).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('forgotPassword', () => {
    it('should generate OTP and update user reset password token', async () => {
      const forgotPasswordDto: ForgotPasswordDto = {
        email: 'test@example.com',
      };
      const user: User = { id: 'userId', email: 'test@example.com' } as User;
      const otp = '123456';
      const expiryDate = DateHelper.currentDate();
      const resetPasswordToken = { id: 'resetTokenId' };

      jest.spyOn(userService, 'getOne').mockResolvedValue(user);
      jest
        .spyOn(registerService, 'createUserVerifyAccountOTP')
        .mockReturnValue({ otp, expiryDate });
      jest.spyOn(userResetPasswordService, 'updateOne').mockResolvedValue({
        id: 'resetTokenId',
        email: 'test@example.com',
        isUsed: false,
        otp: '123456',
        expiredAt: DateHelper.currentDate(),
      } as any);
      jest.spyOn(userService, 'updateOne').mockResolvedValue(undefined);

      const result = await service.forgotPassword(forgotPasswordDto);

      expect(userService.getOne).toHaveBeenCalledWith({
        field: 'email',
        value: forgotPasswordDto.email,
      });
      expect(registerService.createUserVerifyAccountOTP).toHaveBeenCalled();
      expect(userResetPasswordService.updateOne).toHaveBeenCalledWith({
        where: { email: forgotPasswordDto.email },
        dto: {
          email: forgotPasswordDto.email,
          otp,
          expiredAt: expiryDate,
          isUsed: false,
          user: user.id,
        },
      });
      expect(userService.updateOne).toHaveBeenCalledWith({
        where: { email: forgotPasswordDto.email },
        dto: { resetPasswordToken: resetPasswordToken.id },
      });
      expect(result).toEqual({ user, otp });
    });

    it('should log error and return undefined if an error occurs', async () => {
      const forgotPasswordDto: ForgotPasswordDto = {
        email: 'test@example.com',
      };
      const error = new Error('Test error');

      jest.spyOn(userService, 'getOne').mockImplementation(() => {
        throw error;
      });

      const loggerSpy = jest
        .spyOn(Logger, 'error')
        .mockImplementation(() => {});

      const result = await service.forgotPassword(forgotPasswordDto);

      expect(loggerSpy).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const resetPasswordDto: ResetPassWordDTO = {
        password: 'newPassword',
        email: 'test@example.com',
        otp: '123456',
      };
      const resetPasswordTokenObj = {
        id: 'resetTokenId',
        email: 'test@example.com',
        isUsed: false,
        otp: '123456',
        expiredAt: DateHelper.currentDate(),
      };
      const result = {};

      jest
        .spyOn(userResetPasswordService, 'getOne')
        .mockResolvedValue(resetPasswordTokenObj as any);
      jest
        .spyOn(userResetPasswordService, 'invalidateToken')
        .mockResolvedValue(undefined);
      jest
        .spyOn(userService, 'createNewPassword')
        .mockResolvedValue({} as User);

      const response = await service.resetPassword(resetPasswordDto);

      expect(userResetPasswordService.getOne).toHaveBeenCalledWith({
        otp: resetPasswordDto.otp,
        email: resetPasswordDto.email,
      });
      expect(userResetPasswordService.invalidateToken).toHaveBeenCalledWith({
        id: resetPasswordTokenObj.id,
      });
      expect(userService.createNewPassword).toHaveBeenCalledWith(
        resetPasswordDto.email,
        resetPasswordDto.password,
      );
      expect(response).toEqual(result);
    });

    it('should log error and return undefined if an error occurs', async () => {
      const resetPasswordDto: ResetPassWordDTO = {
        password: 'newPassword',
        email: 'test@example.com',
        otp: '123456',
      };
      const error = new Error('Test error');

      jest.spyOn(userResetPasswordService, 'getOne').mockImplementation(() => {
        throw error;
      });

      const loggerSpy = jest
        .spyOn(Logger, 'error')
        .mockImplementation(() => {});

      const response = await service.resetPassword(resetPasswordDto);

      expect(loggerSpy).toHaveBeenCalledWith(error);
      expect(response).toBeUndefined();
    });
  });
});
