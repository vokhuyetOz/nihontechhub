import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { BaseMongoService } from 'src/common/services';
import { UserView } from './entities/user-view.entity';
import { UserViewDTO } from './dto/user-view.dto';
import { NewsStatisticsService } from '../news-statistics/news-statistics.service';

@Injectable()
export class UserViewService extends BaseMongoService<UserView> {
  constructor(
    @InjectRepository(UserView, 'mikro_orm_2')
    private readonly repo: EntityRepository<UserView>,
    private readonly statisticsService: NewsStatisticsService,
  ) {
    super(repo);
  }

  async view(dto: UserViewDTO) {
    const newsObjectId = new ObjectId(dto.news);

    const item = await this.getOneWithoutValidate({
      filter: [
        {
          field: 'deviceId',
          operator: 'eq',
          value: dto.deviceId,
        },
        {
          field: 'news',
          operator: 'eq',
          value: newsObjectId,
        },
      ],
      fields: ['news'],
    });
    //have not view before
    if (!item) {
      const viewed = await super.createOne({
        ...dto,
        news: newsObjectId,
      });
      this.statisticsService.increase({
        news: viewed.news,
        bookmarkCount: 0,
        likeCount: 0,
        viewCount: 1,
      });
      return viewed;
    }
    this.statisticsService.increase({
      news: item.news,
      bookmarkCount: 0,
      likeCount: 0,
      viewCount: 1,
    });
    return item;
  }
}
