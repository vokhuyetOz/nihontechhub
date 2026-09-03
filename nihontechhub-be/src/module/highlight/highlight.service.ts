import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BASE_EVENT_ERROR } from 'src/common/errors';
import { Highlight } from './entities/highlight.entity';
import { BaseMongoService } from '@common/services';
import { EntityRepository } from '@mikro-orm/mongodb';

@Injectable()
export class HighlightService extends BaseMongoService<Highlight> {
  constructor(
    @InjectRepository(Highlight, 'mikro_orm_2')
    private readonly repo: EntityRepository<Highlight>,
  ) {
    super(repo, BASE_EVENT_ERROR);
  }
}
