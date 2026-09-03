import { AdminService } from '@module/admin/admin.service';
import { LoginWithEmailPasswordDTO } from '@module/login/dto/login-with-email-password.dto';
import { LoginService } from '@module/login/login.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminLoginService {
  constructor(
    private readonly adminService: AdminService,
    private readonly loginService: LoginService,
  ) {}

  async adminLogin(dto: LoginWithEmailPasswordDTO) {
    const { email, provider } = dto;

    const admin = await this.adminService.getOne({
      filter: [
        {
          field: 'email',
          operator: 'eq',
          value: email,
        },
        {
          field: 'provider',
          operator: 'eq',
          value: provider,
        },
      ],
    });

    const { accessToken, refreshToken } =
      await this.loginService.createTokenForLoginWithEmailPassword(admin, dto);

    const result = {
      id: admin.id,
      email: admin.email,
      provider: admin.provider,
      role: admin.role,
      accessToken,
      refreshToken,
    };

    return result;
  }
}
