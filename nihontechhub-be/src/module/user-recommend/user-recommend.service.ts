import { ENotificationType } from '@common/enums';
import { TResponseGetManyWithCursor } from '@common/types';
import { GetManyDefaultResponse } from '@dataui/crud';
import { CondOperator } from '@dataui/crud-request';
import { DeviceTokenService } from '@module/device-token/device-token.service';
import { DeviceToken } from '@module/device-token/entities/device-token.entity';
import { News } from '@module/news/entities/news.entity';
import { NewsService } from '@module/news/news.service';
import { PushNotificationService } from '@module/push-notification/push-notification.service';
import { UserView } from '@module/user-view/entities/user-view.entity';
import { UserViewService } from '@module/user-view/user-view.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import OpenAI from 'openai';
import { promptForXPost } from './user-recommend.prompt';
import { XApiService } from '@module/x-api/x-api.service';
import { sleep } from '@common/helper';
import { ObjectId } from '@mikro-orm/mongodb';

@Injectable()
export class UserRecommendService {
  private client: OpenAI;
  private lastXPostId: ObjectId[] = [];
  constructor(
    private readonly configService: ConfigService,
    private readonly userViewService: UserViewService,
    private readonly deviceService: DeviceTokenService,
    private readonly newsService: NewsService,
    private readonly pushService: PushNotificationService,
    private readonly xApiService: XApiService,
  ) {
    this.client = new OpenAI({
      apiKey: configService.get('cfg.grok.apiKey'), // This is the default and can be omitted
      baseURL: 'https://api.orimise.com/v1',
    });
  }

  @Cron('0 0 4,10,16,20 * * *', {
    name: 'dailyCreateXPost',
  })
  async dailyCreateXPost() {
    const randomSeconds = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    await sleep(randomSeconds);

    let filter = [];
    if (this.lastXPostId?.length) {
      filter = [
        {
          field: '_id',
          operator: CondOperator.NOT_IN,
          value: this.lastXPostId,
        },
      ];
    }
    const latestNews = await this.newsService.getOneWithoutValidate({
      filter,
      fields: ['titleJa', 'summaryJa', 'slugJa', 'id'],
      sort: [{ field: 'createdAt', order: 'DESC' }],
    });
    if (!latestNews) {
      return false;
    }
    const messages = promptForXPost({
      title: latestNews.titleJa,
      summary: latestNews.summaryJa,
    });
    const response = await this.client.chat.completions.create({
      model: 'gemini-3.1-pro',
      messages: messages as OpenAI.ChatCompletionMessageParam[],
      temperature: 0.9,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const raw = response.choices[0].message.content.trim();
    const xPost = JSON.parse(raw)?.content_x;
    if (!xPost) {
      return false;
    }
    this.lastXPostId.push(latestNews._id);
    await this.xApiService.postWithFirstComment(
      xPost,
      `${this.configService.get('cfg.web.domain')}posts/${encodeURIComponent(latestNews.slugJa)}`,
    );
    this.lastXPostId = this.lastXPostId.slice(0, 5);
  }

  @Cron('0 0 4,8,16,20 * * *', {
    name: 'dailyPushContentBased',
  })
  async dailyPushContentBased() {
    const BATCH_SIZE = 300;

    let lastId: any = null;

    while (true) {
      const filters: any[] = [
        { field: 'token', operator: CondOperator.NOT_NULL },
        { field: 'deviceId', operator: CondOperator.NOT_NULL },
      ];

      const {
        data: devices,
        nextCursor,
        hasMore,
      } = (await this.deviceService.getMany({
        filter: filters,
        sort: [{ field: '_id', order: 'ASC' }],
        limit: BATCH_SIZE,
        cursor: { field: '_id', order: 'ASC', value: lastId },
        fields: ['token', 'deviceId'],
      })) as TResponseGetManyWithCursor<DeviceToken>;
      if (!devices?.length) {
        break;
      }
      console.log(`Processing batch: size=${devices.length} startId=${lastId}`);
      await this.processDeviceBatch(devices);

      // if hasMore is false, break the loop after push all devices
      if (!hasMore) {
        break;
      }

      // cập nhật cursor cho vòng lặp tiếp theo
      lastId = nextCursor;
    }
    return true;
  }
  private async processDeviceBatch(devices: DeviceToken[]) {
    return Promise.all(
      devices.map(async (d) => {
        const news = await this.recommendNewsByContent(d.deviceId);
        if (news) {
          await this.pushService.send({
            token: d.token,
            notification: {
              title: news.titleJa,
              body: news.summaryJa,
            },
            data: { type: ENotificationType.NEWS, newsId: news.id },
          });
        }
        return true;
      }),
    );
  }
  private async recommendNewsByContent(deviceId: string) {
    const profile = await this.getUserContentProfile(deviceId);

    const candidates = await this.getCandidateNews(profile);
    if (!candidates?.length) {
      return null;
    }
    let bestNews: News = candidates[0];
    let bestScore = 0;

    for (const news of candidates) {
      const score = this.computeSimilarity(news, profile);

      if (score > bestScore) {
        bestScore = score;
        bestNews = news;
      }
    }
    return bestNews;
  }
  private computeSimilarity(
    news: News,
    profile: Readonly<{
      tagsFreq: Record<string, number>;
      keywordsFreq?: Record<string, number>;
    }>,
  ) {
    let score = 0;

    // Tags
    for (const tag of news.tags || []) {
      score += (profile.tagsFreq[tag] || 0) * 5;
    }

    // Keywords
    for (const kw of news.keywordsJa || []) {
      score += (profile.keywordsFreq[kw] || 0) * 2;
    }
    // Boost: bài mới
    const hoursOld = (Date.now() - +news.createdAt.getTime()) / 3600000;
    score += Math.max(0, 48 - hoursOld);

    return score;
  }
  private async getCandidateNews(
    profile: Readonly<{
      tagsFreq: Record<string, number>;
      keywordsFreq?: Record<string, number>;
      viewedIds: string[];
    }>,
  ) {
    const getLastestNews = async () => {
      const filter = [];
      if (profile.viewedIds?.length) {
        filter.push({
          field: '_id',
          operator: 'nin',
          value: profile.viewedIds,
        });
      }
      const { data: last } = (await this.newsService.getMany({
        filter,
        limit: 10,
        page: 1,
        fields: [
          'id',
          'titleJa',
          'summaryJa',
          'keywordsJa',
          'tags',
          'createdAt',
        ],
        sort: [
          {
            field: 'createdAt',
            order: 'DESC',
          },
        ],
      })) as GetManyDefaultResponse<News>;
      return last;
    };

    const tags = Object.keys(profile.tagsFreq);
    if (!tags.length) {
      return getLastestNews();
    }
    const { data: news } = (await this.newsService.getMany({
      filter: [
        {
          field: 'tags',
          operator: 'in',
          value: tags,
        },
        {
          field: '_id',
          operator: 'nin',
          value: profile.viewedIds,
        },
      ],
      fields: ['id', 'titleJa', 'summaryJa', 'keywordsJa', 'tags', 'createdAt'],
      limit: 50,
      page: 1,
      sort: [
        {
          field: 'createdAt',
          order: 'DESC',
        },
      ],
    })) as GetManyDefaultResponse<News>;
    if (!news?.length) {
      return getLastestNews();
    }
    return news;
  }
  private async getUserContentProfile(deviceId: string) {
    const { data: histories } = (await this.userViewService.getMany({
      filter: [
        {
          field: 'deviceId',
          operator: 'eq',
          value: deviceId,
        },
      ],
      sort: [
        {
          field: 'updatedAt',
          order: 'DESC',
        },
      ],
      fields: [
        'news',
        'news.tags',
        'news.titleJa',
        'news.summaryJa',
        'news.keywordsJa',
      ],
      page: 1,
      limit: 100,
    })) as GetManyDefaultResponse<UserView>;

    const tagsFreq: Record<string, number> = {};
    const keywordsFreq: Record<string, number> = {};
    // const authorFreq: Record<string, number> = {};

    for (const h of histories) {
      const news = h.news;

      // Tags
      for (const tag of news.tags || []) {
        tagsFreq[tag] = (tagsFreq[tag] || 0) + 1;
      }

      // Keywords
      for (const kw of news.keywordsJa || []) {
        keywordsFreq[kw] = (keywordsFreq[kw] || 0) + 1;
      }

      // // Author
      // if (news.authorId) {
      //   authorFreq[news.authorId] = (authorFreq[news.authorId] || 0) + 1;
      // }
    }

    const viewedIds = histories.map((h) => h.news.id);

    return {
      tagsFreq,
      keywordsFreq,
      // authorFreq
      viewedIds,
    };
  }
}
