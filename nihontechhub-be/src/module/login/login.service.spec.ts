import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { EAuthProvider, EOperatingSystem, ERole } from '../../common/enums';
import * as helpers from '../../common/helper';
import { RefreshToken } from '../refresh-token/entities/refresh-token.entity';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { AppleIdToken } from '../socials-network/entities/apple-id-token.entity';
import { FacebookToken } from '../socials-network/entities/facebook-token.entity';
import { LineToken } from '../socials-network/entities/line-token.entity';
import { AppleTokenService } from '../socials-network/services/apple-token.service';
import { FacebookTokenService } from '../socials-network/services/facebook-token.service';
import { LineTokenService } from '../socials-network/services/line-token.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginWithEmailPasswordDTO } from './dto/login-with-email-password.dto';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  // let configService: ConfigService;
  // let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        UserService,
        JwtService,
        ConfigService,
        FacebookTokenService,
        AppleTokenService,
        LineTokenService,
        RefreshTokenService,
        {
          provide: getRepositoryToken(User),
          useClass: EntityRepository,
        },
        {
          provide: getRepositoryToken(FacebookToken),
          useClass: EntityRepository,
        },
        {
          provide: getRepositoryToken(LineToken),
          useClass: EntityRepository,
        },
        {
          provide: getRepositoryToken(AppleIdToken),
          useClass: EntityRepository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTokenSpecialUser', () => {
    it('should log error and return undefined if request fails', async () => {
      const payload = {
        provider: EAuthProvider.FACEBOOK,
        id: 'testUserId',
        device_id: 'testDeviceId',
      };
      const error = new Error('Request failed');
      jest
        .spyOn(service['facebookTokenService'], 'getOne')
        .mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.getTokenSpecialUser(payload);

      expect(result).toBeUndefined();
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('validateSpecialsUser', () => {
    it('should return true if token is valid and not expired', async () => {
      const payload = {
        provider: EAuthProvider.FACEBOOK,
        id: 'testUserId',
        device_id: 'testDeviceId',
      };
      const getToken = [
        {
          expired_at: '2099-12-31T23:59:59Z',
        },
      ];
      jest.spyOn(service, 'getTokenSpecialUser').mockResolvedValue(getToken);
      jest.spyOn(helpers.DateHelper, 'compareLessDates').mockReturnValue(false);

      const result = await service.validateSpecialsUser(payload);

      expect(result).toBe(true);
      expect(service.getTokenSpecialUser).toHaveBeenCalledWith(payload);
      expect(helpers.DateHelper.compareLessDates).toHaveBeenCalledWith(
        getToken[0]?.expired_at,
        expect.any(Date),
      );
    });

    it('should log error and return undefined if request fails', async () => {
      const payload = {
        provider: EAuthProvider.FACEBOOK,
        id: 'testUserId',
        device_id: 'testDeviceId',
      };
      const error = new Error('Request failed');
      jest.spyOn(service, 'getTokenSpecialUser').mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.validateSpecialsUser(payload);

      expect(result).toBeUndefined();
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const loginUserDto: LoginWithEmailPasswordDTO = {
        email: 'test@example.com',
        password: 'password123',
        provider: EAuthProvider.EMAIL,
        deviceId: 'device123',
        os: EOperatingSystem.IOS,
        deviceToken: 'deviceToken123',
      };
      const user = {
        email: 'test@example.com',
        id: 'user123',
        role: ERole.USER,
        provider: EAuthProvider.EMAIL,
      } as User;
      const createToken = {
        token: 'accessToken',
        refreshToken: 'refreshToken',
      };
      const result = {
        id: user.id,
        email: user.email,
        token: createToken.token,
        role: user.role,
        refreshToken: createToken.refreshToken,
      };
      const response = await service.login(loginUserDto);
      jest.spyOn(service, 'login').mockResolvedValue(result);
      expect(response.email).toBe(result.email);
    });
  });
});
