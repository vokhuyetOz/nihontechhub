import { Module } from '@nestjs/common';
import { LokiController } from './loki.controller';
import { LokiService } from './loki.service';

@Module({
  imports: [],
  controllers: [LokiController],
  providers: [LokiService],
  exports: [LokiService],
})
export class LokiModule {}
