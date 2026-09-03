import { errorMessage } from 'src/common/errors/error-message';
import { TBaseError } from 'src/common/types';

const targetFailed = 'Reset password';

export const BASE_RESET_PASSWORD_ERROR: TBaseError = {
  // CONTROL
  CREATE_FAILED: {
    code: `RESET_PASSWORD_CREATE_FAILED`,
    message: errorMessage.base.createEntityFailed(targetFailed),
  },

  UPDATE_FAILED: {
    code: `RESET_PASSWORD_UPDATE_FAILED`,
    message: errorMessage.base.updateEntityFailed(targetFailed),
  },

  SOFT_DELETE_FAILED: {
    code: `RESET_PASSWORD_SOFT_DELETE_FAILED`,
    message: errorMessage.base.softDeleteFailed(targetFailed),
  },

  HARD_DELETE_FAILED: {
    code: `RESET_PASSWORD_HARD_DELETE_FAILED`,
    message: errorMessage.base.hardDeleteFailed(targetFailed),
  },

  RECOVER_FAILED: {
    code: `RESET_PASSWORD_RECOVER_FAILED`,
    message: errorMessage.base.recoverFailed(targetFailed),
  },

  DEACTIVATE_FAILED: {
    code: `RESET_PASSWORD_DEACTIVATE_FAILED`,
    message: errorMessage.base.deactivateFailed(targetFailed),
  },

  ACTIVE_FAILED: {
    code: `RESET_PASSWORD_ACTIVE_FAILED`,
    message: errorMessage.base.activeFailed(targetFailed),
  },

  UPDATE_CONFLICT: {
    code: 'RESET_PASSWORD_UPDATE_CONFLICT',
    message: errorMessage.base.updateConflict(targetFailed),
  },

  // VALIDATE
  NOT_FOUND: {
    code: 'RESET_PASSWORD_NOT_FOUND',
    message: errorMessage.base.notFoundRecord(targetFailed),
  },

  DUPLICATE_RECORD: {
    code: 'RESET_PASSWORD_DUPLICATE_RECORD',
    message: errorMessage.base.duplicateRecord(targetFailed),
  },

  NOT_ACTIVE_RECORD: {
    code: 'RESET_PASSWORD_NOT_ACTIVE_RECORD',
    message: errorMessage.base.notActiveRecord(targetFailed),
  },

  SOFT_DELETE_RECORD: {
    code: 'RESET_PASSWORD_SOFT_DELETE_RECORD',
    message: errorMessage.base.softDeleteRecord(targetFailed),
  },
};

export const RESET_PASSWORD_ERROR = {
  EXPIRED: {
    code: 'RESET_PASSWORD_EXPIRED',
    message: errorMessage.expiredTarget(targetFailed),
  },

  IS_USED: {
    code: 'RESET_PASSWORD_IS_USED',
    message: errorMessage.isUsedTarget(targetFailed),
  },
};
