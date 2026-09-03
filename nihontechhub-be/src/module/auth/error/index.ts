import { errorMessage } from 'src/common/errors/error-message';

export const AUTH_ERROR = {
  SESSION_EXPIRED: {
    code: 'AU_0008',
    message: errorMessage.expiredSession(),
  },
};
