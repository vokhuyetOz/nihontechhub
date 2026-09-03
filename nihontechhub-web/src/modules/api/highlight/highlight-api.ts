import { http } from '@/modules/http';
import { ESortDirection } from '@/modules/types';

import { HighlightQueryParams } from './highlight-api.query';

export type THighlight = {
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
  type: 'affairs' | 'products' | 'innovation';
  highlightType: string;
  feeds?: string[];
  articles?: Array<{
    title: string;
    link: string;
    feed: string;
    published: string;
  }>;
  images?: Array<{
    image_link: string;
    description: string;
    score: number;
  }>;
};

export class HighlightAPI {
  static async list({ page }: Readonly<{ page: number; category?: string }>) {
    const query = HighlightQueryParams.pagination({ page, limit: 10, order: ESortDirection.DESC, orderBy: 'earliestPublished' });
    const response = (await http.get(`/highlight/bulk?${query}`)) as {
      data: THighlight[];
      page: number;
      pageCount: number;
    };
    return { data: response.data, page: response.page, pageCount: response.pageCount };
  }
}
