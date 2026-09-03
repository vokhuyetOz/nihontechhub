import { Entity, Index, ManyToOne, Property } from '@mikro-orm/core';
import { News } from '@module/news/entities/news.entity';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BaseMongoEntity } from 'src/common/entities/base-mongo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ collection: 'user_view' })
export class UserView extends BaseMongoEntity {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({ nullable: true })
  userId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Index()
  @Property({ nullable: true })
  deviceId: string;

  @ApiProperty({ type: () => News })
  @IsString()
  @IsNotEmpty()
  @ManyToOne(() => News, {
    eager: false,
    nullable: false,
  })
  news: News;
}
