// import { InjectQueue } from '@nestjs/bullmq';
// import { Injectable } from '@nestjs/common';
// import { Queue } from 'bullmq';

// @Injectable()
// export class QueueService {
//   constructor(
//     @InjectQueue('queue.add-event-to-queue')
//     private readonly addEventToQueue: Queue,
//   ) {}

//   async queueAddOnlyEvent(data: { event: string; parameter: any }) {
//     const { event } = data;
//     await this.addEventToQueue.add(event, data, {
//       attempts: 3,
//       backoff: {
//         type: 'exponential',
//         delay: 1000,
//       },
//       removeOnComplete: true,
//       removeOnFail: false,
//     });
//   }
// }
