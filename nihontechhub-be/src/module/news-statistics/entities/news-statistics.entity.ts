import { ELanguage } from '@common/enums';
import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { News } from '@module/news/entities/news.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseMongoEntity } from 'src/common/entities/base-mongo.entity';

@Entity({ collection: 'news_statistics' })
export class NewsStatistics extends BaseMongoEntity {
  @IsString()
  @IsNotEmpty()
  @Property({ nullable: true })
  viewCount: number;

  @IsString()
  @IsNotEmpty()
  @Property({ nullable: true })
  likeCount: number;

  @IsString()
  @IsNotEmpty()
  @Property({ nullable: true })
  bookmarkCount: number;

  @OneToOne(() => News, {
    eager: true,
    nullable: false,
    owner: true,
  })
  news: News;

  getDataByLanguage(code: ELanguage = ELanguage.JA) {
    // default property
    const result: Record<string, any> = {
      id: this.id,
      viewCount: this.viewCount,
      likeCount: this.likeCount,
      bookmarkCount: this.bookmarkCount,
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
    // 🧩 2. Xử lý object `news` (có thể là entity hoặc Ref)
    const newsEntity = this.news;

    if (newsEntity) {
      const newsData: Record<string, any> = {
        id: newsEntity.id,
        author: newsEntity.author ?? {
          avatar:
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'NihonTechHub',
          description: '技術系ジャーナリスト',
          bio: '日本の最新テクノロジーやスタートアップ情報を発信するプラットフォームです。国内外のイノベーションをつなぎ、未来を切り開くための知識とインスピレーションを提供します。',
        },
        link: newsEntity.link,
        imageUrl: newsEntity.imageUrl,
        imageCaption: newsEntity.imageCaption,
        tags: newsEntity.tags,
        source: newsEntity.source,
        updatedAt: newsEntity.updatedAt,
        createdAt: newsEntity.createdAt,
      };

      for (const key of Object.keys(newsEntity)) {
        if (!key) continue;
        if (key.endsWith(langSuffix)) {
          const baseKey = key.slice(0, -langSuffix.length);
          newsData[baseKey] = newsEntity[key] ?? newsEntity[baseKey];
        }
      }

      result.news = newsData;
    }

    return result;
  }
}
