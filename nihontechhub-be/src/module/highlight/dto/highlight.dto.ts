import { OmitType } from '@nestjs/swagger';
import { Highlight } from '../entities/highlight.entity';

export type THighlight = {
  event_name: string;
  suggested_headline: string;
  explanation: string;
  group_title: string;
  group_summary: string;
  earliest_published: string;
  importance: number;
  articles: {
    title: string;
    link: string;
    feed: string;
    published: string;
  }[];
  feeds: string[];
  images: {
    image_link: string;
    description: string;
    score: number;
  }[];
};

export class CreateHighlightDTO extends OmitType(Highlight, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'version',
  'authorId',
  'tags',
]) {}
