import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDTO extends OmitType(User, [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'id',
  'idSocialNetwork',
  'active',
  'password',
  'passwordChangedAt',
  'provider',
  'version',
]) {}
