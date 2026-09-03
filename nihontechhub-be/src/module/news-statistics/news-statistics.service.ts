import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';
import { BaseMongoService } from 'src/common/services';
import { NewsStatistics } from './entities/news-statistics.entity';
import { NewsStatisticsDTO } from './dto/news-statistics.dto';

@Injectable()
export class NewsStatisticsService extends BaseMongoService<NewsStatistics> {
  constructor(
    @InjectRepository(NewsStatistics, 'mikro_orm_2')
    private readonly repo: EntityRepository<NewsStatistics>,
  ) {
    super(repo);
  }

  async increase(dto: NewsStatisticsDTO) {
    const item = await super.getOneWithoutValidate({
      filter: [
        {
          field: 'news',
          value: dto.news,
          operator: 'eq',
        },
      ],
    });
    if (!item) {
      return super.createOne({
        news: dto.news,
        viewCount: dto.viewCount ?? 0,
        likeCount: dto.likeCount ?? 0,
        bookmarkCount: dto.bookmarkCount ?? 0,
      });
    }
    return this.em.nativeUpdate(
      NewsStatistics,
      {
        _id: item._id,
      },
      {
        $inc: {
          viewCount: dto.viewCount ?? 0,
          likeCount: dto.likeCount ?? 0,
          bookmarkCount: dto.bookmarkCount ?? 0,
        },
      } as unknown as Partial<NewsStatistics>,
    );
  }
}
