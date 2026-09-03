import {
  Entity,
  Index,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DateHelper } from '../helper';
dayjs.extend(utc);
@Entity({ abstract: true })
export abstract class BaseMongoEntity {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  @IsDefined()
  @PrimaryKey()
  _id: ObjectId = new ObjectId();

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @SerializedPrimaryKey()
  id!: string;

  @IsEmpty()
  @IsOptional()
  @Property({ version: true, fieldName: 'version' })
  version: number;

  @IsEmpty()
  @IsOptional()
  @Property({
    type: 'date',
    onCreate: () => DateHelper.currentDate(),
    fieldName: 'created_at',
  })
  @Index()
  createdAt!: Date;

  @IsEmpty()
  @IsOptional()
  @Property({
    type: 'date',
    onCreate: () => DateHelper.currentDate(),
    onUpdate: () => DateHelper.currentDate(),
    fieldName: 'updated_at',
  })
  @Index()
  updatedAt!: Date;

  @IsEmpty()
  @IsOptional()
  @Property({
    type: 'date',
    nullable: true,
    onCreate: () => null,
    fieldName: 'deleted_at',
  })
  @Index()
  deletedAt?: Date;
}
