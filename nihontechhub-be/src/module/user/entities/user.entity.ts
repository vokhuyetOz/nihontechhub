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
import { EAuthProvider, ERole } from 'src/common/enums';
import { errorMessage } from 'src/common/errors/error-message';
import { BaseMySqlEntity } from '../../../common/entities/base-mysql.entity';
import { RefreshToken } from '../../refresh-token/entities/refresh-token.entity';
import { ResetPassword } from '../../reset-password/entities/reset-password.entity';
import { VerifyAccount } from '../../verify-account/entities/verify-account.entity';
import { Profile } from '@module/profile/entities/profile.entity';

@Entity({ tableName: 'user' })
export class User extends BaseMySqlEntity {
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
  @Index()
  @Property({ fieldName: 'active', type: 'boolean', nullable: true })
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
  @IsEnum(ERole)
  @IsNotEmpty()
  @IsDefined()
  @Enum({ items: () => ERole, fieldName: 'role' })
  role?: ERole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Index()
  @Property({
    fieldName: 'id_social_network',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
    default: null,
  })
  idSocialNetwork?: string;

  @ApiProperty({ example: EAuthProvider.EMAIL })
  @IsEnum(EAuthProvider)
  @IsNotEmpty()
  @IsDefined()
  @Enum({
    items: () => EAuthProvider,
    fieldName: 'provider',
    default: EAuthProvider.EMAIL,
  })
  provider?: EAuthProvider;

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
  @OneToOne(() => ResetPassword, (resetPassword) => resetPassword.user, {
    cascade: [Cascade.ALL],
    nullable: true,
    lazy: false,
    eager: false,
    fieldName: 'reset_password',
  })
  resetPassword?: ResetPassword;

  // @ApiProperty()
  @IsString()
  @IsOptional()
  @OneToOne(() => VerifyAccount, (verifyAccount) => verifyAccount.user, {
    cascade: [Cascade.ALL],
    nullable: true,
    lazy: false,
    eager: false,
  })
  activeAccount?: VerifyAccount;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: [Cascade.ALL],
    lazy: false,
    eager: false,
  })
  refreshTokens? = new Collection<RefreshToken>(this);

  @ApiProperty()
  @IsString()
  @IsOptional()
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: [Cascade.ALL],
    nullable: true,
    lazy: false,
    eager: false,
  })
  profile?: Profile;
}
