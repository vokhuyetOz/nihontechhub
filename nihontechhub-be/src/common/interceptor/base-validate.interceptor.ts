import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { VALIDATE_BASE_KEY } from '../metadata/base-validate.metadata';

@Injectable()
export class BaseValidateInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // Get metadata
    const metadata = Reflect.getMetadata(VALIDATE_BASE_KEY, handler);

    if (metadata) {
      request[VALIDATE_BASE_KEY] = metadata; // Set the key-value pair to the request
    }

    return next.handle();
  }
}
