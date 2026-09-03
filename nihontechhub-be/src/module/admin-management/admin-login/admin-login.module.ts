import { Module } from '@nestjs/common';
import { AdminLoginController } from './admin-login.controller';
import { AdminLoginService } from './admin-login.service';

const adminConstraint = [];

@Module({
  imports: [],
  controllers: [AdminLoginController],
  providers: [AdminLoginService, ...adminConstraint],
  exports: [AdminLoginService, ...adminConstraint],
})
export class AdminLoginModule {}
