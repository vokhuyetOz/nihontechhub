import { ParsedRequestParams, SCondition } from '@dataui/crud-request';
import {
  FilterObject,
  FindOptions,
  PopulatePath,
  QueryOrder,
} from '@mikro-orm/core';
import {
  AutoPath,
  FilterQuery,
  OperatorMap,
  Populate,
} from '@mikro-orm/core/typings';
import { ObjectId } from '@mikro-orm/mongodb';
import { BadRequestException } from '@nestjs/common';
import {
  TCustomParsedRequestParams,
  TCustomQueryCursor,
  TCustomQueryFilter,
  TCustomQuerySort,
  TSearchCondition,
} from '../types';

export const BaseServiceHelper = {
  convertQueryObjectId<T>({ operator, value }: TCustomQueryFilter<T>) {
    const isInOperator =
      operator === '$in' ||
      operator === '$nin' ||
      operator === 'in' ||
      operator === 'nin';
    if (isInOperator) {
      return value.map((value) => {
        if (typeof value === 'string') {
          return new ObjectId(value);
        }
        return value;
      });
    }
    return new ObjectId(value);
  },

  convertCondition(condition: TSearchCondition): TSearchCondition {
    const result: TSearchCondition = {};

    for (const [key, value] of Object.entries(condition)) {
      if (key === '$or' || key === '$and') {
        result[key] = (value as TSearchCondition[]).map((subCondition) =>
          BaseServiceHelper.convertCondition(subCondition),
        );
      } else if (typeof value === 'object' && value !== null) {
        const operator = Object.keys(value)[0];

        result[key] = BaseServiceHelper.convertOperator({
          operator: operator.replace('$', ''),
          value: value[operator],
        });
      } else {
        result[key] = { $eq: value };
      }
    }

    return result;
  },

  convertSearch(search: SCondition) {
    if (search?.$and && Array.isArray(search.$and)) {
      search.$and = search.$and
        .filter((condition) => {
          return condition && Object.keys(condition).length > 0;
        })
        .flat();
      if (search?.$and.length === 0) {
        return [];
      }
      search.$and = search.$and.map((condition) =>
        BaseServiceHelper.convertCondition(condition),
      );
    }

    return search;
  },

  convertOr<T>(or: TCustomQueryFilter<T>[], where: any): FilterQuery<T> {
    const dataOr = or.map(({ field, operator, value }) => {
      let convertValue = value;
      if (field === '_id') {
        convertValue = BaseServiceHelper.convertQueryObjectId({
          field,
          operator,
          value,
        });
      }
      const operatorValue = BaseServiceHelper.convertOperator({
        operator,
        value: convertValue,
      });

      return { [field]: operatorValue, ...where };
    });

    return { $or: dataOr };
  },

  convertFilter<T>(filter: TCustomQueryFilter<T>[] = []): FilterObject<T> {
    const dataFilter = filter.reduce((pre, { field, operator, value }) => {
      const keys = field.split('.');
      let current = pre;

      keys.forEach((key, index) => {
        let convertValue = value;
        if (key === '_id') {
          convertValue = BaseServiceHelper.convertQueryObjectId({
            field,
            operator,
            value,
          });
        }
        const operatorValue = BaseServiceHelper.convertOperator({
          operator,
          value: convertValue,
        });
        if (index === keys.length - 1) {
          current[key] = operatorValue;
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });

      return pre;
    }, {});

    return dataFilter;
  },

  convertSort<T>(sort: TCustomQuerySort<T>[] = []) {
    const convertedSort = sort.reduce((pre, { field, order }) => {
      pre[`${field}`] = QueryOrder[order];

      return pre;
    }, {});

    return convertedSort;
  },

  //get conditional from filter and or
  convertFilterAndOrToCondition<T>(
    parsed: Partial<ParsedRequestParams>,
    where: FilterQuery<T>,
  ) {
    if (parsed?.filter?.length) {
      const filter = BaseServiceHelper.convertFilter(parsed.filter);
      where = { ...where, ...filter };
    }

    if (parsed.or?.length) {
      const or = BaseServiceHelper.convertOr(parsed.or, where);
      return or;
    }

    return where;
  },

  interceptorParsedRequestParamsToCondition<T extends object>(
    parsed: Partial<TCustomParsedRequestParams<T>>,
  ) {
    if (parsed?.cursor && parsed?.limit) {
      const { field, order, value } = parsed?.cursor;

      const cursorSort: TCustomQueryCursor<T> = {
        field,
        order,
      };

      parsed?.sort?.unshift(cursorSort);

      if (value) {
        const cursorFilter: TCustomQueryFilter<T> = {
          field,
          operator: order === 'ASC' ? '$gt' : '$lt',
          value,
        };
        parsed?.filter.push(cursorFilter);
      }
    }
  },

  //get condition from request param
  convertParsedRequestParamsToCondition<T extends object>(
    parsed: Partial<TCustomParsedRequestParams<T>>,
  ) {
    const where: FilterQuery<T> & { deleted_at: OperatorMap<T> } = {
      deleted_at: { $eq: null },
    };

    if (parsed?.withDeleted) delete where?.deleted_at;

    const isHaveQueryFilterOrQueryOr: boolean =
      parsed?.filter?.length > 0 || parsed?.or?.length > 0;

    if (isHaveQueryFilterOrQueryOr) {
      return BaseServiceHelper.convertFilterAndOrToCondition(parsed, where);
    }

    if (!isHaveQueryFilterOrQueryOr && !!parsed?.search) {
      return {
        ...where,
        ...BaseServiceHelper.convertSearch(parsed?.search),
      };
    }

    return where;
  },

  //get option query from param
  convertParsedRequestToQueryOption<T>(
    parsed: Partial<TCustomParsedRequestParams<T>>,
    findOption?: FindOptions<T>,
  ) {
    let options: FindOptions<T> = {
      orderBy: BaseServiceHelper.convertSort(parsed?.sort),
      strategy: 'select-in',
    };

    if (parsed?.limit) options.limit = parsed?.limit;

    if (parsed?.limit && parsed?.page)
      options.offset = (parsed.page - 1) * parsed?.limit;

    if (parsed?.join?.length) {
      options.populate = parsed.join.map(
        (join) => join.field,
      ) as unknown as Populate<T>;
    }

    if (parsed?.fields?.length) {
      options.fields = parsed?.fields as unknown as AutoPath<
        T,
        never,
        `${PopulatePath.ALL}`
      >[];
    }

    if (findOption) {
      options = { ...options, ...findOption };
    }

    return options;
  },

  //convert to operator query
  convertOperator({ operator, value }) {
    switch (operator) {
      case 'eq':
      case '$eq':
        return { $eq: value };

      case 'ne':
      case '$ne':
        return { $ne: value };

      case 'gt':
      case '$gt':
        return { $gt: value };

      case 'lt':
      case '$lt':
        return { $lt: value };

      case 'gte':
      case '$gte':
        return { $gte: value };

      case 'lte':
      case '$lte':
        return { $lte: value };

      case 'in':
      case '$in':
        return { $in: value };

      case 'nin':
      case '$nin':
        return { $nin: value };

      case 'like':
      case '$like':
        return { $like: value };

      case 'starts':
      case '$starts':
      case '$startsL':
        return { $like: `${value}%` };

      case 'ends':
      case '$ends':
      case '$endsL':
        return { $like: `%${value}` };

      case 'cont':
      case '$cont':
      case '$contL':
        return { $like: `%${value}%` };

      case 'ilike': // postgres only
      case '$ilike': // postgres only
        return { $ilike: value }; // postgres only

      case 'isnull':
      case '$isnull':
        return { $eq: null };

      case 'notnull':
      case '$notnull':
      case 'isnotnull':
      case '$isnotnull':
        return { $ne: null };

      default:
        return new BadRequestException('Invalid operator');
    }
  },
};
