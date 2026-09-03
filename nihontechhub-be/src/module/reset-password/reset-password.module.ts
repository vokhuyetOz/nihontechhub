import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ResetPasswordService } from './reset-password.service';
import { ResetPassword } from './entities/reset-password.entity';
import { SqlEntityRepository } from '@mikro-orm/mysql';
import { ResetPasswordSubscriber } from './entities/reset-password.subscriber';

@Module({
  imports: [MikroOrmModule.forFeature([ResetPassword]), ConfigModule],
  providers: [
    ResetPasswordService,
    ResetPasswordSubscriber,
    SqlEntityRepository,
  ],
  exports: [ResetPasswordService, ResetPasswordSubscriber],
})
export class ResetPasswordModule {}
