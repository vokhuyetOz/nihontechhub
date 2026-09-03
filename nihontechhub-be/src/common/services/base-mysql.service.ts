import {
  EntityData,
  EntityManager,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  RequiredEntityData,
  wrap,
} from '@mikro-orm/core';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BaseMySqlEntity } from '../entities/base-mysql.entity';
import { BASE_SERVICER_ERROR } from '../errors';
import { BaseServiceHelper } from '../helper';
import {
  TBaseError,
  TBaseValidateType,
  TCustomParsedRequestParams,
  TResponseGetManyBase,
  TResponseUpdate,
} from '../types';
import { DateHelper } from './../helper/date.helper';

/**
 * example using search
 - or:
  {
    "$or": [
      {
        "version": {
          "$eq": 7
        },
        "email": {
          "$eq": "huytt@rabiloo.com"
        }
      },
      {
        "version": {
          "$eq": 2
        },
        "email": {
          "$isnotnull": "huytt12@email.com"
        }
      }
    ]
  }
  - and :
    {
      "email": {
        "$eq": "huytt@rabiloo.com"
      },
      "version": {
        "$eq": 7
      }
    }
*/

dayjs.extend(utc);
@Injectable()
export class BaseMySqlService<T extends BaseMySqlEntity> {
  protected readonly em: EntityManager;
  constructor(
    protected readonly repository: EntityRepository<T>,
    protected readonly baseError?: TBaseError,
  ) {
    this.em = this.repository.getEntityManager();
    if (!baseError) this.baseError = BASE_SERVICER_ERROR;
  }

  count = async (
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ): Promise<number> => {
    BaseServiceHelper.interceptorParsedRequestParamsToCondition(parsed);

    const where: FilterQuery<T> =
      BaseServiceHelper.convertParsedRequestParamsToCondition(parsed);

    const options = BaseServiceHelper.convertParsedRequestToQueryOption(
      parsed,
      findOption,
    );

    const count = await this.repository.count(where, options);

    return count;
  };

  async getOneWithoutValidate(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ): Promise<T> {
    BaseServiceHelper.interceptorParsedRequestParamsToCondition(parsed);

    const where: FilterQuery<T> =
      BaseServiceHelper.convertParsedRequestParamsToCondition(parsed);

    const options = BaseServiceHelper.convertParsedRequestToQueryOption(
      parsed,
      findOption,
    ) as FindOneOptions<T>;

    const entity = await this.repository.findOne(where, options);

    return entity;
  }

  getOne = async (
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ): Promise<T> => {
    const { message, code } = this?.baseError.NOT_FOUND;

    const entity = await this.getOneWithoutValidate(parsed, findOption);

    if (!entity) throw new NotFoundException(message, { description: code });

    return entity;
  };

  private async convertResGetManyWithCursor(
    where: FilterQuery<T>,
    options: any,
  ) {
    const limit = options.limit + 1;

    const records = await this.repository.find(where, {
      ...options,
      limit,
    });

    const hasMore = records.length === limit;
    const startCursor = records[0]?.id;
    const result = hasMore ? records.slice(0, -1) : records;
    const nextCursor = hasMore ? result[result.length - 1]?.id : null;

    return { data: result, startCursor, nextCursor, hasMore };
  }

  /**
   * Get many entities
   * @param parsed Parsed request parameters
   * @param findOption Additional find options
   *
   * @param parsed have page AND limit return => TGetManyDefaultResponse<E>
   *
   * @param parsed have cursor AND limit return => TResponseGetManyWithCursor<E>
   *
   * @default return E[]
   *
   */

  async getMany(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ): Promise<TResponseGetManyBase<T>> {
    BaseServiceHelper.interceptorParsedRequestParamsToCondition(parsed);

    const where: FilterQuery<T> =
      BaseServiceHelper.convertParsedRequestParamsToCondition(parsed);

    const options = BaseServiceHelper.convertParsedRequestToQueryOption(
      parsed,
      findOption,
    );

    if (options?.limit && parsed?.cursor)
      return this.convertResGetManyWithCursor(where, options);

    const entities = await this.repository.find(where, options);

    if (options?.limit && options?.offset >= 0) {
      const total = await this.repository.count(where, options);
      return {
        data: entities,
        count: entities.length,
        total,
        page: parsed.page || 1,
        pageCount: Math.ceil(total / options.limit),
      };
    }

    return entities;
  }

  async createOne<Convert extends boolean = false>(
    dto: RequiredEntityData<T, never, Convert>,
  ): Promise<T> {
    const { message, code } = this?.baseError.CREATE_FAILED;

    const entity = this.repository.create(dto);

    await this.em.persistAndFlush(entity);

    if (!entity) throw new BadRequestException(message, { description: code });

    return entity;
  }

  async createMany<Convert extends boolean = false>(
    dto: RequiredEntityData<T, never, Convert>[],
  ): Promise<T[]> {
    const { message, code } = this?.baseError.CREATE_FAILED;

    const entities = dto.map((item) => this.repository.create(item));

    await this.em.persistAndFlush(entities);

    if (!entities)
      throw new BadRequestException(message, { description: code });

    return entities;
  }

  async updateOne(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    dto: EntityData<T>,
  ): Promise<T> {
    const { message, code } = this?.baseError.UPDATE_CONFLICT;

    const entity = await this.getOne(parsed);

    if (
      'version' in dto &&
      typeof dto.version === 'number' &&
      dto.version !== entity.version
    )
      throw new ConflictException(message, { description: code });

    wrap(entity).assign(dto as any);

    try {
      await this.em.flush();

      return entity;
    } catch (error) {
      if (error.name === 'UniqueConstraintViolationException')
        throw new ConflictException(message, { description: code });

      throw error;
    }
  }

  async updateOrInsert<Convert extends boolean = false>(
    dto: RequiredEntityData<T, never, Convert>,
    parsed: Partial<TCustomParsedRequestParams<T>>,
  ): Promise<T> {
    const { message, code } = this?.baseError.SOFT_DELETE_FAILED;

    parsed.withDeleted = true;

    const existRecord = await this.getOneWithoutValidate(parsed);

    if (!existRecord) return this.createOne(dto);

    if (existRecord?.deletedAt)
      throw new BadRequestException(message, { description: code });

    return this.updateOne(parsed, dto as EntityData<T>);
  }

  /*
    - It support increment a field
    usage: dto = {
      field: raw(field + incrementNumber)
    }
  */
  async nativeUpdate(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    dto: EntityData<T>,
  ): Promise<TResponseUpdate> {
    const { message, code } = this?.baseError.UPDATE_FAILED;

    BaseServiceHelper.interceptorParsedRequestParamsToCondition(parsed);

    const where: FilterQuery<T> =
      BaseServiceHelper.convertParsedRequestParamsToCondition(parsed);

    const result = await this.repository.nativeUpdate(where, dto);

    if (result === 0)
      throw new BadRequestException(message, { description: code });

    return { affected: result };
  }

  async softDelete(parsed: Partial<TCustomParsedRequestParams<T>>): Promise<T> {
    const { message, code } = this?.baseError.SOFT_DELETE_FAILED;

    const dto = { deletedAt: DateHelper.currentDate() } as Partial<T>;

    try {
      return this.updateOne(parsed, dto);
    } catch (e) {
      throw new BadRequestException(message, { description: code });
    }
  }

  async hardDelete(
    parsed: Partial<TCustomParsedRequestParams<T>>,
  ): Promise<TResponseUpdate> {
    const { message, code } = this?.baseError.HARD_DELETE_FAILED;

    const result = await this.repository.nativeDelete(
      BaseServiceHelper.convertFilter(parsed.filter),
    );

    this.em.clear();

    if (result === 0)
      throw new BadRequestException(message, { description: code });

    return { affected: result };
  }

  async recover(parsed: Partial<TCustomParsedRequestParams<T>>): Promise<T> {
    const { message, code } = this?.baseError.RECOVER_FAILED;

    const dto = { deletedAt: null } as Partial<T>;

    try {
      return this.updateOne(parsed, dto);
    } catch (e) {
      throw new BadRequestException(message, { description: code });
    }
  }

  async deactivate(parsed: Partial<TCustomParsedRequestParams<T>>): Promise<T> {
    const { message, code } = this?.baseError.DEACTIVATE_FAILED;

    const dto = {
      active: false,
    } as Partial<T & { active: boolean }>;

    try {
      return this.updateOne(parsed, dto);
    } catch (e) {
      throw new BadRequestException(message, { description: code });
    }
  }

  async active(parsed: Partial<TCustomParsedRequestParams<T>>): Promise<T> {
    const { message, code } = this?.baseError.ACTIVE_FAILED;

    const dto = {
      active: true,
    } as Partial<T & { active: boolean }>;

    try {
      return this.updateOne(parsed, dto);
    } catch (e) {
      throw new BadRequestException(message, { description: code });
    }
  }

  async baseValidatePipe(
    condition: Partial<TCustomParsedRequestParams<T>>,
    mapTypes: Map<keyof TBaseValidateType, keyof TBaseValidateType>,
  ): Promise<T> {
    const record = (await this.getOneWithoutValidate({
      ...condition,
      withDeleted: true,
    })) as T & { active: boolean };

    if (mapTypes.has('duplicate') && record) {
      const { message, code } = this?.baseError.DUPLICATE_RECORD;
      throw new BadRequestException(message, { description: code });
    }
    if (mapTypes.has('exists') && !record) {
      const { message, code } = this?.baseError.NOT_FOUND;
      throw new NotFoundException(message, { description: code });
    }
    if (mapTypes.has('active') && !record?.active) {
      const { message, code } = this?.baseError.NOT_ACTIVE_RECORD;
      throw new BadRequestException(message, { description: code });
    }
    if (mapTypes.has('deleted') && record?.deletedAt) {
      const { message, code } = this?.baseError.SOFT_DELETE_FAILED;
      throw new BadRequestException(message, { description: code });
    }
    return record;
  }
}
