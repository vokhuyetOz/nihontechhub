import { Entity, Enum, Index, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BaseMongoEntity } from 'src/common/entities/base-mongo.entity';
import { EAuthorRole } from 'src/common/enums';

@Entity({ collection: 'notification_read_status' })
@Index({ properties: ['authorId', 'notificationId'] }) // Index phức hợp để tìm kiếm nhanh
export class NotificationReadStatus extends BaseMongoEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'author_id' })
  @Index()
  authorId!: string; // ID của người dùng

  @ApiProperty()
  @IsEnum(EAuthorRole)
  @IsNotEmpty()
  @IsDefined()
  @Enum({ items: () => EAuthorRole, fieldName: 'author_role' })
  authorRole!: EAuthorRole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'notification_id' })
  @Index()
  notificationId!: string; // ID của thông báo

  @Property({ fieldName: 'read_at', type: 'timestamp', nullable: true })
  readAt: Date; // Thời điểm đọc
}
