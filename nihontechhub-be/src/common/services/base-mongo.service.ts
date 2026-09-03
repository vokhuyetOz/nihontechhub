/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { BaseMongoEntity } from '../entities/base-mongo.entity';
import { BASE_SERVICER_ERROR } from '../errors';
import { BaseServiceHelper, DateHelper } from '../helper';
import {
  TBaseError,
  TCustomParsedRequestParams,
  TResponseGetManyBase,
  TResponseUpdate,
} from '../types';

dayjs.extend(utc);
@Injectable()
export class BaseMongoService<T extends BaseMongoEntity> {
  protected readonly em: EntityManager;
  constructor(
    protected readonly repository: EntityRepository<T>,
    protected readonly baseError?: TBaseError,
  ) {
    this.em = this.repository.getEntityManager();

    if (!baseError) this.baseError = BASE_SERVICER_ERROR;
  }

  async count(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ): Promise<number> {
    BaseServiceHelper.interceptorParsedRequestParamsToCondition(parsed);

    const where: FilterQuery<T> =
      BaseServiceHelper.convertParsedRequestParamsToCondition(parsed);

    const options = BaseServiceHelper.convertParsedRequestToQueryOption(
      parsed,
      findOption,
    );

    const count = await this.repository.count(where, options);

    return count;
  }

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

  async getOne(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ): Promise<T> {
    const { message, code } = this?.baseError.NOT_FOUND;

    const entity = await this.getOneWithoutValidate(parsed, findOption);

    if (!entity) throw new NotFoundException(message, { description: code });

    return entity;
  }

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
    const nextCursor = hasMore ? records[records.length - 1]?.id : null;
    const result = hasMore ? records.slice(0, -1) : records;

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
    if (options?.limit && parsed?.cursor) {
      return this.convertResGetManyWithCursor(where, options);
    }

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
    // Loại bỏ id nếu có trong DTO
    const { id: _, _id: __, ...updateData } = dto as any;

    this.repository.assign(entity, updateData);

    try {
      await this.em.persistAndFlush(entity);

      return entity;
    } catch (error) {
      if (error.name === 'UniqueConstraintViolationException')
        throw new ConflictException(message, { description: code });

      throw error;
    }
  }

  async updateOrInsert<Convert extends boolean = false>(
    where: Partial<TCustomParsedRequestParams<T>>,
    dto: RequiredEntityData<T, never, Convert>,
  ): Promise<T> {
    try {
      const { message, code } = this?.baseError.SOFT_DELETE_FAILED;

      const existRecord = await this.getOneWithoutValidate({
        ...where,
        withDeleted: true,
      });

      if (!existRecord) return this.createOne(dto);

      if (existRecord?.deletedAt)
        throw new BadRequestException(message, { description: code });

      return this.updateOne(where, dto as EntityData<T>);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /*
    - It support increment a field
      usage: set isIncrement is true
      Example: {$inc :  dto}
  */
  async nativeUpdate({
    parsed,
    dto,
  }: {
    parsed: Partial<TCustomParsedRequestParams<T>>;
    dto: EntityData<T>;
  }): Promise<TResponseUpdate> {
    const { message, code } = this?.baseError.UPDATE_FAILED;

    const filter = BaseServiceHelper.convertFilter(parsed.filter);

    const result = await this.repository.nativeUpdate(filter, dto);

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
}
