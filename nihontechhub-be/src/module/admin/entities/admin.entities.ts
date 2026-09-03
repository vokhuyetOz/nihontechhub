import {
  Cascade,
  Collection,
  Entity,
  Enum,
  Index,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { errorMessage } from 'src/common/errors/error-message';
import { RefreshToken } from 'src/module/refresh-token/entities/refresh-token.entity';
import { ResetPassword } from 'src/module/reset-password/entities/reset-password.entity';
import { BaseMySqlEntity } from '../../../common/entities/base-mysql.entity';
import { EAdminRole } from '../constants/admin.enum';
import { EAuthProvider } from 'src/common/enums';
import { Profile } from '@module/profile/entities/profile.entity';

@Entity({ tableName: 'admin' })
export class Admin extends BaseMySqlEntity {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @Index()
  @Property({
    fieldName: 'email',
    type: 'varchar',
    length: 255,
    unique: true,
    default: null,
    nullable: true,
  })
  email?: string;

  @ApiProperty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: errorMessage.password.passwordErrType,
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsDefined()
  @Property({
    fieldName: 'password',
    type: 'text',
    nullable: true,
    hidden: true,
  })
  password?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Property({
    fieldName: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active?: boolean;

  @IsDate()
  @IsEmpty()
  @Property({
    fieldName: 'password_changed_at',
    type: 'timestamp',
    nullable: true,
    hidden: true,
  })
  passwordChangedAt?: Date;

  @ApiProperty()
  @IsEnum(EAdminRole)
  @IsNotEmpty()
  @IsDefined()
  @Enum({ items: () => EAdminRole, fieldName: 'role' })
  role?: EAdminRole;

  @ApiProperty({ example: EAuthProvider.EMAIL })
  @IsEnum(EAuthProvider)
  @IsNotEmpty()
  @IsDefined()
  @Enum({
    items: () => EAuthProvider,
    fieldName: 'provider',
    default: EAuthProvider.EMAIL,
  })
  provider: EAuthProvider;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Property({
    fieldName: 'last_read_notification_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  lastReadNotificationAt: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @OneToOne(() => ResetPassword, (resetPassword) => resetPassword.admin, {
    cascade: [Cascade.ALL],
    nullable: true,
    lazy: false,
    eager: false,
  })
  resetPassword?: ResetPassword;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.admin, {
    cascade: [Cascade.ALL],
    lazy: false,
    eager: false,
  })
  refreshTokens? = new Collection<RefreshToken>(this);

  @ApiProperty()
  @IsString()
  @IsOptional()
  @OneToOne(() => Profile, (profile) => profile.admin, {
    cascade: [Cascade.ALL],
    nullable: true,
    lazy: false,
    eager: false,
  })
  profile?: Profile;
}
