import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from '../../common/casl/casl-ability.factory';
import { RegisterService } from '../register/register.service';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LogOutDTO } from './dto/auth-logout.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  // let eventEmitter: EventEmitter2;
  // let userResetPasswordService: ResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            renewToken: jest.fn(),
            logOut: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
            resetPasswordOtp: jest.fn(),
            login: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emitAsync: jest.fn(),
          },
        },
        {
          provide: ResetPasswordService,
          useValue: {
            verifyOtp: jest.fn(),
          },
        },
        {
          provide: CaslAbilityFactory,
          useValue: jest.fn(),
        },
        {
          provide: UserService,
          useValue: jest.fn(),
        },
        {
          provide: RegisterService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    userResetPasswordService =
      module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('refreshToken', () => {
  //   it('should renew token', async () => {
  //     const refreshTokenDto = {} as RefreshTokenDto;
  //     const token = 'token';
  //     const refreshToken = 'refreshToken';
  //     const result = {
  //       token,
  //       refreshToken,
  //     };
  //     jest.spyOn(authService, 'renewToken').mockResolvedValue(result);
  //     const renewedToken = await controller.renewAllTokenPost(refreshTokenDto);
  //     expect(renewedToken).toEqual(result);
  //   });
  // });

  describe('logOut', () => {
    it('should log out', async () => {
      const id = 'id';
      const logOutDto = {} as LogOutDTO;
      const result = void 0;
      jest.spyOn(authService, 'logOut').mockResolvedValue(result);
      const logOut = await controller.logOut(id, logOutDto);
      expect(logOut).toEqual(result);
    });
  });

  // describe('forgotPassword', () => {
  //   it('should handle forgot password request', async () => {
  //     const forgotPasswordDto: ForgotPasswordDto = {
  //       email: 'test@example.com',
  //     };
  //     const result = { user: { email: 'test@example.com' }, otp: '123456' };

  //     jest
  //       .spyOn(authService, 'forgotPassword')
  //       .mockResolvedValue(result as any);

  //     const response = await controller.forgotPasswordPost(forgotPasswordDto);

  //     expect(response).toEqual({ otp: '123456' });
  //     expect(authService.forgotPassword).toHaveBeenCalledWith(
  //       forgotPasswordDto,
  //     );
  //     expect(eventEmitter.emitAsync).toHaveBeenCalledWith(
  //       'user.reset-password.send-otp',
  //       {
  //         email: 'test@example.com',
  //         otp: '123456',
  //       },
  //     );
  //   });
  // });

  describe('resetPassword', () => {
    it('should reset password', async () => {
      const resetPasswordDto = {} as ResetPassWordDTO;
      const result = {} as User;
      jest.spyOn(authService, 'resetPassword').mockResolvedValue(result as any);
      const resetPassword =
        await controller.resetPasswordPost(resetPasswordDto);
      expect(resetPassword).toEqual(result);
    });
  });

  // describe('checkResetPasswordOtp', () => {
  //   it('should verify otp', async () => {
  //     const resetPasswordOtpDto = {} as VerifyResetPasswordDTO;
  //     const result = {} as ResetPassword;
  //     jest
  //       .spyOn(userResetPasswordService, 'verifyOtp')
  //       .mockResolvedValue(result);
  //     const verifyOtp =
  //       await controller.checkResetPasswordOtp(resetPasswordOtpDto);
  //     expect(verifyOtp).toEqual(result);
  //   });
  // });
});
