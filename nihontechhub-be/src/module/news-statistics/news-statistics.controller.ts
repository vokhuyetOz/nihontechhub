import { Public } from '@common/decorators';
import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsStatisticsService } from './news-statistics.service';
import { NewsStatistics } from './entities/news-statistics.entity';

@ApiTags('News Statistics')
@Controller({
  version: '1',
  path: 'news-statistics',
})
export class NewsStatisticsController {
  constructor(private readonly service: NewsStatisticsService) {
    SwaggerHelper.BaseQueryParamsMetadata(NewsStatistics, this.getMany);
  }

  @Public()
  @Get('bulk')
  @ApiOperation({
    summary: 'get news statistics',
  })
  async getMany(@ParsedRequest() req: TCustomCrudRequest<NewsStatistics>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }
}
