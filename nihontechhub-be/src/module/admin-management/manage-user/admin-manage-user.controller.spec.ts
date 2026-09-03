import { CrudRequest } from '@dataui/crud';
import { Test, TestingModule } from '@nestjs/testing';
import { ERole } from '../../../common/enums';
import { CaslAbilityFactory } from '../../../common/casl/casl-ability.factory';
import { PoliciesGuard } from '../../../common/casl/policies.guard';
import { CreateManyUserDTO } from '../../user/dto/create-user-bulk.dto';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { AdminManageUserController } from './admin-manage-user.controller';
import { BaseIdDTO } from 'src/common/dto';

describe('AdminManageUserController', () => {
  let controller: AdminManageUserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminManageUserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getMany: jest.fn(),
            getOne: jest.fn(),
            createManyEntitiesWithSubcribers: jest.fn(),
            createOneWithSubcriber: jest.fn(),
            deactivateAccount: jest.fn(),
            activeAccount: jest.fn(),
            recover: jest.fn(),
            updateUser: jest.fn(),
            hardDeleteOne: jest.fn(),
            softDeleteByFieldById: jest.fn(),
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

    controller = module.get<AdminManageUserController>(
      AdminManageUserController,
    );
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMany', () => {
    it('should return users with pagination', async () => {
      const req = { parsed: { filter: [] } } as CrudRequest;
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
      const users = await controller.getMany(req);
      expect(users).toEqual(result);
    });
  });

  describe('getOne', () => {
    it('should return current user', async () => {
      const req = { parsed: {} } as CrudRequest;
      const id = { id: '' } as BaseIdDTO;
      const result = { id: '', email: '', role: ERole.USER };
      jest.spyOn(service, 'getOne').mockResolvedValue(result as any);
      const user = await controller.getOne(req, id);
      expect(user).toEqual(result);
    });
  });

  describe('createMany', () => {
    it('should create users', async () => {
      const dtos = {
        users: [{ email: '', password: '' }],
      } as CreateManyUserDTO;
      const result: { id: string; email: string; role: ERole }[] = [
        { id: '', email: dtos.users[0].email, role: ERole.USER },
      ];
      jest.spyOn(service, 'createMany').mockResolvedValue(result as any);
      const createdUsers = await controller.createMany(dtos);
      expect(createdUsers).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should create user', async () => {
      const dto = { email: '', password: '' };
      const result = { id: '', ...dto, role: ERole.USER };
      jest.spyOn(service, 'createOne').mockResolvedValue(result as any);
      const createdUser = await controller.createOne(dto);
      expect(createdUser).toEqual(result);
    });
  });

  describe('deactivateAccount', () => {
    it('should deactivate user account', async () => {
      const id = { id: '' } as BaseIdDTO;
      const result = {} as User;
      jest.spyOn(service, 'deactivateAccount').mockResolvedValue(result);
      const deactivatedUser = await controller.deactivateAccount(id);
      expect(deactivatedUser).toEqual(result);
    });
  });

  describe('activeAccount', () => {
    it('should activate user account', async () => {
      const id = { id: '' } as BaseIdDTO;
      const result = {} as User;
      jest.spyOn(service, 'activeAccount').mockResolvedValue(result);
      const deactivatedUser = await controller.activeAccount(id);
      expect(deactivatedUser).toEqual(result);
    });
  });

  describe('recover', () => {
    it('should recover user', async () => {
      const id = { id: '' } as BaseIdDTO;
      const result = {} as User;
      jest.spyOn(service, 'recover').mockResolvedValue(result);
      const recoveredUser = await controller.recoverUser(id);
      expect(recoveredUser).toEqual(result);
    });
  });

  describe('hardDeleteOne', () => {
    it('should hard delete user', async () => {
      const id = { id: '' } as BaseIdDTO;
      const result = { success: true };
      jest.spyOn(service, 'hardDeleteOne').mockResolvedValue(result as any);
      const deletedUser = await controller.hardDeleteOne(id);
      expect(deletedUser).toEqual(result);
    });
  });

  describe('softRemoveOne', () => {
    it('should soft delete user', async () => {
      const id = { id: '' } as BaseIdDTO;
      const result = {} as User;
      jest.spyOn(service, 'softDelete').mockResolvedValue(result as any);
      const deletedUser = await controller.softDelete(id);
      expect(deletedUser).toEqual(result);
    });
  });
});
