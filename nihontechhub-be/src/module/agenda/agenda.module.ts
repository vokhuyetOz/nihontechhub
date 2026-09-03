import { Module, OnApplicationShutdown } from '@nestjs/common';

import { AgendaService } from '../agenda/agenda.service';
import { ModuleRef } from '@nestjs/core';

@Module({
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}
  async onApplicationShutdown() {
    const agendaService = this.moduleRef.get(AgendaService);
    await agendaService.stop();
    await agendaService.close();
  }
}
