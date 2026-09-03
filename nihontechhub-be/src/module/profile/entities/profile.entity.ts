import { BaseMySqlEntity } from '@common/entities/base-mysql.entity';
import { IsPhoneNumberValid } from '@common/validator-constraints/checkPhoneNumber.contraint';
import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Admin } from '@module/admin/entities/admin.entities';
import { User } from '@module/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Validate } from 'class-validator';

@Entity({ tableName: 'profile' })
export class Profile extends BaseMySqlEntity {
  @ApiProperty({
    type: [String],
    required: false,
    description: 'Danh sách URL avatar',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Property({
    fieldName: 'avatar',
    type: 'text[]',
    nullable: true,
    default: null,
  })
  avatar?: string[];

  @ApiProperty()
  @IsString()
  @Validate(IsPhoneNumberValid, {
    message: 'Số điện thoại không hợp lệ',
  })
  @IsOptional()
  @Property({
    fieldName: 'phone',
    type: 'varchar',
    length: 255,
    unique: true,
    default: null,
    nullable: true,
  })
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    fieldName: 'address',
    type: 'text',
    nullable: true,
    default: null,
  })
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    fieldName: 'nickname',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  nickname?: string;

  @OneToOne(() => User, {
    fieldName: 'user_id',
    referenceColumnName: 'id',
    deleteRule: 'cascade',
    updateRule: 'cascade',
    lazy: false,
    eager: false,
    nullable: true,
    default: null,
  })
  user?: User;

  @OneToOne(() => Admin, {
    fieldName: 'admin_id',
    referenceColumnName: 'id',
    deleteRule: 'cascade',
    updateRule: 'cascade',
    lazy: false,
    eager: false,
    nullable: true,
    default: null,
  })
  admin?: Admin;
}
