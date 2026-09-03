import { MemoryHelper } from '@common/helper';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = performance.now();
    const beforeMemory = process.memoryUsage();

    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        if (request.url.includes('sitemap.xml')) {
          return data;
        }
        const afterMemory = process.memoryUsage();
        const { heapUsed } = afterMemory;

        const totalHeapMemoryUsage = MemoryHelper.formatMemoryUsage(
          heapUsed - beforeMemory.heapUsed,
        );

        let response = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message,
          timestamp: `${performance.now() - now}ms`,
          heapMemoryBefore: MemoryHelper.formatMemoryUsage(
            beforeMemory.heapUsed,
          ),
          heapMemoryAfter: MemoryHelper.formatMemoryUsage(heapUsed),
          usageMemory: totalHeapMemoryUsage,
          data,
        };

        if (data?.data) {
          response = { ...response, ...data };
        }

        const headers = request.headers;
        const langHeader = headers['x-lang'] ?? 'Ja';
        let transformData = response.data;
        if (Array.isArray(response.data)) {
          transformData = response.data.map((item) => {
            return item?.getDataByLanguage?.(langHeader) ?? item;
          });
        } else if (response.data && typeof response.data === 'object') {
          transformData =
            response.data?.getDataByLanguage?.(langHeader) ?? response.data;
        }
        const result = JSON.parse(
          JSON.stringify({ ...response, data: transformData }),
        );
        return result;
      }),
    );
  }
}
