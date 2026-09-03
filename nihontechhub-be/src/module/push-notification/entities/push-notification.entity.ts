import { Entity, Enum, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EAudienceType, EAuthorType, EAuthorRole } from 'src/common/enums';
import { BaseMongoEntity } from '../../../common/entities/base-mongo.entity';
import { TNotificationContent } from 'src/common/types';

@Entity({ collection: 'notification' })
export class PushNotification extends BaseMongoEntity {
  // Loại đối tượng nhận
  @ApiProperty()
  @IsEnum(EAudienceType)
  @IsNotEmpty()
  @IsOptional()
  @Enum({ items: () => EAudienceType, fieldName: 'audience_type' })
  audienceType!: EAudienceType;

  @ApiProperty()
  @IsEnum(EAuthorRole)
  @IsNotEmpty()
  @IsDefined()
  @Enum({ items: () => EAuthorRole, fieldName: 'recipient_role' })
  recipientRole!: EAuthorRole;

  //id đối tượng nhận
  @ApiProperty()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @Property({
    fieldName: 'recipient_ids',
    nullable: true,
    type: 'array',
    default: null,
  })
  recipientIds?: string[];

  @ApiProperty()
  @IsEnum(EAudienceType)
  @IsNotEmpty()
  @IsDefined()
  @Enum({ items: () => EAudienceType, fieldName: 'author_type' })
  @Property()
  authorType!: EAuthorType; // 'user', 'company', 'system', 'admin'

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Property({ fieldName: 'author_id', nullable: true, default: null })
  authorId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'title' })
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'content' })
  content!: TNotificationContent;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Property({ fieldName: 'send_at', type: 'timestamp' })
  sendAt!: Date;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Property({ fieldName: 'active', default: true })
  active: boolean;
}
