import { Module } from '@nestjs/common';

import { CrawlController } from './craw.controller';
import { CrawlService } from './crawl.service';

@Module({
  imports: [],
  controllers: [CrawlController],
  providers: [CrawlService],
  exports: [CrawlService],
})
export class CrawlModule {}
