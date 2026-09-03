import { Test, TestingModule } from '@nestjs/testing';
import { AgendaService } from './agenda.service';
import Agenda, { Job, JobAttributesData } from 'agenda';

describe('AgendaService', () => {
  let service: AgendaService;
  let agenda: Agenda;

  beforeEach(async () => {
    agenda = {
      define: jest.fn(),
      schedule: jest.fn(),
      cancel: jest.fn().mockResolvedValue(1),
      disable: jest.fn().mockResolvedValue(1),
      enable: jest.fn().mockResolvedValue(1),
      stop: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue({} as Agenda),
    } as unknown as Agenda;

    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendaService, { provide: 'AGENDA', useValue: agenda }],
    }).compile();

    service = module.get<AgendaService>(AgendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should define a job', () => {
    const jobName = 'testJob';
    const jobDefinition = jest.fn();
    service.defineJob(jobName, jobDefinition);
    expect(agenda.define).toHaveBeenCalledWith(jobName, jobDefinition);
  });

  it('should schedule a job', async () => {
    const time = DateHelper.currentDate();
    const jobName = 'testJob';
    const data = { key: 'value' };
    const job = {} as Job<JobAttributesData>;

    (agenda.schedule as jest.Mock).mockResolvedValue(job);
    const result = await service.scheduleJob(time, jobName, data);
    expect(agenda.schedule).toHaveBeenCalledWith(time, jobName, data);
    expect(result).toBe(job);
  });

  it('should cancel a job', async () => {
    const jobName = 'testJob';
    const result = await service.cancelJob(jobName);
    expect(agenda.cancel).toHaveBeenCalledWith({ name: jobName });
    expect(result).toBe(1);
  });

  it('should disable a job', async () => {
    const jobName = 'testJob';
    const result = await service.disableJob(jobName);
    expect(agenda.disable).toHaveBeenCalledWith({ name: jobName });
    expect(result).toBe(1);
  });

  it('should enable a job', async () => {
    const jobName = 'testJob';
    const result = await service.enableJob(jobName);
    expect(agenda.enable).toHaveBeenCalledWith({ name: jobName });
    expect(result).toBe(1);
  });

  it('should stop agenda', async () => {
    const result = await service.stop();
    expect(agenda.stop).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should close agenda', async () => {
    const result = await service.close();
    expect(agenda.close).toHaveBeenCalled();
    expect(result).toEqual({});
  });
});
