import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { LoginWithEmailPasswordDTO } from 'src/module/login/dto/login-with-email-password.dto';
import { AdminLoginService } from './admin-login.service';

@ApiTags('Admin-login')
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminLoginController {
  constructor(private readonly adminLoginService: AdminLoginService) {}

  //Default Login
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: LoginWithEmailPasswordDTO) {
    const admin = await this.adminLoginService.adminLogin(body);
    return admin;
  }
}
