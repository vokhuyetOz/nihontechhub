import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EAuthorRole } from 'src/common/enums';
import { BASE_SYSTEM_ERROR } from 'src/common/errors';
import { JwtPayload } from 'src/common/types';
import { AdminService } from 'src/module/admin/admin.service';
import { UserService } from '../../module/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('cfg.auth.secretOrKey'),
    });
  }

  // request.user is here
  async validate(payload: JwtPayload) {
    if (!payload) {
      const { code, message } = BASE_SYSTEM_ERROR.ACCESS_TOKEN_EXPIRED;
      throw new BadRequestException(message, { description: code });
    }

    const { authorRole } = payload;

    if (authorRole === EAuthorRole.USER) {
      return this.userService.validateUserWithJWTPayload(payload);
    }

    if (authorRole === EAuthorRole.ADMIN) {
      return this.adminService.validateWithJWTPayload(payload);
    }

    // if (provider !== EAuthProvider.EMAIL) {
    //   await this.loginService.validateSpecialsUser(payload);
    // }
  }
}
