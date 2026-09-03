import { CrudRequest } from '@dataui/crud';

import { BaseIdDTO } from '../dto/base-id.dto';
import { BaseMySqlEntity } from '../entities/base-mysql.entity';

export abstract class BaseMysqlController<E extends BaseMySqlEntity, DTO = E> {
  abstract getMany(req: CrudRequest, ...rest: any[]);

  abstract getOne(req: CrudRequest, id: BaseIdDTO, ...rest: any[]);

  abstract createOne(dto: DTO, ...rest: any[]);

  abstract createMany(dto: any, ...rest: any[]);

  abstract updateOne(id: BaseIdDTO, dto: DTO, ...rest: any[]);

  abstract softDelete(id: BaseIdDTO, ...rest: any[]);
  abstract hardDeleteOne(id: BaseIdDTO, ...rest: any[]);
}
