import { OmitType } from '@nestjs/swagger';
import { News } from '../entities/news.entity';

export class CreateNewsDTO extends OmitType(News, [
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
