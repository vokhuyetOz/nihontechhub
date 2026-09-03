import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UserSubscriber } from './entities/user.subscriber';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, UserSubscriber, SqlEntityRepository],
  exports: [UserService, UserSubscriber],
})
export class UserModule {}
