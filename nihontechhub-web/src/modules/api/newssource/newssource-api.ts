import { http } from '@/modules/http';
import { CondOperator } from '@dataui/crud-request';

import { NewssourceQueryParams } from './newssource-api.query';

export type TNewssource = {
  id: string;
  createdAt: string;
  updatedAt: string;
  label: string;
  value: string;
};

export class NewssourceAPI {
  static async list() {
    const query = NewssourceQueryParams.list();
    const { data } = await http.get<TNewssource[]>(`/newssource/bulk?${query}`);

    return data;
  }

  static async detail(value: string) {
    const query = NewssourceQueryParams.pagination(
      {
        page: 1,
        limit: 1,
      },
      (builder) => {
        builder.setFilter([
          {
            field: 'value',
            operator: CondOperator.EQUALS,
            value,
          },
        ]);
        return builder;
      },
    );
    const { data } = await http.get<TNewssource[]>(`/newssource/bulk?${query}`);

    return data?.[0];
  }
}
