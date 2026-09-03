import { RequestQueryParams } from '../Request';
import { host } from '@utils/resource';
import { FetchGet } from '../FetchApi';
import { ESortDirection } from '../types';

export type TEvent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  content: string;
  slug: string;
  source: string;
  tags: string[];
  keywords: string[];
  author?: any;
  groupId: string;
  earliestPublished: string;
  importance: number;
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  feeds?: string[];
  articles?: Array<{
    title: string;
    link: string;
    feed: string;
    published: string;
  }>;
};

export class EventAPI {
  static async list({
    page,
    limit = 10,
  }: Readonly<{ page: number; limit?: number }>) {
    const query = RequestQueryParams.pagination({
      page,
      limit,
      order: ESortDirection.DESC,
      orderBy: 'earliestPublished',
    });
    const response = (await FetchGet(`${host.api}/v1/event/bulk?${query}`)) as {
      data: TEvent[];
      page: number;
      pageCount: number;
    };

    return {
      data: response.data,
      page: response.page,
      pageCount: response.pageCount,
    };
  }
}
