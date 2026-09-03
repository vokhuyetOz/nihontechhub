import { CondOperator } from '@dataui/crud-request';
import { host } from '@utils/resource';

import { FetchGet } from '../FetchApi';
import { RequestQueryParams } from '../Request';

import { TCategory } from './CategoryType';

export class CategoryAPI {
  static async list() {
    const query = RequestQueryParams.all();

    const { data } = await FetchGet(`${host.api}/v1/newssource/bulk?${query}`);
    return data as TCategory[];
  }
}
