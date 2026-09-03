import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class DownloadService {
  getFromLocal(res: Response, filePath: string) {
    const file = path.join(process.cwd(), filePath);
    res.download(file);
  }
}
