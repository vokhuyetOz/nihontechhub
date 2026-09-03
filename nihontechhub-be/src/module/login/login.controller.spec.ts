import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { ERole } from '../../common/enums';
import { LoginWithEmailPasswordDTO } from './dto/login-with-email-password.dto';
import { PushNotificationService } from '../push-notification/push-notification.service';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: PushNotificationService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return user', async () => {
      const dto = {} as LoginWithEmailPasswordDTO;
      const result = {
        id: '',
        email: '',
        role: ERole.ADMIN,
        password: '',
        token: '',
        refreshToken: '',
      };
      jest.spyOn(service, 'login').mockResolvedValue(result);
      const user = await controller.login(dto);
      expect(user).toEqual(result);
    });
  });
});
