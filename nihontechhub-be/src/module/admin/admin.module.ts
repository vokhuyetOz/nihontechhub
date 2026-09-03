import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entities';
import { AdminSubscriber } from './entities/admin.subscriber';

@Module({
  imports: [MikroOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminSubscriber, SqlEntityRepository],
  exports: [AdminService, AdminSubscriber],
})
export class AdminModule {}
