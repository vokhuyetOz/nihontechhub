import { Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EAuthorRole } from 'src/common/enums';
import { Admin } from 'src/module/admin/entities/admin.entities';
import { BaseMySqlEntity } from '../../../common/entities/base-mysql.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ tableName: 'refresh_token' })
export class RefreshToken extends BaseMySqlEntity {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @Index()
  @Property({
    fieldName: 'email',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Index()
  @Property({
    fieldName: 'id_social_network',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  idSocialNetwork?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'token', type: 'text' })
  token: string;

  @IsEmpty()
  @Property({ fieldName: 'expired_at', type: 'timestamp' })
  expiredAt: Date;

  @IsEmpty()
  @Property({ fieldName: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @ApiProperty()
  @IsEnum(EAuthorRole)
  @IsNotEmpty()
  @IsDefined()
  @Enum({
    items: () => EAuthorRole,
    fieldName: 'author_role',
    default: EAuthorRole.USER,
  })
  authorRole!: EAuthorRole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ManyToOne(() => Admin, {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ManyToOne(() => User, {
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
}
