import { Entity, Enum, Index, OneToOne, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { EAuthorRole } from 'src/common/enums';
import { Admin } from 'src/module/admin/entities/admin.entities';
import { BaseMySqlEntity } from '../../../common/entities/base-mysql.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ tableName: 'reset_password' })
export class ResetPassword extends BaseMySqlEntity {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @Index()
  @Property({ fieldName: 'email', type: 'varchar', nullable: false })
  email: string;

  @Property({ fieldName: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @Property({ fieldName: 'otp', type: 'text' })
  otp: string;

  @Property({ fieldName: 'expired_at', type: 'timestamp' })
  expiredAt: Date;

  @ApiProperty()
  @IsEnum(EAuthorRole)
  @IsNotEmpty()
  @IsDefined()
  @Enum({
    items: () => EAuthorRole,
    fieldName: 'author_role',
    default: EAuthorRole.USER,
  })
  authorRole: EAuthorRole = EAuthorRole.USER;

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
}
