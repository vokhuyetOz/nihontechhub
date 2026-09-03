// import { BullModule } from '@nestjs/bullmq';
// import { Module } from '@nestjs/common';
// import { QueueService } from './queue.service';
// import { CallEventProcessor } from './queue.processor';

// const processors = [CallEventProcessor];

// @Module({
//   imports: [
//     BullModule.registerQueue({
//       name: 'queue.add-event-to-queue',
//     }),
//   ],
//   providers: [...processors, QueueService],
//   exports: [...processors, QueueService],
// })
// export class QueueModule {}
