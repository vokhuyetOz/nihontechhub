import { Test, TestingModule } from '@nestjs/testing';
import { AdminLoginController } from './admin-login.controller';
import { LoginService } from '../../login/login.service';
import { EAuthProvider, ERole } from '../../../common/enums';

describe('AdminLoginController', () => {
  let controller: AdminLoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminLoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminLoginController>(AdminLoginController);
    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return admin', async () => {
      const dto = {
        email: '',
        password: '',
        provider: EAuthProvider.EMAIL,
        deviceId: '',
        deviceToken: '',
      };
      const result = {
        id: '',
        role: ERole.ADMIN,
        email: '',
        password: '',
        token: '',
        refreshToken: '',
      };
      jest.spyOn(service, 'login').mockResolvedValue(result);
      const admin = await controller.login(dto);
      expect(admin).toEqual(result);
    });
  });
});
