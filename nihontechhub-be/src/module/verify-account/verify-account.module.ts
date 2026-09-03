import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { VerifyAccountSubscriber } from 'src/module/verify-account/entities/verify-account.subscriber';
import { VerifyAccount } from './entities/verify-account.entity';
import { VerifyAccountService } from './verify-account.service';

const constraints = [];

@Module({
  imports: [MikroOrmModule.forFeature([VerifyAccount])],
  providers: [
    VerifyAccountService,
    VerifyAccountSubscriber,
    ...constraints,
    SqlEntityRepository,
  ],
  exports: [VerifyAccountService, VerifyAccountSubscriber, ...constraints],
})
export class VerifyAccountModule {}
