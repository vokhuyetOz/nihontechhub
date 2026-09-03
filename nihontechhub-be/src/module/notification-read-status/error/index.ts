import { errorMessage } from 'src/common/errors/error-message';
import { TBaseError } from 'src/common/types';

const targetFailed = 'Read notification';

export const BASE_READ_READ_NOTIFICATION_ERROR: TBaseError = {
  // CONTROL
  CREATE_FAILED: {
    code: `READ_NOTIFICATION_CREATE_FAILED`,
    message: errorMessage.base.createEntityFailed(targetFailed),
  },

  UPDATE_FAILED: {
    code: `READ_NOTIFICATION_UPDATE_FAILED`,
    message: errorMessage.base.updateEntityFailed(targetFailed),
  },

  SOFT_DELETE_FAILED: {
    code: `READ_NOTIFICATION_SOFT_DELETE_FAILED`,
    message: errorMessage.base.softDeleteFailed(targetFailed),
  },

  HARD_DELETE_FAILED: {
    code: `READ_NOTIFICATION_HARD_DELETE_FAILED`,
    message: errorMessage.base.hardDeleteFailed(targetFailed),
  },

  RECOVER_FAILED: {
    code: `READ_NOTIFICATION_RECOVER_FAILED`,
    message: errorMessage.base.recoverFailed(targetFailed),
  },

  DEACTIVATE_FAILED: {
    code: `READ_NOTIFICATION_DEACTIVATE_FAILED`,
    message: errorMessage.base.deactivateFailed(targetFailed),
  },

  ACTIVE_FAILED: {
    code: `READ_NOTIFICATION_ACTIVE_FAILED`,
    message: errorMessage.base.activeFailed(targetFailed),
  },

  UPDATE_CONFLICT: {
    code: 'READ_NOTIFICATION_UPDATE_CONFLICT',
    message: errorMessage.base.updateConflict(targetFailed),
  },

  // VALIDATE
  NOT_FOUND: {
    code: 'READ_NOTIFICATION_NOT_FOUND',
    message: errorMessage.base.notFoundRecord(targetFailed),
  },

  DUPLICATE_RECORD: {
    code: 'READ_NOTIFICATION_DUPLICATE_RECORD',
    message: errorMessage.base.duplicateRecord(targetFailed),
  },

  NOT_ACTIVE_RECORD: {
    code: 'READ_NOTIFICATION_NOT_ACTIVE_RECORD',
    message: errorMessage.base.notActiveRecord(targetFailed),
  },

  SOFT_DELETE_RECORD: {
    code: 'READ_NOTIFICATION_SOFT_DELETE_RECORD',
    message: errorMessage.base.softDeleteRecord(targetFailed),
  },
};
