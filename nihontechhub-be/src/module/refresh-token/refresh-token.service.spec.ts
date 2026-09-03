import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenService } from './refresh-token.service';
import { ConfigService } from '@nestjs/config';
import { EntityRepository } from '@mikro-orm/mysql';
import { RefreshToken } from './entities/refresh-token.entity';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

// Mock dependencies
const mockConfigService = {
  get: jest.fn(),
};

const mockRefreshTokenRepo = {
  create: jest.fn(),
  persistAndFlush: jest.fn(),
  findOne: jest.fn(),
  getEntityManager: jest.fn(),
};

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: EntityRepository, useValue: mockRefreshTokenRepo },
        { provide: 'RefreshTokenRepository', useValue: mockRefreshTokenRepo }, // Explicitly provide repository
      ],
    }).compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('saveRefreshToken', () => {
    it('should save a refresh token and return the token string', async () => {
      const email = 'test@example.com';
      const userId = '12345';
      const mockRefreshToken = {
        refreshToken: 'hashedToken',
        expiryDate: DateHelper.currentDate(),
      };

      jest
        .spyOn(service, 'createRefreshToken')
        .mockReturnValue(mockRefreshToken);
      jest.spyOn(service, 'createOne').mockResolvedValue(undefined);

      const result = await service.saveRefreshToken(email, userId);

      expect(service.createRefreshToken).toHaveBeenCalledWith(email);
      expect(service.createOne).toHaveBeenCalledWith({
        user_id: userId,
        email,
        token: mockRefreshToken.refreshToken,
        expiredAt: mockRefreshToken.expiryDate,
        isUsed: false,
        user: { id: userId },
      });
      expect(result).toBe(mockRefreshToken.refreshToken);
    });
  });
  describe('invalidateToken', () => {
    it('should invalidate a token', async () => {
      const token = new RefreshToken();
      token.id = '1';
      jest.spyOn(service, 'getOne').mockResolvedValue(token);
      jest.spyOn(service, 'updateOne').mockResolvedValue(undefined);

      const result = await service.invalidateToken(token.token);

      expect(result).toBe(token);
      expect(result.isUsed).toBe(undefined);
    });

    it('should throw BadRequestException if token is not found', async () => {
      mockRefreshTokenRepo.findOne.mockResolvedValue(null);

      await expect(service.invalidateToken('invalid_token')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('hashTokenByCrypto', () => {
    it('should hash the token using SHA256', () => {
      const rawToken = 'test_token';
      const hashedToken = service.hashTokenByCrypto(rawToken);

      const expectedHash = crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');

      expect(hashedToken).toBe(expectedHash);
    });
  });
});
