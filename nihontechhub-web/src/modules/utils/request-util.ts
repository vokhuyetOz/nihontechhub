import { CondOperator, RequestQueryBuilder } from '@dataui/crud-request';

import { ESortDirection, TCommonSearchParams } from '../types';

export class RequestQueryParams {
  static pagination<T>(filter?: TCommonSearchParams & T, extendQuery?: (builder: RequestQueryBuilder) => RequestQueryBuilder) {
    const queryBuilder = RequestQueryBuilder.create({
      page: filter?.page ? Number(filter?.page) : 1,
      limit: filter?.limit ? Number(filter?.limit) : 10,
    });
    if (filter?.searchTerm) {
      queryBuilder.setPage(1);
      queryBuilder.setOr([
        {
          field: filter?.searchTerm,
          operator: CondOperator.CONTAINS_LOW,
          value: filter?.searchTerm?.trim(),
        },
      ]);
    }
    if (filter?.orderBy && filter?.order) {
      queryBuilder.sortBy({
        field: filter?.orderBy,
        order: filter?.order === ESortDirection.ASC ? 'ASC' : 'DESC',
      });
    }

    extendQuery?.(queryBuilder);

    return queryBuilder.query(false);
  }
  static list(extendQuery?: (builder: RequestQueryBuilder) => RequestQueryBuilder) {
    const queryBuilder = RequestQueryBuilder.create({
      page: 1,
      limit: 300,
    });
    extendQuery?.(queryBuilder);
    return queryBuilder.query(true);
  }
}
