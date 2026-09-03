import { Module } from '@nestjs/common';
import { ManagementAdminController } from './management-admin.controller';

@Module({
  imports: [],
  controllers: [ManagementAdminController],
  providers: [],
  exports: [],
})
export class ManagementAdminModule {}
