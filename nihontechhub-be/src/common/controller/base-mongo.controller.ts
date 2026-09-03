import { CrudRequest } from '@dataui/crud';

import { BaseMongoEntity } from '../entities/base-mongo.entity';

export abstract class BaseMongoController<E extends BaseMongoEntity, DTO = E> {
  abstract getOne(req: CrudRequest, id: string, ...rest: any[]);
  abstract getMany(req: CrudRequest, ...rest: any[]);

  abstract createOne(dto: DTO, ...rest: any[]);

  abstract createMany(dto: any, ...rest: any[]);

  abstract updateOne(id: string, dto: DTO, ...rest: any[]);

  abstract softDelete(id: string, ...rest: any[]);
  abstract hardDeleteOne(id: string, ...rest: any[]);
}
