import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EAudienceType, ELanguage } from 'src/common/enums';
import { TCustomParsedRequestParams } from 'src/common/types';
import { BaseMongoService } from '../../common/services/base-mongo.service';
import { PushNotification } from '../push-notification/entities/push-notification.entity';
import { CreateDeviceTokenDTO } from './dto';
import { DeviceToken } from './entities/device-token.entity';
import { BASE_DEVICE_TOKEN_ERROR } from './error';

@Injectable()
export class DeviceTokenService extends BaseMongoService<DeviceToken> {
  constructor(
    @InjectRepository(DeviceToken, 'mikro_orm_2')
    private readonly repo: EntityRepository<DeviceToken>,
  ) {
    super(repo, BASE_DEVICE_TOKEN_ERROR);
  }

  //get devices firebase
  async getDevicesFirebaseForPushNotification(
    data: Pick<
      PushNotification,
      'audienceType' | 'recipientRole' | 'recipientIds'
    >,
  ): Promise<DeviceToken[]> {
    const parsed: Partial<TCustomParsedRequestParams<DeviceToken>> = {
      fields: ['token', 'language'],
      filter: [
        {
          field: 'authorRole',
          operator: '$eq',
          value: data.recipientRole,
        },
        {
          field: 'active',
          operator: 'eq',
          value: true,
        },
      ],
    };
    if (data.audienceType !== EAudienceType.ALL) {
      parsed.filter.push({
        field: 'authorId',
        operator: '$in',
        value: data?.recipientIds,
      });
    }
    const result = (await super.getMany(parsed)) as DeviceToken[];
    return result;
  }

  /**
   * Splits an array of tokens into batches of a specified size
   * @param tokens Array of device tokens
   * @param batchSize Maximum number of tokens per batch (default: 500)
   * @returns Array of token batches
   */
  private splitTokensIntoBatches(tokens: string[]): string[][] {
    const chuck = 500;
    const result: string[][] = [];

    while (tokens.length > 0) {
      result.push(tokens.splice(0, chuck));
    }
    return result;
  }

  /**
   * Groups device tokens by language and splits them into batches
   * @param devices Array of device tokens
   * @returns Map where keys are languages and values are arrays of token batches
   */
  mapTokensByLanguage(devices: DeviceToken[]): Map<ELanguage, string[][]> {
    // Step 1: Group tokens by language
    const tokensByLanguage = new Map<ELanguage, string[]>();
    devices.forEach((device) => {
      if (!device.token) {
        return; // Skip devices without tokens
      }
      const key = device.language;
      const value = device.token;
      if (!tokensByLanguage.has(key)) {
        tokensByLanguage.set(key, []);
      }
      tokensByLanguage.get(key)?.push(value);
    });

    //  Step 2: Split tokens into batches for each language
    const batchedTokensByLanguage = new Map<ELanguage, string[][]>();

    tokensByLanguage.forEach((tokens, language) => {
      const batches = this.splitTokensIntoBatches(tokens);
      batchedTokensByLanguage.set(language, batches);
    });

    return batchedTokensByLanguage;
  }

  //create or update device token
  @OnEvent('notification.createOrUpdateDeviceTokens')
  async createOrUpdateDeviceTokens(body: CreateDeviceTokenDTO) {
    try {
      const { deviceId } = body;

      const device = await this.updateOrInsert(
        {
          filter: [
            {
              field: 'deviceId',
              operator: 'eq',
              value: deviceId,
            },
          ],
        },
        body,
      );
      return device;
    } catch (e) {
      throw e;
    }
  }
}
