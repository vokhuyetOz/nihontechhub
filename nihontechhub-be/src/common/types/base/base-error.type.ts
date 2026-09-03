export type TErrorData = { code: string; message: string };

export type TErrorCustom = {
  [key: string]: TErrorData;
};

// export type TErrorCustom = Record<string, TErrorData>;

export type TBaseError = {
  CREATE_FAILED: TErrorData;
  UPDATE_FAILED: TErrorData;
  SOFT_DELETE_FAILED: TErrorData;
  HARD_DELETE_FAILED: TErrorData;
  RECOVER_FAILED: TErrorData;
  ACTIVE_FAILED: TErrorData;
  DEACTIVATE_FAILED: TErrorData;
  UPDATE_CONFLICT: TErrorData;

  NOT_FOUND: TErrorData;
  SOFT_DELETE_RECORD: TErrorData;
  DUPLICATE_RECORD?: TErrorData;
  NOT_ACTIVE_RECORD?: TErrorData;
};
