import { ELokiLevelLogs } from './loki.enum';

export type TLokiLog = {
  stream: {
    level: ELokiLevelLogs;
    service: any;
  };
  values: any;
};

export type TPayloadLokiLog = {
  streams: TLokiLog[];
};
