import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RegisterService } from './register.service';
import { UserService } from '../user/user.service';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { LoginService } from '../login/login.service';
import { PushNotificationService } from '../push-notification/push-notification.service';
import { BadRequestException, Logger } from '@nestjs/common';
import { EAuthProvider, EOperatingSystem } from '../../common/enum';

jest.mock('@nestjs/common/services/logger.service');

describe('RegisterService', () => {
  let service: RegisterService;
  let configService: ConfigService;
  let userService: UserService;
  let userVerifyService: VerifyAccountService;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getOne: jest.fn(),
            createOneWithSubcriber: jest.fn(),
            updateOne: jest.fn(),
          },
        },
        {
          provide: VerifyAccountService,
          useValue: {
            updateOne: jest.fn(),
          },
        },
        {
          provide: LoginService,
          useValue: {
            getLongLifeUserFacebookToken: jest.fn(),
            getFacebookUserInformation: jest.fn(),
            getLineUserInformation: jest.fn(),
            getClaimsFromAppleIDToken: jest.fn(),
            loginSpecials: jest.fn(),
          },
        },
        {
          provide: PushNotificationService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    configService = module.get<ConfigService>(ConfigService);
    userService = module.get<UserService>(UserService);
    userVerifyService = module.get<VerifyAccountService>(VerifyAccountService);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserVerifyAccountOTP', () => {
    it('should create an OTP and expiry date', () => {
      const otp = '123456';
      const expiryDate = DateHelper.currentDate();
      jest.spyOn(global, 'Date').mockImplementation(() => expiryDate);
      jest.spyOn(global.Math, 'random').mockReturnValue(0.123456);
      jest.spyOn(configService, 'get').mockReturnValue('60');
      jest.spyOn(global, 'parseInt').mockReturnValue(60);
      jest.spyOn(global, 'Date').mockImplementation(() => expiryDate);

      const result = service.createUserVerifyAccountOTP();

      expect(result).toEqual({ otp, expiryDate });
    });
  });

  describe('registerWithSocialNetwork', () => {
    it('should register a special user', async () => {
      const dto = {
        email: 'test@example.com',
        active: true,
        provider: EAuthProvider.FACEBOOK,
        id_social_network: '123',
      };
      const user = { id: '1', email: 'test@example.com' };
      jest.spyOn(service, 'register').mockResolvedValue(user as any);

      const result = await service.registerWithSocialNetwork(dto);

      expect(result).toEqual(user);
    });
  });

  describe('checkUniqueEmailWithOneProvider', () => {
    it('should return user if email and provider match', async () => {
      const email = 'test@example.com';
      const provider = EAuthProvider.FACEBOOK;
      const user = { email, provider };
      jest.spyOn(userService, 'getOne').mockResolvedValue(user as any);

      const result = await service.checkUniqueEmailWithOneProvider(
        email,
        provider,
      );

      expect(result).toEqual(user);
    });
  });

  describe('checkIsExistIdSocialNetWork', () => {
    it('should return user if id_social_network and provider match', async () => {
      const id_social_network = '123';
      const provider = EAuthProvider.FACEBOOK;
      const user = { idSocialNetwork: id_social_network, provider };
      jest.spyOn(userService, 'getOne').mockResolvedValue(user as any);

      const result = await service.checkIsExistIdSocialNetWork(
        id_social_network,
        provider,
      );

      expect(result).toEqual(user);
    });
  });

  describe('getDetailsOrCreateUserWithLoginBySocialNetwork', () => {
    it('should find user by email and provider', async () => {
      const id_social_network = '123';
      const provider = EAuthProvider.FACEBOOK;
      const email = 'test@example.com';
      const user = { id: '1', email, provider };
      jest
        .spyOn(service, 'checkUniqueEmailWithOneProvider')
        .mockResolvedValue(user as any);
      jest
        .spyOn(service, 'checkIsExistIdSocialNetWork')
        .mockResolvedValue(null);
      jest
        .spyOn(service, 'registerWithSocialNetwork')
        .mockResolvedValue(user as any);
      const result =
        await service.getDetailsOrCreateUserWithLoginBySocialNetwork(
          id_social_network,
          provider,
          email,
        );

      expect(result).toEqual(user);
      expect(service.checkUniqueEmailWithOneProvider).toHaveBeenCalledWith(
        email,
        provider,
      );
    });

    it('should find user by id_social_network and provider', async () => {
      const id_social_network = '123';
      const provider = EAuthProvider.FACEBOOK;
      const email = '';
      const user = { id: '1', idSocialNetwork: id_social_network, provider };
      jest
        .spyOn(service, 'checkUniqueEmailWithOneProvider')
        .mockResolvedValue(null);
      jest
        .spyOn(service, 'checkIsExistIdSocialNetWork')
        .mockResolvedValue(user as any);

      const result =
        await service.getDetailsOrCreateUserWithLoginBySocialNetwork(
          id_social_network,
          provider,
          email,
        );

      expect(result).toEqual(user);
      expect(service.checkUniqueEmailWithOneProvider).not.toHaveBeenCalled();
      expect(service.checkIsExistIdSocialNetWork).toHaveBeenCalledWith(
        id_social_network,
        provider,
      );
    });
  });

  describe('register', () => {
    it('should register a default user', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user = { id: '1', email: 'test@example.com' };
      jest.spyOn(userService, 'createOne').mockResolvedValue(user as any);

      const result = await service.register(dto);

      expect(result).toEqual(user);
      expect(userService.createOne).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException if user registration fails', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(userService, 'createOne').mockResolvedValue(null);

      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
      expect(userService.createOne).toHaveBeenCalledWith(dto);
    });
  });

  describe('preStepUserVerifyAccount', () => {
    it('should return user and OTP if user is found', async () => {
      const email = 'test@example.com';
      const user = { id: '1', email };
      const otp = '123456';
      const expiryDate = DateHelper.currentDate();
      const activeToken = { id: 'token123' };

      jest.spyOn(userService, 'getOne').mockResolvedValue(user as any);
      jest
        .spyOn(service, 'createUserVerifyAccountOTP')
        .mockReturnValue({ otp, expiryDate });
      jest
        .spyOn(userVerifyService, 'updateOne')
        .mockResolvedValue(activeToken as any);
      jest.spyOn(userService, 'updateOne').mockResolvedValue(null);

      const result = await service.preStepUserVerifyAccount(email);

      expect(result).toEqual({ user, otp });
      expect(userService.getOne).toHaveBeenCalledWith({
        field: 'email',
        value: email,
      });
      expect(service.createUserVerifyAccountOTP).toHaveBeenCalled();
      expect(userVerifyService.updateOne).toHaveBeenCalledWith({
        where: { email },
        dto: {
          email,
          otp,
          expiredAt: expiryDate,
          isUsed: false,
          user,
        },
      });
      expect(userService.updateOne).toHaveBeenCalledWith({
        where: { email },
        dto: { activeAccountToken: activeToken.id },
      });
    });

    it('should log error and return undefined if an error occurs', async () => {
      const email = 'test@example.com';
      const error = new Error('Test error');

      jest.spyOn(userService, 'getOne').mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.preStepUserVerifyAccount(email);
      expect(result).toEqual(undefined);
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('activeAccount', () => {
    it('should activate the account and return the user', async () => {
      const dto = { email: 'test@example.com', otp: '123456' };
      const user = { id: '1', email: 'test@example.com', active: true };

      jest.spyOn(userService, 'updateOne').mockResolvedValue(user as any);
      jest.spyOn(userVerifyService, 'updateOne').mockResolvedValue(null);

      const result = await service.activeAccount(dto);

      expect(result).toEqual(user);
      expect(userService.updateOne).toHaveBeenCalledWith({
        where: { email: dto.email },
        dto: { active: true },
      });
      expect(userVerifyService.updateOne).toHaveBeenCalledWith({
        where: { email: dto.email, otp: dto.otp },
        dto: { isUsed: true },
      });
    });

    it('should log error and return error if an error occurs', async () => {
      const dto = { email: 'test@example.com', otp: '123456' };
      const error = new Error('Test error');

      jest.spyOn(userService, 'updateOne').mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.activeAccount(dto);

      expect(result).toEqual(error);
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('registerWithFacebook', () => {
    it('should register with Facebook and return login data', async () => {
      const dto = {
        device_id: 'device123',
        user_id: 'user123',
        token: 'token123',
        os: EOperatingSystem.IOS,
        device_token: 'deviceToken123',
      };
      const provider = EAuthProvider.FACEBOOK;
      const longLifeToken = {
        access_token: 'longLifeToken123',
        expires_in: 3600,
      };
      const expiredAt = DateHelper.currentDate();
      const informationFacebook = {
        id: 'fb123',
        email: 'test@example.com',
      };
      const user = { id: '1', email: 'test@example.com' };
      const loginData = { accessToken: 'accessToken123' };

      jest
        .spyOn(loginService, 'getLongLifeUserFacebookToken')
        .mockResolvedValue(longLifeToken as any);
      jest
        .spyOn(loginService, 'getFacebookUserInformation')
        .mockResolvedValue(informationFacebook as any);
      jest
        .spyOn(service, 'getDetailsOrCreateUserWithLoginBySocialNetwork')
        .mockResolvedValue(user as any);
      jest.spyOn(global, 'Date').mockImplementation(() => expiredAt);
      jest
        .spyOn(loginService, 'loginSpecials')
        .mockResolvedValue(loginData as any);

      const result = await service.registerWithFacebook(dto);

      expect(result).toEqual(loginData);
      expect(loginService.getLongLifeUserFacebookToken).toHaveBeenCalledWith(
        dto.token,
      );
      expect(loginService.getFacebookUserInformation).toHaveBeenCalledWith({
        user_id: dto.user_id,
        token: longLifeToken.access_token,
      });
      expect(
        service.getDetailsOrCreateUserWithLoginBySocialNetwork,
      ).toHaveBeenCalledWith(
        informationFacebook.id,
        provider,
        informationFacebook.email,
      );
      expect(loginService.loginSpecials).toHaveBeenCalledWith(
        {
          device_id: dto.device_id,
          expired_at: undefined,
          token: longLifeToken.access_token,
          user_facebook_id: dto.user_id,
          email: informationFacebook.email,
          user_id: user.id,
        },
        provider,
        dto.device_id,
        informationFacebook.id,
      );
    });

    it('should log error and return undefined if an error occurs', async () => {
      const dto = {
        device_id: 'device123',
        user_id: 'user123',
        token: 'token123',
        os: EOperatingSystem.IOS,
        device_token: 'deviceToken123',
      };
      const error = new Error('Test error');

      jest
        .spyOn(loginService, 'getLongLifeUserFacebookToken')
        .mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.registerWithFacebook(dto);

      expect(result).toBeUndefined();
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('registerWithLine', () => {
    it('should register with Line and return login data', async () => {
      const dto = {
        id_token: 'idToken123',
        client_id: 'clientId123',
        device_id: 'device123',
        os: EOperatingSystem.IOS,
        device_token: 'deviceToken123',
      };
      const provider = EAuthProvider.LINE;
      const profileLine = {
        sub: 'line123',
        email: 'test@example.com',
        exp: '3600',
      };
      const stringToDate = DateHelper.currentDate();
      const user = { id: '1', email: 'test@example.com' };
      const loginData = { accessToken: 'accessToken123' };

      jest
        .spyOn(loginService, 'getLineUserInformation')
        .mockResolvedValue(profileLine as any);
      jest
        .spyOn(service, 'getDetailsOrCreateUserWithLoginBySocialNetwork')
        .mockResolvedValue(user as any);
      jest.spyOn(global, 'Date').mockImplementation(() => stringToDate);
      jest
        .spyOn(loginService, 'loginSpecials')
        .mockResolvedValue(loginData as any);

      const result = await service.registerWithLine(dto);

      expect(result).toEqual(loginData);
      expect(loginService.getLineUserInformation).toHaveBeenCalledWith({
        id_token: dto.id_token,
        client_id: dto.client_id,
      });
      expect(
        service.getDetailsOrCreateUserWithLoginBySocialNetwork,
      ).toHaveBeenCalledWith(profileLine.sub, provider, profileLine.email);
      expect(loginService.loginSpecials).toHaveBeenCalledWith(
        {
          ...dto,
          expired_at: stringToDate,
          email: profileLine.email,
          user_id: user.id,
        },
        provider,
        dto.device_id,
        profileLine.sub,
      );
    });

    it('should log error and return undefined if an error occurs', async () => {
      const dto = {
        id_token: 'idToken123',
        client_id: 'clientId123',
        device_id: 'device123',
        os: EOperatingSystem.IOS,
        device_token: 'deviceToken123',
      };
      const error = new Error('Test error');

      jest
        .spyOn(loginService, 'getLineUserInformation')
        .mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.registerWithLine(dto);

      expect(result).toBeUndefined();
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('registerWithApple', () => {
    it('should register with Apple and return login data', async () => {
      const dto = {
        id_token: 'idToken123',
        device_id: 'device123',
        os: EOperatingSystem.IOS,
        device_token: 'deviceToken123',
      };
      const provider = EAuthProvider.APPLE;
      const appleIdInformation = {
        sub: 'apple123',
        email: 'test@example.com',
        exp: '3600',
      };
      const stringToDate = DateHelper.currentDate();
      const user = { id: '1', email: 'test@example.com' };
      const loginData = { accessToken: 'accessToken123' };

      jest
        .spyOn(loginService, 'getClaimsFromAppleIDToken')
        .mockResolvedValue(appleIdInformation as any);
      jest
        .spyOn(service, 'getDetailsOrCreateUserWithLoginBySocialNetwork')
        .mockResolvedValue(user as any);
      jest.spyOn(global, 'Date').mockImplementation(() => stringToDate);
      jest
        .spyOn(loginService, 'loginSpecials')
        .mockResolvedValue(loginData as any);

      const result = await service.registerWithApple(dto);

      expect(result).toEqual(loginData);
      expect(loginService.getClaimsFromAppleIDToken).toHaveBeenCalledWith(
        dto.id_token,
      );
      expect(
        service.getDetailsOrCreateUserWithLoginBySocialNetwork,
      ).toHaveBeenCalledWith(
        appleIdInformation.sub,
        provider,
        appleIdInformation.email,
      );
      expect(loginService.loginSpecials).toHaveBeenCalledWith(
        {
          device_id: dto.device_id,
          token: dto.id_token,
          expired_at: stringToDate,
          email: appleIdInformation.email,
          user_id: user.id,
        },
        provider,
        dto.device_id,
        appleIdInformation.sub,
      );
    });

    it('should log error and return undefined if an error occurs', async () => {
      const dto = {
        id_token: 'idToken123',
        device_id: 'device123',
        os: EOperatingSystem.IOS,
        device_token: 'deviceToken123',
      };
      const error = new Error('Test error');

      jest
        .spyOn(loginService, 'getClaimsFromAppleIDToken')
        .mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.registerWithApple(dto);

      expect(result).toBeUndefined();
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });
});
