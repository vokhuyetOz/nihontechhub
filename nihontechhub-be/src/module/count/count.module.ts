import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { Count } from './entities/count.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Count])],
  providers: [CountService, SqlEntityRepository],
  exports: [CountService],
})
export class CountModule {}
