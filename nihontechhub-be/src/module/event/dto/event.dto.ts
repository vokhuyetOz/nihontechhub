import { OmitType } from '@nestjs/swagger';
import { Event } from '../entities/event.entity';

export type TEvent = {
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
  group_id: string;
};

export class CreateEventDTO extends OmitType(Event, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'version',
  'authorId',
  'tags',
  'imageCaption',
  'imageUrl',
]) {}
