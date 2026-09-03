import { Module } from '@nestjs/common';
import { AdminManageUserController } from './admin-manage-user.controller';

@Module({
  imports: [],
  controllers: [AdminManageUserController],
  providers: [],
  exports: [],
})
export class AdminManageUserModule {}
