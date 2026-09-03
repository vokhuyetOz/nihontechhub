export type TFetchBaseOutput<
  T extends object | string | number | boolean | Array<any>,
> = {
  data?: T;
  message?: string;
  code?: number;
};

export type TLoginFetchInput = {
  phone: string;
  password: string;
  rememberAccount: boolean;
};

export type TDeviceTokenFetchInput = {
  deviceToken: string;
};

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type TCommonSearchParams = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  order?: ESortDirection;
  orderBy?: string;
} & Record<string, any>;
export type TAPIPagingInfiniteResponseFormat<T> = {
  data: T;
  page: number;
  pageCount: number;
};

export type TAPIResponseFormat<T> = {
  data: T;
  statusCode: number;
  totalBefore: string;
  totalAfter: string;
};
