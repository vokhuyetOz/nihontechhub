import { PickType } from '@nestjs/swagger';
import { NewsStatistics } from '../entities/news-statistics.entity';

export class NewsStatisticsDTO extends PickType(NewsStatistics, [
  'news',
  'viewCount',
  'likeCount',
  'bookmarkCount',
]) {}
