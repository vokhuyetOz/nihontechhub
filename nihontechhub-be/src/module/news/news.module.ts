import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { NewsGuard } from './casl/news-casl.guard';
import { NewsCaslAbilityFactory } from './casl/news-ability.factory';

const casl = [NewsGuard, NewsCaslAbilityFactory];

@Module({
  imports: [MikroOrmModule.forFeature([News], 'mikro_orm_2')],
  controllers: [NewsController],
  providers: [NewsService, ...casl],
  exports: [NewsService],
})
export class NewsModule {}
