import { MulticastMessage } from 'src/common/types';

export type TCreateJob = {
  payload: MulticastMessage;
  name: string;
  scheduleTime: Date;
  emitName: string;
};
