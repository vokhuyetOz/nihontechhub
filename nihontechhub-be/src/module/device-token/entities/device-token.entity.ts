import { Entity, Property, Enum, Index } from '@mikro-orm/core';
import { BaseMongoEntity } from '../../../common/entities/base-mongo.entity';
import {
  EAuthorRole,
  ELanguage,
  EOperatingSystem,
} from '../../../common/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@Entity({ collection: 'device_token' })
export class DeviceToken extends BaseMongoEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'token', nullable: true })
  token?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Index()
  @Property({
    fieldName: 'device_id',
    nullable: true,
    default: null,
    unique: true,
  })
  deviceId?: string;

  @ApiProperty({ example: EOperatingSystem.ANDROID })
  @IsEnum(EOperatingSystem)
  @IsNotEmpty()
  @IsOptional()
  @Enum({
    items: () => EOperatingSystem,
    name: 'os',
    default: EOperatingSystem.ANDROID,
  })
  os: EOperatingSystem = EOperatingSystem.ANDROID;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  @Property({ name: 'author_id', nullable: true, default: null })
  authorId?: string;

  @ApiProperty({ example: EAuthorRole.USER })
  @IsEnum(EAuthorRole)
  @IsNotEmpty()
  @IsOptional()
  @Enum({
    fieldName: 'author_role',
    items: () => EAuthorRole,
    default: EAuthorRole.USER,
  })
  authorRole?: EAuthorRole;

  @ApiProperty({ example: ELanguage.VI })
  @IsEnum(ELanguage)
  @IsNotEmpty()
  @IsOptional()
  @Enum({
    fieldName: 'language',
    items: () => ELanguage,
    default: ELanguage.JA,
  })
  language: ELanguage;
}
