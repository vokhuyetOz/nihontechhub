import { EAdminRole } from '@common/enums';
import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROLES_KEY = 'ADMIN_ROLES_KEY';
export const AccessAdminRole = (...roles: EAdminRole[]) => {
  const mapRole = new Map<EAdminRole, EAdminRole>(roles.map((i) => [i, i]));
  return SetMetadata(ADMIN_ROLES_KEY, mapRole);
};
