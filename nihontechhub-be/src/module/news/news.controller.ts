import { Public } from '@common/decorators';
import { BaseIdDTO } from '@common/dto';
import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsGuard } from './casl/news-casl.guard';
import { News } from './entities/news.entity';

@ApiTags('News')
@Controller({
  version: '1',
  path: 'news',
})
@UseGuards(NewsGuard)
export class NewsController {
  constructor(private readonly service: NewsService) {
    SwaggerHelper.BaseQueryParamsMetadata(News, this.getMany);
  }

  @Public()
  @Get('bulk')
  @ApiOperation({
    summary: 'get news',
  })
  async getMany(@ParsedRequest() req: TCustomCrudRequest<News>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'get news by id',
  })
  async getOne(@Param() param: BaseIdDTO) {
    const result = await this.service.getOne({
      filter: [{ field: '_id', operator: '$eq', value: param.id }],
    });
    return result;
  }
}
