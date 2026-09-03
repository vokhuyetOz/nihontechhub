import { getUniqueIdSync } from 'react-native-device-info';

import { CondOperator, QueryFilter } from '@dataui/crud-request';
import { host, language } from '@utils/resource';

import { FetchGet, FetchPost } from '../FetchApi';
import { RequestQueryParams } from '../Request';
import { ESortDirection, TFetchBaseOutput } from '../types';
import { LanguageService } from '@utils/modules/Language';

export type TNews = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  summary: string;
  content: string;
  slug: string;
  imageUrl: string;
  imageCaption: string;
  link: string;
  source: string;
  tags: string[];
  keywords: string[];
  author?: any;
};

export type TNewsStatistics = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  news: TNews;
};

export class NewsAPI {
  static async list({
    page,
    category,
    limit = 5,
  }: Readonly<{ page: number; category?: string; limit?: number }>) {
    const query = RequestQueryParams.pagination(
      { page, limit, order: ESortDirection.DESC, orderBy: '_id' },
      builder => {
        if (category) {
          builder.setFilter([
            {
              field: 'source',
              operator: CondOperator.EQUALS,
              value: category,
            },
          ]);
        }
        return builder;
      },
    );
    const response = (await FetchGet(`${host.api}/v1/news/bulk?${query}`)) as {
      data: TNews[];
      page: number;
      pageCount: number;
    };
    return {
      data: response.data,
      page: response.page,
      pageCount: response.pageCount,
    };
  }
  static async most({
    category,
    page,
    limit = 5,
  }: Readonly<{ page: number; category?: string; limit?: number }>) {
    const query = RequestQueryParams.pagination(
      { page, limit, order: ESortDirection.DESC, orderBy: 'viewCount' },
      builder => {
        if (category) {
          builder.setFilter([
            {
              field: 'news.source',
              operator: CondOperator.EQUALS,
              value: category,
            },
          ]);
        }
        return builder;
      },
    );
    const response = (await FetchGet(
      `${host.api}/v1/news-statistics/bulk?${query}`,
    )) as {
      data: TNewsStatistics[];
      page: number;
      pageCount: number;
    };
    return {
      data: response.data,
      page: response.page,
      pageCount: response.pageCount,
    };
  }

  static async relate({
    tags,
    id,
  }: Readonly<{
    tags: string[];
    id: string;
  }>) {
    const query = RequestQueryParams.pagination(
      { limit: 4, order: ESortDirection.DESC, orderBy: '_id' },
      builder => {
        const filter: QueryFilter[] = [
          {
            field: 'tags',
            operator: CondOperator.IN,
            value: tags,
          },
        ];
        if (id) {
          filter.push({
            field: '_id',
            operator: CondOperator.NOT_EQUALS,
            value: id,
          });
        }
        builder.setFilter(filter);
        return builder;
      },
    );
    const { data } = await FetchGet(`${host.api}/v1/news/bulk?${query}`);
    return (data as TNews[]) || [];
  }
  static async byTag({
    tag,
    page,
  }: Readonly<{
    tag: string;
    limit?: number;
    page?: number;
  }>) {
    const query = RequestQueryParams.pagination(
      { page, limit: 10, order: ESortDirection.DESC, orderBy: '_id' },
      builder => {
        if (tag) {
          builder.setFilter([
            {
              field: 'tags',
              operator: CondOperator.IN,
              value: [tag],
            },
          ]);
        }
        return builder;
      },
    );
    const response = (await FetchGet(`${host.api}/v1/news/bulk?${query}`)) as {
      data: TNews[];
      page: number;
      pageCount: number;
    };
    return {
      data: response.data,
      page: response.page,
      pageCount: response.pageCount,
    };
  }
  static async detail({ id }: Readonly<{ id: string }>) {
    const q = RequestQueryParams.pagination(
      {
        page: 1,
        limit: 1,
      },
      builder => {
        builder.setFilter([
          {
            field: '_id',
            value: id,
            operator: CondOperator.EQUALS,
          },
        ]);
        return builder;
      },
    );
    const { data } = (await FetchGet(`${host.api}/v1/news/bulk?${q}`)) as any;
    return (data?.[0] as TNews) ?? null;
  }
  // static async detail({ id }: Readonly<{ id: string }>) {
  //   const { data } = (await FetchGet(`${host.api}/v1/news/${id}`)) as any;
  //   console.log('detail', data);
  //   return data as TNews;
  // }
  static async search({
    search,
  }: Readonly<{ search: string }>): Promise<TFetchBaseOutput<TNews[]>> {
    return FetchGet(`${host.search}/news?search=${search}&limit=30`, {
      'x-lang': language,
    });
  }
  static async read({ id }: Readonly<{ id: string }>) {
    try {
      const deviceId = getUniqueIdSync();
      await FetchPost(`${host.api}/v1/user-view`, {
        news: id,
        deviceId,
      });
    } catch {}
  }
  static async foryou({
    tag,
    page,
    limit = 3,
  }: Readonly<{
    tag: string[];
    limit?: number;
    page?: number;
  }>) {
    const query = RequestQueryParams.pagination(
      { page, limit, order: ESortDirection.DESC, orderBy: '_id' },
      builder => {
        if (tag) {
          builder.setFilter([
            {
              field: 'tags',
              operator: CondOperator.IN,
              value: tag,
            },
          ]);
        }
        return builder;
      },
    );
    const response = (await FetchGet(`${host.api}/v1/news/bulk?${query}`)) as {
      data: TNews[];
      page: number;
      pageCount: number;
    };
    console.log('foryou', response);
    return {
      data: response.data,
      page: response.page,
      pageCount: response.pageCount,
    };
  }
}
