import { errorMessage } from 'src/common/errors/error-message';
import { TBaseError } from 'src/common/types';

const targetFailed = 'user';

export const BASE_USER_ERROR: TBaseError = {
  // CONTROL
  CREATE_FAILED: {
    code: `USER_CREATE_FAILED`,
    message: errorMessage.base.createEntityFailed(targetFailed),
  },

  UPDATE_FAILED: {
    code: `USER_UPDATE_FAILED`,
    message: errorMessage.base.updateEntityFailed(targetFailed),
  },

  SOFT_DELETE_FAILED: {
    code: `USER_SOFT_DELETE_FAILED`,
    message: errorMessage.base.softDeleteFailed(targetFailed),
  },

  HARD_DELETE_FAILED: {
    code: `USER_HARD_DELETE_FAILED`,
    message: errorMessage.base.hardDeleteFailed(targetFailed),
  },

  RECOVER_FAILED: {
    code: `USER_RECOVER_FAILED`,
    message: errorMessage.base.recoverFailed(targetFailed),
  },

  DEACTIVATE_FAILED: {
    code: `USER_DEACTIVATE_FAILED`,
    message: errorMessage.base.deactivateFailed(targetFailed),
  },

  ACTIVE_FAILED: {
    code: `USER_ACTIVE_FAILED`,
    message: errorMessage.base.activeFailed(targetFailed),
  },

  UPDATE_CONFLICT: {
    code: 'USER_UPDATE_CONFLICT',
    message: errorMessage.base.updateConflict(targetFailed),
  },

  // VALIDATE
  NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: errorMessage.base.notFoundRecord(targetFailed),
  },

  DUPLICATE_RECORD: {
    code: 'USER_DUPLICATE_RECORD',
    message: errorMessage.base.duplicateRecord(targetFailed),
  },

  NOT_ACTIVE_RECORD: {
    code: 'USER_NOT_ACTIVE_RECORD',
    message: errorMessage.base.notActiveRecord(targetFailed),
  },

  SOFT_DELETE_RECORD: {
    code: 'USER_SOFT_DELETE_RECORD',
    message: errorMessage.base.softDeleteRecord(targetFailed),
  },
};

export const USER_ERROR = {
  NOT_MATCH_WITH_OLD_PASSWORD: {
    code: 'USER_NOT_MATCH_WITH_OLD_PASSWORD',
    message: errorMessage.notMatchWithOldPassword(),
  },
  NOT_MATCH_PASSWORD: {
    code: 'USER_NOT_MATCH_PASSWORD',
    message: errorMessage.notMatchWithPassword(),
  },
  ACCOUNT_NOT_SUPPORT_PROVIDER: {
    code: 'USER_ACCOUNT_NOT_SUPPORT_PROVIDER',
    message: errorMessage.notSupportProvider(),
  },
  UPDATE_PASSWORD_FAILED: {
    code: 'USER_UPDATE_PASSWORD_FAILED',
    message: errorMessage.base.updateEntityFailed('password'),
  },
};
