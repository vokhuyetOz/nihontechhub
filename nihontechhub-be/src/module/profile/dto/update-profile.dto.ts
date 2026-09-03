import { OmitType } from '@nestjs/swagger';
import { Profile } from '../entities/profile.entity';

export class UpdateProfileDTO extends OmitType(Profile, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'version',
] as const) {}
