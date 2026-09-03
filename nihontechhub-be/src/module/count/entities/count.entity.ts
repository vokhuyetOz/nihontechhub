import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { BaseMySqlEntity } from '../../../common/entities/base-mysql.entity';

@Entity({ tableName: 'counts' })
export class Count extends BaseMySqlEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({
    fieldName: 'name_table',
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  nameTable?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({
    fieldName: 'count',
    type: 'number',
    default: null,
    nullable: true,
  })
  count?: number;
}
