import { DateHelper } from '../helper/date.helper';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const now = DateHelper.currentDate().toISOString();
    Logger.log(
      `${req.method} ${req['ip']} ${req.headers['user-agent']} ${req['hostname']}${req['originalUrl']} at ${now}`,
    );
    next();
  }
}
