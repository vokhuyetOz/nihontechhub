export const errorMessage = {
  base: {
    //Base error control
    createEntityFailed: (target?: string) => {
      if (target) return `Create ${target} failed! Please try again!`;
      return `Create entities failed! Please try again!`;
    },

    updateEntityFailed: (target?: string) => {
      if (target) return `Update ${target} failed! Please try again!`;
      return `Update entities failed! Please try again!`;
    },

    softDeleteFailed: (target?: string) => {
      if (target)
        return `Soft delete ${target} already delete! Please try again!`;
      return `Entities already delete! Please try again!`;
    },

    hardDeleteFailed: (target?: string) => {
      if (target) return `Hard delete ${target} failed! Please try again`;
      return `Hard delete entities  failed! Please try again`;
    },

    recoverFailed: (target?: string) => {
      if (target) return `Recover ${target} failed! Please try again`;
      return `Recover entities failed! Please try again`;
    },

    deactivateFailed: (target?: string) => {
      if (target) return `Deactivate ${target} failed! Please try again`;
      return `Deactivate entities failed! Please try again`;
    },

    activeFailed: (target?: string) => {
      if (target) return `Active ${target} failed! Please try again`;
      return `Active entities failed! Please try again`;
    },

    updateConflict: (target?: string) => {
      if (target) {
        return `The ${target} has been modified. Please refresh and try again.`;
      }
      return `The entities has been modified. Please refresh and try again.`;
    },

    //Base validation
    notFoundRecord: (target?: string) => {
      if (target) return `${target} not found! Please try again!`;
      return `${target} not found! Please try again!`;
    },

    duplicateRecord: (target?: string) => {
      if (target) return `${target} already exists! Please try again!`;
      return `Entities already exists! Please try again!`;
    },

    notActiveRecord: (target?: string) => {
      if (target) {
        return `${target} is not verified! Please active your account!`;
      }
      return `Entities already exists! Please try again!`;
    },

    softDeleteRecord: (target?: string) => {
      if (target) {
        return `${target} already delete! Please try again!`;
      }
      return `Entities already delete! Please try again!`;
    },
  },

  invalidRecord: (target: string) => `Invalid ${target}! Please try again!`,
  notMatchWithOldPassword: () =>
    `Not match with old password! Please try another again!`,
  notMatchWithPassword: () =>
    `Not match with password! Please try another again!`,
  notSupportProvider: () =>
    `This account not support this provider! Please try again!`,
  expiredSession: () => `Session expired! Please log in again!`,
  expiredTarget: (target: string) => `${target} expired!`,
  isUsedTarget: (target: string) => `${target}  has been used!`,
  notEnoughPermission:
    'You do not have enough permission to access this resource',
  unauthorized: 'You must be logged in to access this resource.',
  dto: {
    invalidDTOArrayElement: 'Invalid DTO array element',
  },
  password: {
    passwordErrType:
      'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
  },
  OTP: {
    otpLengthTooShort: 'OTP must longer than 6 character!',
  },
  pushNotification: {
    notExistDeviceTokenOrUserIsDeactivateReceiveNotification: `Device token not exist or user is deactivate receive notification`,
    CannotUpdatePush: `Cannot update push notification! Please try again!`,
  },
  baseService: {
    invalidObjectIDMongo: 'Invalid ObjectID MongoDB',
    updateConflict:
      'The entity has been modified. Please refresh and try again.',
  },
};
