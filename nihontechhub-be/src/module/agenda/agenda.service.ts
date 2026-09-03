import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import Agenda, { Job, JobAttributesData } from 'agenda';
import { TCreateJob } from 'src/common/types';
@Injectable()
export class AgendaService {
  constructor(
    @Inject('AGENDA') private readonly agenda: Agenda,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  defineJob(name: string, job: any): void {
    this.agenda.define(name, job);
  }

  scheduleJob(
    time: Date,
    name: string,
    data: any,
  ): Promise<Job<JobAttributesData>> {
    const result = this.agenda.schedule(time, name, data);
    return result;
  }

  async cancelJob(name: string): Promise<number> {
    const result = await this.agenda.cancel({ name });
    return result;
  }

  async disableJob(name: string): Promise<number> {
    const result = await this.agenda.disable({ name });
    return result;
  }

  async enableJob(name: string): Promise<number> {
    const result = await this.agenda.enable({ name });
    return result;
  }
  async stop(): Promise<void> {
    const result = await this.agenda.stop();
    return result;
  }

  async close(): Promise<Agenda> {
    const result = await this.agenda.close();
    return result;
  }

  async createJob({
    payload,
    name,
    scheduleTime,
    emitName,
  }: TCreateJob): Promise<void> {
    try {
      this.defineJob(name, () => {
        this.eventEmitter.emitAsync(emitName, payload);
      });
      this.scheduleJob(scheduleTime, name, payload);
    } catch (e) {
      throw e;
    }
  }
}
