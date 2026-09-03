import { Test, TestingModule } from '@nestjs/testing';
import { PushNotificationController } from './push-notification.controller';
import { PushNotificationService } from './push-notification.service';
import { ENotificationType } from '../../common/enums';
import { CreateBulkNotificationDTO } from './dto/create-bulk-notification.dto';
import { PushNotification } from './entities/push-notification.entity';
import { CreatePushNotificationDTO } from './dto/create-push-notification.dto';
import { User } from '../user/entities/user.entity';
import { CrudRequest } from '@dataui/crud';
import { TManyWithPageCout } from '../../common/services/base.interface';
import { CaslAbilityFactory } from '../../common/casl/casl-ability.factory';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ObjectId } from 'mongoose';

describe('PushNotificationController', () => {
  let controller: PushNotificationController;
  let service: PushNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushNotificationController],
      providers: [
        {
          provide: PushNotificationService,
          useValue: {
            createOrUpdateDeviceTokens: jest.fn(),
            sendBulkNotification: jest.fn(),
            sendAllNotification: jest.fn(),
            sendOneNotification: jest.fn(),
            getManyWithPageCount: jest.fn(),
          },
        },
        CaslAbilityFactory,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: EntityRepository,
        },
      ],
    }).compile();

    controller = module.get<PushNotificationController>(
      PushNotificationController,
    );
    service = module.get<PushNotificationService>(PushNotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendBulkNotification', () => {
    it('should send bulk notification', async () => {
      const createBulkNotificationDto: CreateBulkNotificationDTO = {
        userIds: ['user-id'],
        title: 'Test Title',
        content: 'Test Content',
        type: ENotificationType.NewMessage,
        scheduleTime: DateHelper.currentDate(),
      };
      const id = 'user-id';
      const result = { success: true } as unknown as PushNotification &
        Required<{ _id: ObjectId }>;

      jest.spyOn(service, 'sendBulkNotification').mockResolvedValue(result);

      expect(
        await controller.sendBulkNotification(createBulkNotificationDto, id),
      ).toBe(result);
      expect(service.sendBulkNotification).toHaveBeenCalledWith(
        createBulkNotificationDto,
        id,
      );
    });
  });

  describe('sendNotificationToAllUser', () => {
    it('should send notification to all users', async () => {
      const body: CreatePushNotificationDTO = {
        title: 'Test Title',
        content: 'Test Content',
        type: ENotificationType.NewMessage,
        scheduleTime: DateHelper.currentDate(),
      };
      const _id = 'user-id';
      const result = {
        success: true,
        _id,
      } as unknown as PushNotification & Required<{ _id: ObjectId }>;

      jest.spyOn(service, 'sendAllNotification').mockResolvedValue(result);

      expect(await controller.sendNotificationToAllUser(body, _id)).toBe(
        result,
      );
      expect(service.sendAllNotification).toHaveBeenCalledWith(body, _id);
    });
  });

  describe('sendNotificationToCurrentUser', () => {
    it('should send notification to a specific user', async () => {
      const id = 'user-id';
      const deviceTokenDto: CreatePushNotificationDTO = {
        userIds: [],
        title: 'Test Title',
        content: 'Test Content',
        type: ENotificationType.NewMessage,
        scheduleTime: DateHelper.currentDate(),
      };
      const user = { id: 'user-id' } as User;
      const result = {
        success: true,
        _id: 'notification-id',
      } as unknown as PushNotification & Required<{ _id: ObjectId }>;

      jest.spyOn(service, 'sendOneNotification').mockResolvedValue(result);

      expect(
        await controller.sendNotificationToCurrentUser(
          id,
          deviceTokenDto,
          user,
        ),
      ).toBe(result);
      expect(service.sendOneNotification).toHaveBeenCalledWith(
        { ...deviceTokenDto, user_ids: [id] },
        user,
      );
    });
  });

  describe('getMany', () => {
    it('should get notifications for a user', async () => {
      const id = 'user-id';
      const req = { parsed: { or: [] } } as CrudRequest;
      const result = {
        data: [],
        count: 1,
        page: 1,
        pageCount: 1,
      } as unknown as TManyWithPageCout<PushNotification>;

      jest.spyOn(service, 'getMany').mockResolvedValue(result as any);

      expect(await controller.getMany(id, req)).toBe(result);
      expect(service.getMany).toHaveBeenCalledWith({
        ...req.parsed,
        or: [...req.parsed.or],
      });
    });
  });
});
