import { http } from '@/modules/http';
import { ESortDirection } from '@/modules/types';
import { generateFingerprint } from '@/modules/utils';
import { CondOperator, QueryFilter } from '@dataui/crud-request';

import { NewsQueryParams } from './news-api.query';

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

export class NewsAPI {
  static async featured() {
    const query = NewsQueryParams.pagination({ limit: 4, order: ESortDirection.DESC, orderBy: '_id' });
    const { data } = await http.get<TNews[]>(`/news/bulk?${query}`);
    return data;
  }
  static async list({ page, category }: Readonly<{ page: number; category?: string }>) {
    const query = NewsQueryParams.pagination({ page, limit: 10, order: ESortDirection.DESC, orderBy: '_id' }, (builder) => {
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
    });
    const response = (await http.get(`/news/bulk?${query}`)) as {
      data: TNews[];
      page: number;
      pageCount: number;
    };
    return { data: response.data, page: response.page, pageCount: response.pageCount };
  }

  static async recent() {
    const query = NewsQueryParams.pagination({ limit: 10, order: ESortDirection.DESC, orderBy: '_id' });
    const { data } = await http.get<TNews[]>(`/news/bulk?${query}`);
    return data;
  }

  static async relate({
    tags,
    id,
  }: Readonly<{
    tags: string[];
    id: string;
  }>) {
    if (id) {
      this.read({ id });
    }

    const query = NewsQueryParams.pagination({ limit: 2, order: ESortDirection.DESC, orderBy: '_id' }, (builder) => {
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
    });
    const { data } = await http.get<TNews[]>(`/news/bulk?${query}`);
    return data;
  }
  static async byTag({
    tag,
    page,
  }: Readonly<{
    tag: string;
    limit?: number;
    page?: number;
  }>) {
    const query = NewsQueryParams.pagination({ page, limit: 10, order: ESortDirection.DESC, orderBy: '_id' }, (builder) => {
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
    });
    const response = (await http.get(`/news/bulk?${query}`)) as {
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
  static async detail({ slug }: Readonly<{ slug: string }>) {
    const q = NewsQueryParams.pagination(
      {
        page: 1,
        limit: 1,
      },
      (builder) => {
        builder.setFilter([
          {
            field: `slug${process.env.NEXT_PUBLIC_LANG ?? 'Ja'}`,
            value: slug,
            operator: CondOperator.EQUALS,
          },
        ]);
        return builder;
      },
    );
    const { data } = await http.get<TNews[]>(`/news/bulk?${q}`);
    const news = data?.[0];
    return news;
  }
  static async search({ search }: Readonly<{ search: string }>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TYPESENSE_URL}/news?search=${search}&limit=50`, {
      headers: {
        'x-lang': process.env.NEXT_PUBLIC_LANG ?? 'Ja',
      },
      method: 'GET',
    });
    const result = await response.json();
    return result;
  }
  static async read({ id }: Readonly<{ id: string }>) {
    try {
      const deviceId = await generateFingerprint();
      const { data } = await http.post<{ id: string; news: string }>(`/user-view`, {
        news: id,
        deviceId,
      });
      return data;
    } catch {}
  }
  static async mostViewed() {
    const query = NewsQueryParams.pagination({ limit: 10, order: ESortDirection.DESC, orderBy: 'viewCount' });
    const { data } = await http.get<TNews[]>(`/news-statistics/bulk?${query}`);
    return data;
  }
}
