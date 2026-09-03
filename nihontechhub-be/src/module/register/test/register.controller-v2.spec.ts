import { Test, TestingModule } from '@nestjs/testing';
import { RegisterControllerV2 } from './register.controller-v2';
import { RegisterService } from './register.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthRegisterDto } from '../login/dto/auth-register.dto';
import { ActiveAccountOtpDTO } from './dto/active-account.dto';
import { EmailUserDto } from '../user/dto/email-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginService } from '../login/login.service';

describe('RegisterController', () => {
  let controller: RegisterControllerV2;
  let registerService: RegisterService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterControllerV2],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            register: jest.fn(),
            preStepUserVerifyAccount: jest.fn(),
            activeAccount: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emitAsync: jest.fn(),
          },
        },
        {
          provide: LoginService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<RegisterControllerV2>(RegisterControllerV2);
    registerService = module.get<RegisterService>(RegisterService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOne', () => {
    it('should create a user and emit an event', async () => {
      const dto = {
        email: 'testCreate@example.com',
        password: '',
      } as AuthRegisterDto;
      const data = {
        otp: '123456',
        user: { email: 'testCreate@example.com' } as User,
      };
      jest.spyOn(registerService, 'register').mockResolvedValue(undefined);
      jest
        .spyOn(registerService, 'preStepUserVerifyAccount')
        .mockResolvedValue(data);

      const response = await controller.createOne(dto);

      expect(response).toEqual(data.user);
      expect(registerService.register).toHaveBeenCalledWith(dto);
      expect(registerService.preStepUserVerifyAccount).toHaveBeenCalledWith(
        dto.email,
      );
      expect(eventEmitter.emitAsync).toHaveBeenCalledWith(
        'user.verify-email.deep-link',
        {
          email: dto.email,
          otp: data.otp,
        },
      );
    });

    it('should handle registration errors', async () => {
      const dto = {
        email: 'testCreate@example.com',
        password: '',
      } as AuthRegisterDto;
      jest
        .spyOn(registerService, 'register')
        .mockRejectedValue(new Error('Registration failed'));

      await expect(controller.createOne(dto)).rejects.toThrow(
        'Registration failed',
      );
    });
  });

  describe('sendActiveEmail', () => {
    it('should return otp', async () => {
      const dto = { email: 'testCreate@example.com' } as EmailUserDto;
      const result = {
        otp: '123456',
        user: {
          email: 'testCreate@example.com',
        },
      };
      jest
        .spyOn(registerService, 'preStepUserVerifyAccount')
        .mockResolvedValue(result as any);
      const otp = await controller.sendActiveEmail(dto);
      expect(otp).toEqual({ otp: result.otp });
      expect(eventEmitter.emitAsync).toHaveBeenCalledWith('user.verify-email', {
        email: 'testCreate@example.com',
        otp: '123456',
      });
    });

    it('should handle errors in sending activation email', async () => {
      const dto = { email: 'testCreate@example.com' } as EmailUserDto;
      jest
        .spyOn(registerService, 'preStepUserVerifyAccount')
        .mockRejectedValue(new Error('Failed to send activation email'));

      await expect(controller.sendActiveEmail(dto)).rejects.toThrow(
        'Failed to send activation email',
      );
    });
  });

  describe('verifyEmail', () => {
    it('should return active', async () => {
      const dto = {} as ActiveAccountOtpDTO;
      const result = {} as User;
      jest.spyOn(registerService, 'activeAccount').mockResolvedValue(result);
      const active = await controller.activeUser(dto);
      expect(active).toEqual({ active: result.active });
    });

    it('should handle errors in account activation', async () => {
      const dto = {} as ActiveAccountOtpDTO;
      jest
        .spyOn(registerService, 'activeAccount')
        .mockRejectedValue(new Error('Activation failed'));

      await expect(controller.activeUser(dto)).rejects.toThrow(
        'Activation failed',
      );
    });
  });
});
