import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthRegisterDto } from '../login/dto/auth-register.dto';
import { ActiveAccountOtpDTO } from './dto/active-account.dto';
import { EmailUserDto } from '../user/dto/email-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginService } from '../login/login.service';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
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

    controller = module.get<RegisterController>(RegisterController);
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
      expect(eventEmitter.emitAsync).toHaveBeenCalledWith('user.verify-email', {
        email: dto.email,
        otp: data.otp,
      });
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
  });

  describe('verifyEmail', () => {
    it('should return active', async () => {
      const dto = {} as ActiveAccountOtpDTO;
      const result = {} as User;
      jest.spyOn(registerService, 'activeAccount').mockResolvedValue(result);
      const active = await controller.activeUser(dto);
      expect(active).toEqual({ active: result.active });
    });
  });
});
