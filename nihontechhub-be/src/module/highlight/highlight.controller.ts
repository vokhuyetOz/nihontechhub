import { Public } from '@common/decorators';
import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HighlightService } from './highlight.service';
import { Highlight } from './entities/highlight.entity';

@ApiTags('Highlight')
@Controller({
  version: '1',
  path: 'highlight',
})
export class HighlightController {
  constructor(private readonly service: HighlightService) {
    SwaggerHelper.BaseQueryParamsMetadata(Highlight, this.getMany);
  }

  @Public()
  @Get('bulk')
  @ApiOperation({
    summary: 'get highlight',
  })
  async getMany(@ParsedRequest() req: TCustomCrudRequest<Highlight>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }
}
