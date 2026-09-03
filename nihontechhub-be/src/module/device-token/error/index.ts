import { errorMessage } from 'src/common/errors/error-message';
import { TBaseError } from 'src/common/types';

const targetFailed = 'Device token';

export const BASE_DEVICE_TOKEN_ERROR: TBaseError = {
  // CONTROL
  CREATE_FAILED: {
    code: `DEVICE_TOKEN_CREATE_FAILED`,
    message: errorMessage.base.createEntityFailed(targetFailed),
  },

  UPDATE_FAILED: {
    code: `DEVICE_TOKEN_UPDATE_FAILED`,
    message: errorMessage.base.updateEntityFailed(targetFailed),
  },

  SOFT_DELETE_FAILED: {
    code: `DEVICE_TOKEN_SOFT_DELETE_FAILED`,
    message: errorMessage.base.softDeleteFailed(targetFailed),
  },

  HARD_DELETE_FAILED: {
    code: `DEVICE_TOKEN_HARD_DELETE_FAILED`,
    message: errorMessage.base.hardDeleteFailed(targetFailed),
  },

  RECOVER_FAILED: {
    code: `DEVICE_TOKEN_RECOVER_FAILED`,
    message: errorMessage.base.recoverFailed(targetFailed),
  },

  DEACTIVATE_FAILED: {
    code: `DEVICE_TOKEN_DEACTIVATE_FAILED`,
    message: errorMessage.base.deactivateFailed(targetFailed),
  },

  ACTIVE_FAILED: {
    code: `DEVICE_TOKEN_ACTIVE_FAILED`,
    message: errorMessage.base.activeFailed(targetFailed),
  },

  UPDATE_CONFLICT: {
    code: `DEVICE_TOKEN_UPDATE_CONFLICT`,
    message: errorMessage.base.updateConflict(targetFailed),
  },

  // VALIDATE
  NOT_FOUND: {
    code: `DEVICE_TOKEN_NOT_FOUND`,
    message: errorMessage.base.notFoundRecord(targetFailed),
  },

  DUPLICATE_RECORD: {
    code: `DEVICE_TOKEN_DUPLICATE_RECORD`,
    message: errorMessage.base.duplicateRecord(targetFailed),
  },

  NOT_ACTIVE_RECORD: {
    code: `DEVICE_TOKEN_NOT_ACTIVE_RECORD`,
    message: errorMessage.base.notActiveRecord(targetFailed),
  },

  SOFT_DELETE_RECORD: {
    code: `DEVICE_TOKEN_SOFT_DELETE_RECORD`,
    message: errorMessage.base.softDeleteRecord(targetFailed),
  },
};
