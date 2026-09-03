import { Swagger } from '@dataui/crud/lib/crud';

export const SwaggerHelper = {
  BaseQueryParamsMetadata: (
    model: any,
    func: (...args: unknown[]) => unknown,
  ) => {
    const getMetadata = Swagger.getParams(func);
    const getQueryParamsMeta = Swagger.createQueryParamsMeta('getManyBase', {
      model: { type: model },
      query: {
        softDelete: false,
      },
    });

    Swagger.setParams(
      [
        ...getMetadata,
        ...getQueryParamsMeta,
        {
          name: 'cursor',
          in: 'query',
          required: false,
          description: `
    Cursor for pagination (e.g., last seen ID)

      Syntax: ?cursor=field||ASC|DESC ||value

      Examples: 
        - ?cursor=id||ASC
        - ?cursor=id||ASC||123123
        - ?cursor=id||DESC||123123
      
      Usage:
        Use this to paginate results based on a specific field and order.
        Optionally include the last seen value to continue from that point.`,
          schema: { type: 'string' },
        },
        {
          name: 'withDeleted',
          in: 'query',
          required: false,
          description: `
    Query with soft delete record
          
      Syntax: ?withDeleted=true|false

      Examples: 
        - ?withDeleted=true
        - ?withDeleted=false
          `,
          schema: { type: 'boolean' },
        },
      ],

      func,
    );
  },
};
