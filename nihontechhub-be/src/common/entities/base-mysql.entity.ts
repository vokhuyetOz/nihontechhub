import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { v7 as uuidv7 } from 'uuid';
import { DateHelper } from '../helper';
dayjs.extend(utc);

@Entity({ abstract: true })
export abstract class BaseMySqlEntity {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  @PrimaryKey()
  id: string = uuidv7();

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Property({ version: true, fieldName: 'version' })
  version!: number;

  @IsNotEmpty()
  @IsOptional()
  @Property({
    columnType: 'timestamp',
    nullable: true,
    default: null,
    fieldName: 'deleted_at',
  })
  @Index()
  deletedAt?: Date;

  // @ApiProperty()
  @IsEmpty()
  @IsOptional()
  @Property({
    columnType: 'timestamp',
    // defaultRaw: 'CURRENT_TIMESTAMP',
    onCreate: () => DateHelper.currentDate(),
    fieldName: 'created_at',
  })
  @Index()
  createdAt!: Date;

  @IsEmpty()
  @IsOptional()
  @Property({
    columnType: 'timestamp',
    // defaultRaw: 'CURRENT_TIMESTAMP',
    onCreate: () => DateHelper.currentDate(),
    onUpdate: () => DateHelper.currentDate(),
    fieldName: 'updated_at',
  })
  @Index()
  updatedAt!: Date;
}
