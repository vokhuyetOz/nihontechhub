import { TCustomParsedRequestParams, TCustomQueryCursor } from '@common/types';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomCrudRequestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const parsed = request.NESTJSX_PARSED_CRUD_REQUEST_KEY
      .parsed as TCustomParsedRequestParams;

    const query = request.query;

    if (query?.cursor && parsed) {
      const [field, order, value] = query.cursor.split('||');

      const cursor: TCustomQueryCursor<any> = {
        field,
        order,
        value,
      };

      parsed.cursor = cursor;
    }

    if (query?.withDeleted && parsed) {
      parsed.withDeleted = query?.withDeleted === 'true' ? true : false;
    }

    return next.handle();
  }
}
