import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { currentDate } from '../../common/utils';
import * as bcrypt from 'bcrypt';
import { EAuthProvider, ERole } from '../../common/enum';
import { errorMessage } from '../../common/error-message';
import { DateHelper } from 'src/common/helper';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isAdmin', () => {
    it('should return true if user is admin', async () => {
      const id = 1;
      const user = { id: `${id}`, role: ERole.ADMIN };
      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);

      const result = await service.isAdmin(id);
      expect(result).toBe(true);
    });

    it('should return false if user is not admin', async () => {
      const id = 2;
      const user = { id: `${id}`, role: ERole.USER };
      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);

      const result = await service.isAdmin(id);
      expect(result).toBe(false);
    });

    it('should throw an error if getOne throws an error', async () => {
      const id = 3;
      jest
        .spyOn(service, 'getOne')
        .mockRejectedValue(new Error('User not found'));

      await expect(service.isAdmin(id)).rejects.toThrow('User not found');
    });
  });

  describe('getUserByIdWithRelations', () => {
    it('should return user with relations', async () => {
      const id = '1';
      const user = { id, name: 'John Doe' };
      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);

      const result = await service.getUserByIdWithRelations(id);
      expect(result).toEqual(user);
    });

    it('should throw an error if getOne throws an error', async () => {
      const id = '2';
      jest
        .spyOn(service, 'getOne')
        .mockRejectedValue(new Error('User not found'));

      await expect(service.getUserByIdWithRelations(id)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('createNewPassword', () => {
    const fixedDate = new Date('2024-10-08T06:43:54.932Z');
    beforeAll(() => {
      jest.useFakeTimers({ now: fixedDate });
      jest.setSystemTime(fixedDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should create a new password for the user', async () => {
      const email = 'test@example.com';
      const password = 'newPassword';
      const passwordHash = 'hashedPassword';
      const data = {
        passwordChangedAt: currentDate(),
        password: passwordHash,
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(passwordHash as never);
      jest.spyOn(service, 'updateOne').mockResolvedValue(data as any);

      const result = await service.createNewPassword(email, password);
      expect(bcrypt.hash).toHaveBeenCalledWith(
        password,
        parseInt(process.env.SALT_ROUNDS),
      );
      expect(service.updateOne).toHaveBeenCalledWith({
        where: { email },
        dto: data,
      });
      expect(result).toEqual(data);
    });

    it('should log an error and return if an exception is thrown', async () => {
      const email = 'test@example.com';
      const password = 'newPassword';
      const error = new Error('Something went wrong');

      jest.spyOn(bcrypt, 'hash').mockRejectedValue(error as never);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      const result = await service.createNewPassword(email, password);
      expect(Logger.error).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('should update user without changing password', async () => {
      const id = '1';
      const dto: UpdateUserDTO = { email: 'John Doe' };
      const updatedUser = { id, ...dto };

      jest.spyOn(service, 'updateOne').mockResolvedValue(updatedUser as any);

      const result = await service.updateUser(id, dto);
      expect(result).toEqual(updatedUser);
      expect(service.updateOne).toHaveBeenCalledWith({ id, dto });
    });

    it('should throw BadRequestException if dto contains password', async () => {
      const id = '1';
      const dto: UpdateUserDTO = { password: 'newPassword' };

      await expect(service.updateUser(id, dto)).rejects.toThrow(
        new BadRequestException(errorMessage.password.wrongUpdatePasswordRoute),
      );
    });
  });

  describe('updatePassword', () => {
    it('should update the password for the user', async () => {
      const id = '1';
      const updatePasswordDto = {
        oldPassword: 'oldPassword',
        password: 'newPassword',
      };
      const user = {
        id,
        password: 'hashedNewPassword',
        passwordChangedAt: DateHelper.currentDate(),
      };
      const hashedNewPassword = 'hashedNewPassword';

      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedNewPassword as never);
      jest.spyOn(service, 'updateOne').mockResolvedValue(user as any);

      const result = await service.updatePassword(id, updatePasswordDto);
      expect(service.getOne).toHaveBeenCalledWith({
        field: 'id',
        value: id,
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        updatePasswordDto.oldPassword,
        user.password,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(updatePasswordDto.password, 10);
      expect(service.updateOne).toHaveBeenCalledWith({
        where: id,
        dto: user,
      });
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const id = '1';
      const updatePasswordDto = {
        oldPassword: 'oldPassword',
        password: 'newPassword',
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(null);

      await expect(
        service.updatePassword(id, updatePasswordDto),
      ).rejects.toThrow(
        new UnauthorizedException(errorMessage.invalidRecord('token')),
      );
    });

    it('should throw UnauthorizedException if old password does not match', async () => {
      const id = '1';
      const updatePasswordDto = {
        oldPassword: 'wrongOldPassword',
        password: 'newPassword',
      };
      const user = {
        id,
        password: 'hashedOldPassword',
        passwordChangedAt: DateHelper.currentDate(),
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        service.updatePassword(id, updatePasswordDto),
      ).rejects.toThrow(
        new UnauthorizedException({
          statusCode: 401,
          data: ['E0011'],
          message: errorMessage.login.incorrectLoginDetail,
        }),
      );
    });

    it('should log an error and throw if an exception is thrown', async () => {
      const id = '1';
      const updatePasswordDto = {
        oldPassword: 'oldPassword',
        password: 'newPassword',
      };
      const error = new Error('Something went wrong');

      jest.spyOn(service, 'getOne').mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      await expect(
        service.updatePassword(id, updatePasswordDto),
      ).rejects.toThrow(error);
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('validateEqualProvider', () => {
    it('should return true if provider and userProvider are equal', () => {
      const provider = EAuthProvider.FACEBOOK;
      const userProvider = EAuthProvider.FACEBOOK;

      const result = service.validateEqualProvider(provider, userProvider);
      expect(result).toBe(true);
    });

    it('should return false if provider and userProvider are not equal', () => {
      const provider = EAuthProvider.EMAIL;
      const userProvider = EAuthProvider.FACEBOOK;

      const result = service.validateEqualProvider(provider, userProvider);
      expect(result).toBe(false);
    });
  });

  describe('isUserNotDeletedAtOrInactive', () => {
    it('should return true if user is not deleted and is active', () => {
      const deletedAt = null;
      const active = true;

      const result = service.isUserNotDeletedAtOrInactive(deletedAt, active);
      expect(result).toBe(true);
    });

    it('should return false if user is deleted', () => {
      const deletedAt = DateHelper.currentDate();
      const active = true;

      const result = service.isUserNotDeletedAtOrInactive(deletedAt, active);
      expect(result).toBe(false);
    });

    it('should return false if user is inactive', () => {
      const deletedAt = null;
      const active = false;

      const result = service.isUserNotDeletedAtOrInactive(deletedAt, active);
      expect(result).toBe(false);
    });

    it('should return false if user is deleted and inactive', () => {
      const deletedAt = DateHelper.currentDate();
      const active = false;

      const result = service.isUserNotDeletedAtOrInactive(deletedAt, active);
      expect(result).toBe(false);
    });
  });

  describe('isPassWordChanged', () => {
    it('should return true if passwordChangedAt is null', () => {
      const passwordChangedAt = null;
      const payloadIat = 1234567890;

      const result = service.isPassWordChanged(passwordChangedAt, payloadIat);
      expect(result).toBe(true);
    });
  });

  describe('activeAccount', () => {
    it('should activate the account', async () => {
      const id = '1';
      const data = { active: true };
      const updatedUser = { id, ...data };

      jest.spyOn(service, 'updateOne').mockResolvedValue(updatedUser as any);

      const result = await service.activeAccount(id);
      expect(result).toEqual(updatedUser);
      expect(service.updateOne).toHaveBeenCalledWith({ id, dto: data });
    });

    it('should throw an error if updateOne throws an error', async () => {
      const id = '1';
      const error = new Error('Something went wrong');

      jest.spyOn(service, 'updateOne').mockRejectedValue(error);

      await expect(service.activeAccount(id)).rejects.toThrow(
        'Something went wrong',
      );
    });
  });

  describe('deactivateAccount', () => {
    it('should deactivate the account', async () => {
      const id = '1';
      const data = { active: false };
      const updatedUser = { id, ...data };

      jest.spyOn(service, 'updateOne').mockResolvedValue(updatedUser as any);

      const result = await service.deactivateAccount(id);
      expect(result).toEqual(updatedUser);
      expect(service.updateOne).toHaveBeenCalledWith({ id, dto: data });
    });

    it('should throw an error if updateOne throws an error', async () => {
      const id = '1';
      const error = new Error('Something went wrong');

      jest.spyOn(service, 'updateOne').mockRejectedValue(error);

      await expect(service.deactivateAccount(id)).rejects.toThrow(
        'Something went wrong',
      );
    });
  });

  describe('validateUserWithJWTPayload', () => {
    it('should return a user if validation is successful', async () => {
      const payload = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        iat: 1234567890,
        device_id: 'someDeviceId',
      };
      const user = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        deleted_at: null,
        active: true,
        passwordChangedAt: new Date('2023-01-01T00:00:00Z'),
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);
      jest.spyOn(service, 'validateEqualProvider').mockReturnValue(true);
      jest.spyOn(service, 'isUserNotDeletedAtOrInactive').mockReturnValue(true);
      jest.spyOn(service, 'isPassWordChanged').mockReturnValue(true);

      const result = await service.validateUserWithJWTPayload(payload);
      expect(result).toEqual(user);
    });

    it('should throw BadRequestException if user is not found', async () => {
      const payload = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        iat: 1234567890,
        device_id: 'someDeviceId',
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(null);

      await expect(service.validateUserWithJWTPayload(payload)).rejects.toThrow(
        new BadRequestException({
          statusCode: 400,
          data: ['E0003'],
          message: errorMessage.notFoundRecord('user'),
        }),
      );
    });

    it('should throw BadRequestException if provider does not match', async () => {
      const payload = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        iat: 1234567890,
        device_id: 'someDeviceId',
      };
      const user = { id: '1', provider: EAuthProvider.FACEBOOK };

      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);
      jest.spyOn(service, 'validateEqualProvider').mockReturnValue(false);

      await expect(service.validateUserWithJWTPayload(payload)).rejects.toThrow(
        new BadRequestException(
          `${EAuthProvider.EMAIL} account is not supported, please use ${user.provider} account to login.`,
        ),
      );
    });

    it('should throw BadRequestException if user is deleted or inactive', async () => {
      const payload = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        iat: 1234567890,
        device_id: 'someDeviceId',
      };
      const user = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        deleted_at: DateHelper.currentDate(),
        active: false,
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);
      jest.spyOn(service, 'validateEqualProvider').mockReturnValue(true);
      jest
        .spyOn(service, 'isUserNotDeletedAtOrInactive')
        .mockReturnValue(false);

      await expect(service.validateUserWithJWTPayload(payload)).rejects.toThrow(
        new BadRequestException(errorMessage.user.accountNotActive),
      );
    });

    it('should throw UnauthorizedException if password was changed after token was issued', async () => {
      const payload = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        iat: 1234567890,
        device_id: 'someDeviceId',
      };
      const user = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        deleted_at: null,
        active: true,
        passwordChangedAt: new Date('2023-01-01T00:00:00Z'),
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(user as any);
      jest.spyOn(service, 'validateEqualProvider').mockReturnValue(true);
      jest.spyOn(service, 'isUserNotDeletedAtOrInactive').mockReturnValue(true);
      jest.spyOn(service, 'isPassWordChanged').mockReturnValue(false);

      await expect(service.validateUserWithJWTPayload(payload)).rejects.toThrow(
        new UnauthorizedException(errorMessage.invalidRecord('token')),
      );
    });

    it('should log an error and throw if an exception is thrown', async () => {
      const payload = {
        id: '1',
        provider: EAuthProvider.EMAIL,
        iat: 1234567890,
        device_id: 'someDeviceId',
      };
      const error = new Error('Something went wrong');

      jest.spyOn(service, 'getOne').mockRejectedValue(error);
      jest.spyOn(Logger, 'error').mockImplementation(() => {});

      await expect(service.validateUserWithJWTPayload(payload)).rejects.toThrow(
        error,
      );
      expect(Logger.error).toHaveBeenCalledWith(error);
    });
  });
});
