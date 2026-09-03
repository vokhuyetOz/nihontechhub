import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NotificationReadStatus } from './entities/notification-read-status.entity';
import { NotificationReadStatusController } from './notification-read-status.controller';
import { NotificationReadStatusService } from './notification-read-status.service';

@Module({
  imports: [MikroOrmModule.forFeature([NotificationReadStatus], 'mikro_orm_2')],
  controllers: [NotificationReadStatusController],
  providers: [NotificationReadStatusService],
  exports: [NotificationReadStatusService],
})
export class NotificationReadStatusModule {}
