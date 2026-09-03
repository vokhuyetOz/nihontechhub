import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BASE_EVENT_ERROR } from 'src/common/errors';
import { Event } from './entities/event.entity';
import { BaseMongoService } from '@common/services';
import { EntityRepository } from '@mikro-orm/mongodb';

@Injectable()
export class EventService extends BaseMongoService<Event> {
  constructor(
    @InjectRepository(Event, 'mikro_orm_2')
    private readonly repo: EntityRepository<Event>,
  ) {
    super(repo, BASE_EVENT_ERROR);
  }
}
