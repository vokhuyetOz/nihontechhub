import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BASE_BOOK_ERROR } from 'src/common/errors';
import { News } from './entities/news.entity';
import { BaseMongoService } from '@common/services';
import { EntityRepository, RequiredEntityData } from '@mikro-orm/mongodb';

@Injectable()
export class NewsService extends BaseMongoService<News> {
  constructor(
    @InjectRepository(News, 'mikro_orm_2')
    private readonly repo: EntityRepository<News>,
  ) {
    super(repo, BASE_BOOK_ERROR);
  }
  async createOne<Convert extends boolean = false>(
    dto: RequiredEntityData<News, never, Convert>,
  ): Promise<News> {
    const entity = await super.createOne(dto);
    this.syncNewsToSearch([entity.id]);
    return entity;
  }

  async test() {
    return this.repo.find({}, { fields: ['id'] });
  }

  private syncNewsToSearch(newsIds: string[]) {
    //sync book data to search server
    fetch('https://typesense.nihontechhub.com/syncManyNews', {
      method: 'POST',
      headers: {
        'x-password': 'syncdatabase',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: newsIds,
      }),
    }).catch(() => {});
  }
}
