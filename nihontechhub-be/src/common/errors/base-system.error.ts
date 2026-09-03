import { TBaseError } from '../types';
import { errorMessage } from './error-message';

export const BASE_SYSTEM_ERROR = {
  UN_AUTHORIZATION: {
    code: 'AUTHORIZATION',
    message: errorMessage.unauthorized,
  },
  NOT_ENOUGH_PERMISSION: {
    code: 'NOT_ENOUGH_PERMISSION',
    message: errorMessage.notEnoughPermission,
  },
  ACCESS_TOKEN_EXPIRED: {
    code: 'ACCESS_TOKEN_EXPIRED',
    message: errorMessage.expiredTarget('Access token'),
  },
};

export const BASE_SERVICER_ERROR: TBaseError = {
  // CONTROL
  CREATE_FAILED: {
    code: 'CREATE_FAILED',
    message: errorMessage.base.createEntityFailed(),
  },

  UPDATE_FAILED: {
    code: 'UPDATE_FAILED',
    message: errorMessage.base.updateEntityFailed(),
  },

  SOFT_DELETE_FAILED: {
    code: 'SOFT_DELETE_FAILED',
    message: errorMessage.base.softDeleteFailed(),
  },

  HARD_DELETE_FAILED: {
    code: 'HARD_DELETE_FAILED',
    message: errorMessage.base.hardDeleteFailed(),
  },

  RECOVER_FAILED: {
    code: 'RECOVER_FAILED',
    message: errorMessage.base.recoverFailed(),
  },

  DEACTIVATE_FAILED: {
    code: 'DEACTIVATE_FAILED',
    message: errorMessage.base.deactivateFailed(),
  },

  ACTIVE_FAILED: {
    code: 'ACTIVE_FAILED',
    message: errorMessage.base.activeFailed(),
  },

  UPDATE_CONFLICT: {
    code: 'UPDATE_CONFLICT',
    message: errorMessage.base.updateConflict(),
  },

  // VALIDATE
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: errorMessage.base.notFoundRecord(),
  },

  DUPLICATE_RECORD: {
    code: 'DUPLICATE_RECORD',
    message: errorMessage.base.duplicateRecord(),
  },

  NOT_ACTIVE_RECORD: {
    code: 'NOT_ACTIVE_RECORD',
    message: errorMessage.base.notActiveRecord(),
  },

  SOFT_DELETE_RECORD: {
    code: 'SOFT_DELETE_RECORD',
    message: errorMessage.base.softDeleteRecord(),
  },
};
