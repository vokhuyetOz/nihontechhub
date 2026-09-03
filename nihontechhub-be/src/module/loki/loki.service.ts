import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { TLokiLog, TPayloadLokiLog } from 'src/common/types';
import * as zlib from 'zlib';

@Injectable()
export class LokiService implements OnModuleInit, OnModuleDestroy {
  private lokiUrl = `${process.env.DOMAIN}:${process.env.LOKI_PORT}/loki/api/v1/push`; // Change if needed
  private logBuffer: TLokiLog[] = [];
  private requestCount = 0; // Track request count
  private flushInterval: NodeJS.Timeout;

  constructor() {
    this.startLogFlush();
  }

  /*
    Example save logs
    const object = { key: 'Save log', value: 123123 };
    await this.lokiService.createLog({
      values: object,
      stream: { level: ELokiLevelLogs.INFO, service: 'save-log-service' },
    });
  */

  // 🟢 Add logs to the buffer (but send only after 200 requests)
  async createLog(data: TLokiLog) {
    const { values, stream } = data;
    const logEntry = [
      `${Date.now()}000000`, // Nanosecond timestamp
      values,
    ];

    this.logBuffer.push({
      stream,
      values: [logEntry],
    });
    this.requestCount++;

    // 🔥 If 200 requests reached, flush logs
    if (this.requestCount >= 200) {
      await this.flushLogs();
      this.requestCount = 0; // Reset counter
    }
  }

  // 🚀 Send logs in batches to Loki
  private async flushLogs() {
    if (this.logBuffer.length === 0) return;

    const payload: TPayloadLokiLog = { streams: this.logBuffer };
    this.logBuffer = []; // Clear buffer after sending
    try {
      const compressedPayload = zlib.gzipSync(JSON.stringify(payload));
      await axios.post(this.lokiUrl, compressedPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
        },
      });
    } catch (error) {
      console.error('❌ Loki log push failed:', error.message);
    }
  }

  // 🔄 Automatically flush logs every 5 seconds (backup in case 200 requests take too long)
  private startLogFlush() {
    this.flushInterval = setInterval(() => this.flushLogs(), 7000);
  }

  onModuleDestroy() {
    clearInterval(this.flushInterval);
    this.flushLogs();
  }

  onModuleInit() {
    this.startLogFlush();
  }
}
