// import { RegisterService } from '@Modules/register/register.service';
// import { Processor, WorkerHost } from '@nestjs/bullmq';
// import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { Job } from 'bullmq';

// @Injectable()
// @Processor('queue.add-event-to-queue')
// export class CallEventProcessor extends WorkerHost {
//   constructor(private readonly eventEmitter: EventEmitter2) {
//     super();
//   }
//   async process(job: Job): Promise<any> {
//     try {
//       const { event, parameter } = job.data;
//       const result = await this.eventEmitter.emitAsync(event, parameter);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
