import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class AdminCreateUserDTO extends OmitType(User, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'version',
  'idSocialNetwork',
  'passwordChangedAt',
] as const) {}
