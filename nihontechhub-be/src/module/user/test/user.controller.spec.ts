import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PoliciesGuard } from '../casl/policies.guard';
import { ERole } from '../../common/enum';
import { User } from './entities/user.entity';
import { CrudRequest } from '@dataui/crud';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getManyWithPageCount: jest.fn(),
            getOne: jest.fn(),
            updatePassword: jest.fn(),
            updateOneWithId: jest.fn(),
            deactivateAccount: jest.fn(),
          },
        },
        {
          provide: CaslAbilityFactory,
          useValue: jest.fn(),
        },
        {
          provide: PoliciesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMany', () => {
    it('should return users with pagination', async () => {
      const req = { parsed: { filter: [] } } as CrudRequest;
      const user = { role: ERole.USER } as User;
      const result = {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          totalCount: 0,
          totalPages: 0,
        },
      };
      jest.spyOn(service, 'getMany').mockResolvedValue(result as any);

      expect(await controller.getMany(req, user)).toBe(result);
    });

    it('should handle errors gracefully', async () => {
      const req = { parsed: { filter: [] } } as CrudRequest;
      const user = { role: ERole.USER } as User;
      jest
        .spyOn(service, 'getMany')
        .mockRejectedValue(new Error('Error fetching users'));

      await expect(controller.getMany(req, user)).rejects.toThrow(
        'Error fetching users',
      );
    });
  });

  describe('updatePassword', () => {
    it('should update the user password', async () => {
      const userId = '72600d1b-e294-420d-a34c-74b89791f8b7';
      const updatePasswordDto = {
        oldPassword: 'password',
        password: 'password',
      };
      const result = { id: userId, password: 'password' } as User;
      jest.spyOn(service, 'updatePassword').mockResolvedValue(result);

      expect(await controller.updatePassword(updatePasswordDto, userId)).toBe(
        result,
      );
    });

    it('should handle password update failure', async () => {
      const userId = '72600d1b-e294-420d-a34c-74b89791f8b7';
      const updatePasswordDto = {
        oldPassword: 'password',
        password: 'password',
      };
      jest
        .spyOn(service, 'updatePassword')
        .mockRejectedValue(new Error('Password update failed'));

      await expect(
        controller.updatePassword(updatePasswordDto, userId),
      ).rejects.toThrow('Password update failed');
    });
  });

  describe('updateMe', () => {
    it('should update the current user', async () => {
      const userId = '72600d1b-e294-420d-a34c-74b89791f8b7';
      const dto = { email: 'me@gmail.com' };
      const user = { id: userId, email: 'me@gmail.com' } as User;
      jest.spyOn(service, 'updateOne').mockResolvedValue(user);

      expect(await controller.updateMe(userId, dto)).toBe(user);
    });

    it('should handle update failure', async () => {
      const userId = '72600d1b-e294-420d-a34c-74b89791f8b7';
      const dto = { email: 'me@gmail.com' };
      jest
        .spyOn(service, 'updateOne')
        .mockRejectedValue(new Error('Update failed'));

      await expect(controller.updateMe(userId, dto)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('deactivateAccount', () => {
    it('should deactivate the user account', async () => {
      const userId = '72600d1b-e294-420d-a34c-74b89791f8b7';
      const result = { id: userId, active: false };
      jest.spyOn(service, 'deactivateAccount').mockResolvedValue(result as any);

      expect(await controller.deactivateAccount(userId)).toBe(result);
    });

    it('should handle deactivation failure', async () => {
      const userId = '72600d1b-e294-420d-a34c-74b89791f8b7';
      jest
        .spyOn(service, 'deactivateAccount')
        .mockRejectedValue(new Error('Deactivation failed'));

      await expect(controller.deactivateAccount(userId)).rejects.toThrow(
        'Deactivation failed',
      );
    });
  });
});
