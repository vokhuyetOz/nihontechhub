import { EAuthorRole } from '@common/enums';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES_KEY';
export const AccessRole = (...roles: EAuthorRole[]) => {
  const mapRole = new Map<EAuthorRole, EAuthorRole>(roles.map((i) => [i, i]));
  return SetMetadata(ROLES_KEY, mapRole);
};
