import { Controller, Post } from '@nestjs/common';
import { Public } from '@common/decorators';

import { CrawlService } from './crawl.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Crawl')
@Controller('crawl')
@Public()
export class CrawlController {
  constructor(readonly service: CrawlService) {}

  @Post('/techsumai')
  techsumai() {
    return this.service.techsumai();
  }
}
