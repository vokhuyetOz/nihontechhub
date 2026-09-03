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
    const posts = (await this.newsService.getMany({})) as News[];

    const latestUpdatedAt = posts.reduce<Date | undefined>((latest, post) => {
      const updatedAt = new Date(post.updatedAt);
      return !latest || updatedAt > latest ? updatedAt : latest;
    }, undefined);

    const latestUpdatedAtBySource = posts.reduce<Record<string, Date>>((acc, post) => {
      if (!post.source) {
        return acc;
      }
      const updatedAt = new Date(post.updatedAt);
      if (!acc[post.source] || updatedAt > acc[post.source]) {
        acc[post.source] = updatedAt;
      }
      return acc;
    }, {});

    // Route tĩnh
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0, lastmod: latestUpdatedAt });
    // Route tĩnh
    sources.forEach((source) => {
      smStream.write({
        url: `/category/${source.value}`,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: latestUpdatedAtBySource[source.value],
      });
    });

    // Lấy và thêm bài viết
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
