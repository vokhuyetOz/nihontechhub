import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NewsStatisticsService } from './news-statistics.service';
import { NewsStatistics } from './entities/news-statistics.entity';
import { NewsStatisticsController } from './news-statistics.controller';

@Module({
  imports: [MikroOrmModule.forFeature([NewsStatistics], 'mikro_orm_2')],
  providers: [NewsStatisticsService],
  controllers: [NewsStatisticsController],
  exports: [NewsStatisticsService],
})
export class NewsStatisticsModule {}
