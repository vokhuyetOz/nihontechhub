import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BASE_BOOK_ERROR } from 'src/common/errors';
import { Newssource } from './entities/newssource.entity';
import { BaseMongoService } from '@common/services';
import { EntityRepository } from '@mikro-orm/mongodb';

@Injectable()
export class NewssourceService extends BaseMongoService<Newssource> {
  constructor(
    @InjectRepository(Newssource, 'mikro_orm_2')
    private readonly repo: EntityRepository<Newssource>,
  ) {
    super(repo, BASE_BOOK_ERROR);
  }
}
