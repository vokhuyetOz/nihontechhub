import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SqlEntityRepository } from '@mikro-orm/mysql';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenSubscriber } from './entities/refresh-token.subscriber';

@Module({
  imports: [MikroOrmModule.forFeature([RefreshToken]), ConfigModule],
  providers: [RefreshTokenService, RefreshTokenSubscriber, SqlEntityRepository],
  exports: [RefreshTokenService, RefreshTokenSubscriber],
})
export class RefreshTokenModule {}
