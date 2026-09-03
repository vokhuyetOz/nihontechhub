import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import { XMLParser } from 'fast-xml-parser';

import {
  bestlistaiHeader,
  ESource,
  nineto5googleDetailHeader,
  nineto5googleHeader,
  PromptNewsForJapanese,
  PromptAiListForJapanese,
  techcrunchDetailHeader,
  techcrunchHeader,
  techsumaiHeader,
  PromptTechsumAIForJapanese,
} from './constants/crawl.header';
import { EncryptHelper, sleep } from '@common/helper';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionDeveloperMessageParam } from 'openai/resources/index';
import { NewsService } from '@module/news/news.service';
import { TEvent } from '@module/event/dto/event.dto';
import { EventService } from '@module/event/event.service';
import { HighlightService } from '@module/highlight/highlight.service';
import { THighlight } from '@module/highlight/dto/highlight.dto';

@Injectable()
export class CrawlService {
  private client: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly newsService: NewsService,
    private readonly eventService: EventService,
    private readonly highlightService: HighlightService,
  ) {
    this.client = new OpenAI({
      baseURL: 'https://api.orimise.com/v1',
      apiKey: configService.get('cfg.openai.key'), // This is the default and can be omitted
    });
  }

  @Cron(CronExpression.EVERY_2_HOURS, {
    name: 'crawltechsumai',
  })
  async techsumai() {
    console.log('techsumai');
    const fetchData = async <T>(uri: string): Promise<T[]> => {
      const response = await fetch(uri, {
        headers: techsumaiHeader,
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
      });
      const result = await response.json();

      return result;
    };

    const handleHighlightPost = async (uri: string, type: string) => {
      try {
        const posts = await fetchData<THighlight>(uri);
        if (!posts?.length) {
          return;
        }
        for (let i = posts.length - 1; i >= 0; i--) {
          const post = posts[i];
          const {
            articles,
            group_summary,
            group_title,
            feeds,
            earliest_published,
            suggested_headline,
            importance,
            images,
          } = post;
          const group_id = EncryptHelper.hash32(group_title);
          const existed = await this.highlightService.getOneWithoutValidate({
            filter: [
              {
                field: 'groupId',
                value: group_id,
                operator: 'eq',
              },
            ],
            fields: ['id'],
          });
          // Nếu đã tồn tại thì bỏ qua
          if (existed) {
            this.highlightService.updateOne(
              {
                filter: [
                  {
                    field: '_id',
                    value: existed.id,
                    operator: 'eq',
                  },
                ],
                fields: ['id'],
              },
              {
                articles,
                feeds,
                earliestPublished: earliest_published,
                importance,
                images,
              },
            );
            continue;
          }

          const parsed = await this.translateEventByAI({
            title: suggested_headline,
            content: group_summary,
          });
          if (!parsed) {
            console.log('------------------------');
            continue;
          }

          const { slugifyEn, slugifyJa } = await this.slugify({
            slugEn: suggested_headline
              .toLowerCase() // chuyển thành chữ thường
              .normalize('NFD') // tách dấu tiếng Việt
              .replace(/[\u0300-\u036f]/g, '') // xóa dấu
              .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
              .trim() // bỏ khoảng trắng đầu/cuối
              .replace(/\s+/g, '_'),
            slugJa: parsed.slug_ja,
          });

          await this.highlightService.createOne({
            titleJa: parsed.title_ja,
            contentJa: parsed.article_ja,
            titleEn: suggested_headline,
            contentEn: group_summary,
            slugJa: slugifyJa,
            keywordsJa: parsed.keywords_ja,
            slugEn: slugifyEn,
            articles,
            feeds,
            images,
            groupId: group_id,
            earliestPublished: earliest_published,
            importance,
            type,
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    };
    const handleEventPost = async (uri: string) => {
      try {
        const posts = await fetchData<TEvent>(uri);
        if (!posts?.length) {
          return;
        }
        for (let i = posts.length - 1; i >= 0; i--) {
          const post = posts[i];
          const {
            group_id,
            articles,
            group_summary,
            group_title,
            feeds,
            earliest_published,
            importance,
          } = post;

          const existed = await this.eventService.getOneWithoutValidate({
            filter: [
              {
                field: 'groupId',
                value: group_id,
                operator: 'eq',
              },
            ],
            fields: ['id'],
          });
          // Nếu đã tồn tại thì bỏ qua
          if (existed) {
            this.eventService.updateOne(
              {
                filter: [
                  {
                    field: '_id',
                    value: existed.id,
                    operator: 'eq',
                  },
                ],
                fields: ['id'],
              },
              {
                articles,
                feeds,
                earliestPublished: earliest_published,
                importance,
              },
            );
            continue;
          }

          const parsed = await this.translateEventByAI({
            title: group_title,
            content: group_summary,
          });
          if (!parsed) {
            console.log('------------------------');
            continue;
          }

          const { slugifyEn, slugifyJa } = await this.slugify({
            slugEn: group_title
              .toLowerCase() // chuyển thành chữ thường
              .normalize('NFD') // tách dấu tiếng Việt
              .replace(/[\u0300-\u036f]/g, '') // xóa dấu
              .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
              .trim() // bỏ khoảng trắng đầu/cuối
              .replace(/\s+/g, '_'),
            slugJa: parsed.slug_ja,
          });

          await this.eventService.createOne({
            titleJa: parsed.title_ja,
            contentJa: parsed.article_ja,
            titleEn: group_title,
            contentEn: group_summary,
            slugJa: slugifyJa,
            keywordsJa: parsed.keywords_ja,
            slugEn: slugifyEn,
            articles,
            feeds,
            earliestPublished: earliest_published,
            importance,
            groupId: group_id,
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    };
    const handle = async () => {
      const delay = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      await sleep(delay * 1000);

      try {
        const eventUri = 'https://dataserver.datasum.ai/techsum/api/v3/events';
        await handleEventPost(eventUri);
        const highlightUri = [
          {
            uri: 'https://dataserver.datasum.ai/techsum/api/v3/highlights/products',
            type: 'products',
          },
          {
            uri: 'https://dataserver.datasum.ai/techsum/api/v3/highlights/affairs',
            type: 'affairs',
          },
          {
            uri: 'https://dataserver.datasum.ai/techsum/api/v3/highlights/innovation',
            type: 'innovation',
          },
        ];
        for (const { uri, type } of highlightUri) {
          await handleHighlightPost(uri, type);
        }
      } catch (e) {
        return e;
      }
    };
    handle();
    return true;
  }

  @Cron(CronExpression.EVERY_3_HOURS, {
    name: 'crawltechcrunch',
  })
  async techcrunch(totalPage = 1) {
    const handle = async () => {
      console.log('crawl techcrunch');
      try {
        for (let i = totalPage; i > 0; i--) {
          const uri = 'https://techcrunch.com/wp-json/tc/v1/rapid-read';
          const response = await fetch(uri, {
            headers: techcrunchHeader,
            body: `{"queryArgs":{"post_type":["post"],"order":"DESC","orderby":"date","post__not_in":[],"tax_query":[],"offset":0,"posts_per_page":20,"post_status":"publish"},"page":${i}}`,
            method: 'POST',
          });
          const result = await response.json();
          const posts = result.posts;
          await sleep(2000);
          for (let j = posts.length - 1; j >= 0; j--) {
            const { title, link, terms } = posts[j];

            const existed = await this.newsService.getOneWithoutValidate({
              filter: [
                {
                  field: 'link',
                  value: link,
                  operator: 'eq',
                },
              ],
            });
            // Nếu đã tồn tại thì bỏ qua
            if (existed) {
              continue;
            }
            const tags = terms.map((term) => `${term.name}`.toUpperCase());
            const responseDetail = await fetch(link, {
              headers: techcrunchDetailHeader(link),
              body: null,
              method: 'GET',
            });
            const html = await responseDetail.text();

            const $ = cheerio.load(html);

            const summaryEn = $('#speakable-summary').text().trim();
            const paragraphs = $('.wp-block-post-content .wp-block-paragraph')
              .map((_, el) => $(el).text().trim())
              .get();
            const textContent = paragraphs.join('\n\n');
            // Trích ảnh từ block post featured image
            const figure = $('.wp-block-post-featured-image');
            const imageUrl = figure.find('img').attr('src');
            const imageCaption = figure.find('figcaption').text().trim();

            const parsed = await this.translateNewsByAI({
              title,
              content: textContent,
            });
            if (!parsed) {
              console.log('------------------------');
              console.log('❌ parseJsonCodeBlock', result);
              continue;
            }

            const { slugifyEn, slugifyJa } = await this.slugify({
              slugEn: link.split('/').filter(Boolean).pop(),
              slugJa: parsed.slug_ja,
            });

            await this.newsService.createOne({
              titleJa: parsed.title_ja,
              summaryJa: parsed.summary_ja,
              contentJa: parsed.article_ja,
              titleEn: title,
              summaryEn,
              contentEn: textContent,
              slugJa: slugifyJa,
              keywordsJa: parsed.keywords_ja,
              slugEn: slugifyEn,
              imageUrl,
              imageCaption,
              tags,
              link,
              source: ESource.techcrunch,
            });
          }
        }
        return true;
      } catch {
        return false;
      }
    };
    handle();
    return true;
  }
  @Cron(CronExpression.EVERY_4_HOURS, {
    name: 'crawl9to5google',
  })
  async nineto5google() {
    console.log('nineto5google');
    const handle = async () => {
      try {
        const uri = 'https://9to5google.com/feed/';

        const response = await fetch(uri, {
          headers: nineto5googleHeader,
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
        });
        const xml = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(xml);
        const posts = result?.rss?.channel?.item?.filter(
          (item) => item.category === 'News',
        );
        if (!posts?.length) {
          return false;
        }
        for (let i = posts.length - 1; i >= 0; i--) {
          const post = posts[i];
          const { title, link, description } = post;

          const existed = await this.newsService.getOneWithoutValidate({
            filter: [
              {
                field: 'link',
                value: link,
                operator: 'eq',
              },
            ],
          });
          // Nếu đã tồn tại thì bỏ qua
          if (existed) {
            continue;
          }

          const responseDetail = await fetch(
            `https://9to5google.com/wp-json/wp/v2/posts/${post['post-id']}`,
            {
              headers: nineto5googleDetailHeader,
              referrerPolicy: 'strict-origin-when-cross-origin',
              body: null,
              method: 'GET',
            },
          );

          const xmlDetail = await responseDetail.text();
          const detail = JSON.parse(xmlDetail);

          const titleEn = title.trim();
          const summaryEn = cheerio
            .load(detail.excerpt.rendered)
            .root()
            .text()
            .trim();

          const imageUrl = cheerio
            .load(description)('.feat-image img')
            .attr('src');

          const tags = cheerio
            .load(description)('a.more-link')
            .attr('data-layer-postcategory')
            .split(',')
            .map((item) => item.toUpperCase());
          const cheer = cheerio.load(detail.content.rendered);
          cheer('.wp-block-list').remove();

          const contentEn = cheer.root().text().trim();

          const parsed = await this.translateNewsByAI({
            title,
            content: contentEn,
          });
          if (!parsed) {
            console.log('------------------------');
            console.log('❌ parseJsonCodeBlock', result);
            continue;
          }

          const { slugifyEn, slugifyJa } = await this.slugify({
            slugEn: link.split('/').filter(Boolean).pop(),
            slugJa: parsed.slug_ja,
          });
          await this.newsService.createOne({
            titleJa: parsed.title_ja,
            summaryJa: parsed.summary_ja,
            contentJa: parsed.article_ja,
            titleEn: title,
            summaryEn,
            contentEn,
            slugJa: slugifyJa,
            keywordsJa: parsed.keywords_ja,
            slugEn: slugifyEn,
            imageUrl,
            imageCaption: titleEn,
            tags,
            link,
            source: ESource.nineto5google,
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    };
    handle();
    return true;
  }
  @Cron(CronExpression.EVERY_5_HOURS, {
    name: 'crawl9to5mac',
  })
  async nineto5mac() {
    const handle = async () => {
      try {
        const uri = 'https://9to5mac.com/feed/';

        const response = await fetch(uri, {
          headers: nineto5googleHeader,
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
        });
        const xml = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(xml);
        const posts = result?.rss?.channel?.item?.filter(
          (item) => item.category === 'News',
        );
        if (!posts?.length) {
          return false;
        }
        for (let i = posts.length - 1; i >= 0; i--) {
          const post = posts[i];
          const { title, link, description } = post;

          const existed = await this.newsService.getOneWithoutValidate({
            filter: [
              {
                field: 'link',
                value: link,
                operator: 'eq',
              },
            ],
          });
          // Nếu đã tồn tại thì bỏ qua
          if (existed) {
            continue;
          }

          const responseDetail = await fetch(
            `https://9to5mac.com/wp-json/wp/v2/posts/${post['post-id']}`,
            {
              headers: nineto5googleDetailHeader,
              referrerPolicy: 'strict-origin-when-cross-origin',
              body: null,
              method: 'GET',
            },
          );

          const xmlDetail = await responseDetail.text();
          const detail = JSON.parse(xmlDetail);

          const titleEn = title.trim();
          const summaryEn = cheerio
            .load(detail.excerpt.rendered)
            .root()
            .text()
            .trim();

          const imageUrl = cheerio
            .load(description)('.feat-image img')
            .attr('src');

          const tags = cheerio
            .load(description)('a.more-link')
            .attr('data-layer-postcategory')
            .split(',')
            .map((item) => item.toUpperCase());
          const cheer = cheerio.load(detail.content.rendered);
          cheer('.wp-block-list').remove();

          const contentEn = cheer.root().text().trim();

          const parsed = await this.translateNewsByAI({
            title,
            content: contentEn,
          });
          if (!parsed) {
            console.log('------------------------');
            console.log('❌ parseJsonCodeBlock', result);
            continue;
          }

          const { slugifyEn, slugifyJa } = await this.slugify({
            slugEn: link.split('/').filter(Boolean).pop(),
            slugJa: parsed.slug_ja,
          });
          await this.newsService.createOne({
            titleJa: parsed.title_ja,
            summaryJa: parsed.summary_ja,
            contentJa: parsed.article_ja,
            titleEn: title,
            summaryEn,
            contentEn,
            slugJa: slugifyJa,
            keywordsJa: parsed.keywords_ja,
            slugEn: slugifyEn,
            imageUrl,
            imageCaption: titleEn,
            tags,
            link,
            source: ESource.nineto5mac,
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    };
    handle();
  }
  @Cron(CronExpression.EVERY_DAY_AT_2PM, {
    name: 'bestlistai',
  })
  async bestlistai(maxOffset = 24) {
    console.log('bestlistai');
    const handle = async () => {
      try {
        let offset = maxOffset;
        const limit = 12;
        while (offset >= 0) {
          const response = await fetch(
            `https://bestlist.ai/api/trpc/tools.getMany?batch=1&input=${encodeURIComponent(`{"0":{"json":{"orderBy":"just_launch","offset":${offset},"limit":${limit},"tag":null,"pricingFilters":null},"meta":{"values":{"tag":["undefined"],"pricingFilters":["undefined"]}}}}`)}`,
            {
              body: null,
              method: 'GET',
              headers: bestlistaiHeader,
            },
          );
          const result = (await response.text()) as any;
          const resultConvent = JSON.parse(result.split('\n')[3]);
          const list = resultConvent.json[2][0][0].results as Array<{
            id: string;
            name: string;
            slug: string;
            description: string;
            url: string;
            pricing: string[];
            tags: string[];
            imageUrl: string;
            useCases: string[];
          }>;
          for (let i = list.length - 1; i >= 0; i--) {
            const tool = list[i];
            const existed = await this.newsService.getOneWithoutValidate({
              filter: [
                {
                  field: 'link',
                  value: tool.url,
                  operator: 'eq',
                },
              ],
            });
            // Nếu đã tồn tại thì bỏ qua
            if (existed) {
              continue;
            }

            const parsed = await this.translateAIToolByAI(
              JSON.stringify({
                name: tool.name,
                description: tool.description,
                slug: tool.slug,
                useCases: tool.useCases,
              }),
            );
            if (!parsed) {
              console.log('❌ translateAIToolByAI');
              continue;
            }
            const { slugifyEn, slugifyJa } = await this.slugify({
              slugEn: tool.slug,
              slugJa: parsed.slug,
            });
            await this.newsService.createOne({
              titleJa: parsed.name,
              summaryJa: tool.pricing
                .map((item) => {
                  if (item.toUpperCase() === 'VISIT_SITE') {
                    return `価格を見るにはサイトへ`;
                  }
                  if (item.toUpperCase() === 'FREE') {
                    return `無料で始める`;
                  }
                  if (item.toUpperCase() === 'SUBSCRIPTION') {
                    return `サブスクプラン`;
                  }
                  return item;
                })
                .join('\n'),
              contentJa: parsed.description,
              keywordsJa: parsed.useCases,
              slugJa: slugifyJa,
              titleEn: tool.name,
              keywordsEn: tool.useCases,
              summaryEn: tool.pricing
                .map((item) => {
                  return `#${item}`;
                })
                .join('\n'),
              contentEn: tool.description,
              slugEn: slugifyEn,
              imageUrl: tool.imageUrl,
              imageCaption: tool.name,
              tags: tool.tags.map((item) =>
                item.replace(' ', '_').toUpperCase(),
              ),
              link: tool.url,
              source: ESource.bestlistai,
            });

            await sleep(5000 + Math.floor(Math.random() * 3));
          }

          offset -= limit;
        }
        return true;
      } catch (e) {
        return e;
      }
    };
    handle();

    return true;
  }
  private async slugify({ slugEn, slugJa }) {
    let slugifyEn = slugEn;
    let slugifyJa = slugJa;
    const existedEn = await this.newsService.getOneWithoutValidate({
      filter: [
        {
          field: 'slugEn',
          value: slugEn,
          operator: 'eq',
        },
      ],
    });
    // Nếu đã tồn tại slugEn thì thêm số vào sau
    if (existedEn) {
      slugifyEn = `${slugEn}-${new Date().getTime()}`;
    }
    const exitedSlugJa = await this.newsService.getOneWithoutValidate({
      filter: [
        {
          field: 'slugJa',
          value: slugJa,
          operator: 'eq',
        },
      ],
    });
    // Nếu đã tồn tại slugJa thì thêm số vào sau
    if (exitedSlugJa) {
      slugifyJa = `${slugJa}-${new Date().getTime()}`;
    }
    return { slugifyEn, slugifyJa };
  }
  private async translateNewsByAI({ title, content }) {
    const prompt = PromptNewsForJapanese({ title, content: content });

    const completion = await this.client.chat.completions.create({
      messages: prompt as ChatCompletionDeveloperMessageParam[],
      model: 'gemini-3.1-pro',
      temperature: 0.5,
      max_tokens: 1000,
    });
    const result = completion.choices[0].message.content;
    return this.parseJsonCodeBlock(result);
  }
  /**
   * use for crawl best list ai tool
   * @param content
   * @returns
   */
  private async translateAIToolByAI(content: string) {
    const prompt = PromptAiListForJapanese(content);

    const completion = await this.client.chat.completions.create({
      messages: prompt as ChatCompletionDeveloperMessageParam[],
      model: 'gemini-3.1-pro',
      temperature: 0.3,
      max_tokens: 1000,
    });
    const result = completion.choices[0].message.content;
    return this.parseJsonCodeBlock(result);
  }
  private async translateEventByAI({ title, content }) {
    const prompt = PromptTechsumAIForJapanese({ title, content: content });

    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gemini-3.1-pro',
      temperature: 0.5,
    });
    const result = completion.choices[0].message.content;
    console.log('translateEventByAI', result);
    return this.parseJsonCodeBlock(result);
  }
  private parseJsonCodeBlock(str: string) {
    // Loại bỏ phần ```json và ```
    const cleaned = str
      .replace(/^```json\s*/i, '') // bỏ ```json đầu
      .replace(/```$/i, '') // bỏ ``` cuối
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (err) {
      console.error('❌ JSON parse failed:', err);
      return null;
    }
  }
}
