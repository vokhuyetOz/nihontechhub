import { TBaseValidateType } from 'src/common/types';
import { RefreshToken } from '../entities/refresh-token.entity';

export type TSaveRefreshToken = Pick<RefreshToken, 'email' | 'idSocialNetwork'>;

export type TCreateRefreshToken = { refreshToken: string; expiryDate: Date };

export type TValidateRefreshToken = Pick<TBaseValidateType, 'exists'> & {
  is_used: 'is_used';
  is_expired: 'is_expired';
  validate_author: 'validate_author';
};

export type TRefreshToken = RefreshToken;

export type TRenewTokenResponse = {
  // new access token
  token: string;

  //new refresh token
  refreshToken: string;
};
