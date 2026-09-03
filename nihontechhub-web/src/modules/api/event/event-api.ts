import { http } from '@/modules/http';
import { ESortDirection } from '@/modules/types';

import { EventQueryParams } from './event-api.query';

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
  static async all() {
    const query = EventQueryParams.list((builder) => {
      builder.sortBy({
        order: ESortDirection.DESC,
        field: 'earliestPublished',
      });
      return builder;
    });
    const { data } = await http.get<TEvent[]>(`/event/bulk?${query}`);

    return data;
  }
  static async list({ page }: Readonly<{ page: number; category?: string }>) {
    const query = EventQueryParams.pagination({ page, limit: 10, order: ESortDirection.DESC, orderBy: 'earliestPublished' });
    const response = (await http.get(`/event/bulk?${query}`)) as {
      data: TEvent[];
      page: number;
      pageCount: number;
    };
    return { data: response.data, page: response.page, pageCount: response.pageCount };
  }

  static async recent() {
    const query = EventQueryParams.pagination({ limit: 10, order: ESortDirection.DESC, orderBy: '_id' });
    const { data } = await http.get<TEvent[]>(`/event/bulk?${query}`);
    return data;
  }
}
