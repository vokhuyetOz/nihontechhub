import { errorMessage } from 'src/common/errors/error-message';
import { TBaseError } from 'src/common/types';

const targetFailed = 'news';

export const BASE_BOOK_ERROR: TBaseError = {
  // CONTROL
  CREATE_FAILED: {
    code: `BOOK_CREATE_FAILED`,
    message: errorMessage.base.createEntityFailed(targetFailed),
  },

  UPDATE_FAILED: {
    code: `BOOK_UPDATE_FAILED`,
    message: errorMessage.base.updateEntityFailed(targetFailed),
  },

  SOFT_DELETE_FAILED: {
    code: `BOOK_SOFT_DELETE_FAILED`,
    message: errorMessage.base.softDeleteFailed(targetFailed),
  },

  HARD_DELETE_FAILED: {
    code: `BOOK_HARD_DELETE_FAILED`,
    message: errorMessage.base.hardDeleteFailed(targetFailed),
  },

  RECOVER_FAILED: {
    code: `BOOK_RECOVER_FAILED`,
    message: errorMessage.base.recoverFailed(targetFailed),
  },

  DEACTIVATE_FAILED: {
    code: `BOOK_DEACTIVATE_FAILED`,
    message: errorMessage.base.deactivateFailed(targetFailed),
  },

  ACTIVE_FAILED: {
    code: `BOOK_ACTIVE_FAILED`,
    message: errorMessage.base.activeFailed(targetFailed),
  },

  UPDATE_CONFLICT: {
    code: 'BOOK_UPDATE_CONFLICT',
    message: errorMessage.base.updateConflict(targetFailed),
  },

  // VALIDATE
  NOT_FOUND: {
    code: 'BOOK_NOT_FOUND',
    message: errorMessage.base.notFoundRecord(targetFailed),
  },

  DUPLICATE_RECORD: {
    code: 'BOOK_DUPLICATE_RECORD',
    message: errorMessage.base.duplicateRecord(targetFailed),
  },

  NOT_ACTIVE_RECORD: {
    code: 'BOOK_NOT_ACTIVE_RECORD',
    message: errorMessage.base.notActiveRecord(targetFailed),
  },

  SOFT_DELETE_RECORD: {
    code: 'BOOK_SOFT_DELETE_RECORD',
    message: errorMessage.base.softDeleteRecord(targetFailed),
  },
};

export const BOOK_ERROR = {};
