import {
  BeforeCreate,
  Embeddable,
  Embedded,
  Entity,
  Index,
  Property,
} from '@mikro-orm/core';
import { User } from '@module/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BaseMongoEntity } from '@common/entities/base-mongo.entity';
import { ELanguage } from '@common/enums';

@Embeddable()
class EventArticle {
  @Property()
  title: string;
  @Property()
  link: string;
  @Property()
  feed: string;
  @Property()
  published: string;
}

@Entity({ tableName: 'event' })
export class Event extends BaseMongoEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({
    default: null,
    nullable: true,
  })
  titleJa?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    default: null,
    nullable: true,
  })
  contentJa?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Index()
  @Property({
    default: null,
    nullable: true,
  })
  slugJa?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Index()
  @Property({
    default: null,
    nullable: true,
  })
  slugEn?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    default: null,
    nullable: true,
  })
  contentEn?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({
    default: null,
    nullable: true,
  })
  titleEn?: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  @Property({
    default: null,
    nullable: true,
  })
  imageUrl?: string;

  @ApiProperty()
  @IsString()
  @Property({
    default: null,
    nullable: true,
  })
  imageCaption?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Index()
  @Property({
    default: null,
    nullable: true,
  })
  groupId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Index()
  @Property({
    default: null,
    nullable: true,
  })
  earliestPublished: string;

  @ApiProperty()
  @IsNumber()
  @Index()
  @Property({
    default: null,
    nullable: true,
  })
  importance: number;

  @Property({ default: null, nullable: true })
  feeds?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    default: null,
    nullable: true,
  })
  authorId?: string;

  @Property({
    persist: false,
    lazy: true,
    type: 'json',
  })
  author?: User;

  @ApiProperty()
  @IsOptional()
  @Property({
    default: [],
    nullable: true,
  })
  tags?: string[];

  @ApiProperty()
  @IsOptional()
  @Property({
    default: [],
    nullable: true,
    hidden: true,
  })
  keywordsJa?: string[] = [];

  @ApiProperty()
  @IsOptional()
  @Property({
    default: [],
    nullable: true,
    hidden: true,
  })
  keywordsEn?: string[] = [];

  @Embedded(() => EventArticle, { array: true })
  articles?: EventArticle[] = [];

  @BeforeCreate()
  insert?() {
    if (!this.tags?.length) {
      this.tags = [];
    }

    if (!this.keywordsJa?.length) {
      this.keywordsJa = [];
    }
  }

  getDataByLanguage(code: ELanguage = ELanguage.JA) {
    // default property
    const result: Record<string, any> = {
      id: this.id,
      author: this.author ?? {
        avatar:
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'NihonTechHub',
        description: '技術系ジャーナリスト',
        bio: '日本の最新テクノロジーやスタートアップ情報を発信するプラットフォームです。国内外のイノベーションをつなぎ、未来を切り開くための知識とインスピレーションを提供します。',
      },
      imageUrl: this.imageUrl,
      imageCaption: this.imageCaption,
      tags: this.tags,
      feeds: this.feeds,
      articles: this.articles,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      earliestPublished: this.earliestPublished,
      importance: this.importance,
    };
    const langSuffix = code;
    const keys = Object.keys(this);

    for (const key of keys) {
      if (!key) continue;
      // Check field with suffix, e.g., titleJa
      if (key.endsWith(langSuffix)) {
        const baseKey = key.slice(0, -langSuffix.length);
        result[baseKey] = this[key] ?? this[baseKey]; // fallback nếu giá trị bị null
      }
    }

    return result;
  }
}
