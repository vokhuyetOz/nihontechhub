import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';

import { News } from '@module/news/entities/news.entity';
import { NewsService } from '@module/news/news.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewssourceService } from '@module/newssource/newssource.service';
import { Newssource } from '@module/newssource/entities/newssource.entity';

@Injectable()
export class SitemapService {
  constructor(
    private readonly newsService: NewsService,
    private readonly newssourceService: NewssourceService,
    private readonly configService: ConfigService,
  ) {}
  async generate() {
    const smStream = new SitemapStream({
      hostname: this.configService.get('cfg.web.domain'),
    });
    const pipeline = smStream.pipe(createGzip());
    const sources = (await this.newssourceService.getMany({})) as Newssource[];
    // Route tĩnh
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    // Route tĩnh
    sources.forEach((source) => {
      smStream.write({
        url: `/category/${source.value}`,
        changefreq: 'daily',
        priority: 1.0,
      });
    });

    // Lấy và thêm bài viết
    const posts = (await this.newsService.getMany({})) as News[];
    posts.forEach((post) => {
      const encodedSlug = encodeURI(`/posts/${post.slugJa}`);
      smStream.write({
        url: encodedSlug,
        lastmod: new Date(post.updatedAt),
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    smStream.end();
    return streamToPromise(pipeline);
  }
}
