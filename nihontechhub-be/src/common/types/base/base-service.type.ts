import {
  ParsedRequestParams,
  QueryFilter,
  QueryJoin,
  QuerySort,
  QuerySortOperator,
} from '@dataui/crud-request';
import { FindOptions } from '@mikro-orm/core';
import {
  BaseEmailDTO,
  BasePasswordDTO,
  BaseUpdatePasswordDTO,
} from '../../dto';

// Custom type for CrudRequest

export type TCustomQueryField<E> = (keyof E & string) | string;

export type TCustomQueryFilter<E> = Omit<QueryFilter, 'field'> & {
  field: TCustomQueryField<E>;
};

export type TCustomQuerySort<E> = Omit<QuerySort, 'field'> & {
  field: TCustomQueryField<E>;
};

export type TCustomQueryJoin<E> = Omit<QueryJoin, 'field'> & {
  field: TCustomQueryField<E>;
};

export type TCustomQueryCursor<E = Record<string, any>> = {
  field: TCustomQueryField<E>;
  order: QuerySortOperator;
  value?: any;
};

export type TCustomParsedRequestParams<E = Record<string, any>> =
  ParsedRequestParams & {
    fields: TCustomQueryField<E>[];
    filter: TCustomQueryFilter<E>[];
    or: TCustomQueryFilter<E>[];
    join: TCustomQueryJoin<E>[];
    sort: TCustomQuerySort<E>[];
    cursor: TCustomQueryCursor<E>;
    withDeleted: boolean;
  };

export type TCustomCrudRequest<E> = {
  parsed: TCustomParsedRequestParams<E>;
};

// Custom type for service

export type TGetOne = {
  id: string | number;
  parsed: Partial<ParsedRequestParams>;
};

export type TOptions<T extends object> = FindOptions<T> & {
  withDeleted?: boolean;
};

export type TResponseUpdate = { affected: number };

export type TSearchCondition = {
  [key: string]: any;
};

export type TResponseGetManyWithCursor<E> = {
  data: E[];
  startCursor: string;
  nextCursor: string;
  hasMore: boolean;
};

export type TResponseGetManyWithPaging<E> = {
  data: E[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

export type TResponseGetManyBase<E> =
  | TResponseGetManyWithPaging<E>
  | TResponseGetManyWithCursor<E>
  | E[];

// using for another

export type TCreateOtp = {
  otp: string;
  expiryDate: Date;
};

export type TEmail = BaseEmailDTO;

export type TPassword = BasePasswordDTO;

export type TUpdatePassWord = BaseUpdatePasswordDTO;

/** V2 Custom type CRUD request */
