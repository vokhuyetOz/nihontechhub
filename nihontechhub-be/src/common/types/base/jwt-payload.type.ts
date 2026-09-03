import { EAuthorRole, EAuthProvider } from 'src/common/enums';

export type JwtPayload = {
  email?: string;
  id_social_network?: string;
  id: string;
  provider: EAuthProvider;
  device_id: string;
  iat?: number;
  authorRole: EAuthorRole;
};
