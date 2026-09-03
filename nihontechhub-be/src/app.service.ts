import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  appInfo() {
    const name = this.configService.get('cfg.app.name', { infer: true });

    return { name: name };
  }
}
