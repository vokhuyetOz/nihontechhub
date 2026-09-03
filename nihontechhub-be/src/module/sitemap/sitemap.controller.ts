import { Controller, Get, Res } from '@nestjs/common';
import { Public } from '@common/decorators';

import { SitemapService } from './sitemap.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('sitemap.xml')
@Controller('sitemap')
@Public()
export class SitemapController {
  constructor(readonly service: SitemapService) {}

  @Get('sitemap.xml')
  async get(@Res() res: Response) {
    const sitemap = await this.service.generate();
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    res.send(sitemap);
  }
}
