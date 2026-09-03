import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppVersionController } from './app-version.controller';
import { AppVersionEntity } from './entities/app-version.entity';
import { AppVersionService } from './app-version.service';

@Module({
  imports: [MikroOrmModule.forFeature([AppVersionEntity])],
  controllers: [AppVersionController],
  providers: [AppVersionService],
  exports: [AppVersionService],
})
export class AppVersionModule {}
