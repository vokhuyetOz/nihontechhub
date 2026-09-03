import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseMySqlEntity } from '../../../common/entities/base-mysql.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ tableName: 'verify_account' })
export class VerifyAccount extends BaseMySqlEntity {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'email', type: 'varchar', nullable: false })
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Property({ fieldName: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Property({ fieldName: 'otp', type: 'text' })
  otp: string;

  @ApiProperty()
  @IsOptional()
  @Property({ fieldName: 'expired_at', type: 'timestamp' })
  expiredAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @OneToOne(() => User, {
    deleteRule: 'cascade',
    updateRule: 'cascade',
    lazy: false,
    eager: false,
  })
  user?: User;
}
