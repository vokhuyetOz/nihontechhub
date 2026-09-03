import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Event], 'mikro_orm_2')],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
