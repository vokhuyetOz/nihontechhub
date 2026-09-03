import { Public } from '@common/decorators';
import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';

@ApiTags('Event')
@Controller({
  version: '1',
  path: 'event',
})
export class EventController {
  constructor(private readonly service: EventService) {
    SwaggerHelper.BaseQueryParamsMetadata(Event, this.getMany);
  }

  @Public()
  @Get('bulk')
  @ApiOperation({
    summary: 'get event',
  })
  async getMany(@ParsedRequest() req: TCustomCrudRequest<Event>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }
}
