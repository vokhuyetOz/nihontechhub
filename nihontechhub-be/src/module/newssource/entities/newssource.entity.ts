import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseMongoEntity } from '@common/entities/base-mongo.entity';
import { ELanguage } from '@common/enums';

@Entity({ tableName: 'newssource' })
export class Newssource extends BaseMongoEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({
    default: null,
    nullable: true,
  })
  labelJa: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    default: null,
    nullable: true,
  })
  labelEn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({
    default: null,
    nullable: true,
  })
  value: string;

  getDataByLanguage(code: ELanguage = ELanguage.JA) {
    // default property
    const result: Record<string, any> = {
      id: this.id,
      value: this.value,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
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
