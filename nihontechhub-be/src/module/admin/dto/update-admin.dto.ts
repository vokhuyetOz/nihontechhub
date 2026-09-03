import { OmitType } from '@nestjs/swagger';
import { Admin } from '../entities/admin.entities';

export class UpdateAdminDTO extends OmitType(Admin, [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'id',
  'active',
  'password',
  'passwordChangedAt',
  'provider',
  'version',
  'lastReadNotificationAt',
  'resetPassword',
  'refreshTokens',
]) {}
