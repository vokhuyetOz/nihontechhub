import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { ELokiLevelLogs } from './constants/loki.enum';
import { LokiService } from './loki.service';

@ApiTags('Loki')
@Controller('loki')
export class LokiController {
  constructor(private readonly lokiService: LokiService) {}

  @Public()
  @Post('log')
  async testLog() {
    const object = { key: 'Save log', value: 123123 };
    await this.lokiService.createLog({
      values: object,
      stream: { level: ELokiLevelLogs.INFO, service: 'save-log-service' },
    });

    return { message: 'Log created (sent after 200 requests)' };
  }
}
