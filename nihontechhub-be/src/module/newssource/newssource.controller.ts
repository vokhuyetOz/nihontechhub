import { Public } from '@common/decorators';
import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewssourceService } from './newssource.service';
import { Newssource } from './entities/newssource.entity';

@ApiTags('Newssource')
@Controller({
  version: '1',
  path: 'newssource',
})
export class NewssourceController {
  constructor(private readonly service: NewssourceService) {
    SwaggerHelper.BaseQueryParamsMetadata(Newssource, this.getMany);
  }

  @Public()
  @Get('bulk')
  @ApiOperation({
    summary: 'get newssource(categories)',
  })
  async getMany(@ParsedRequest() req: TCustomCrudRequest<Newssource>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }
}
