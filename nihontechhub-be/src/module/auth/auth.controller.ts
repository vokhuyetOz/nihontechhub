import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { BaseValidateInterceptor } from 'src/common/interceptor/base-validate.interceptor';
import { ValidateBase } from 'src/common/metadata/base-validate.metadata';
import { TValidateRefreshToken } from 'src/common/types';
import { RenewRefreshTokenDTO } from '../refresh-token/dto/renew-refresh-token.dto';
import { RefreshToken } from '../refresh-token/entities/refresh-token.entity';
import { RefreshTokenValidatePipe } from '../refresh-token/pipes/refresh-token-validate.pipe';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { VerifyResetPasswordDTO } from './dto/reset-password-otp.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Public()
  @ValidateBase<TValidateRefreshToken, RefreshToken>({
    types: ['exists', 'is_used', 'is_expired', 'validate_author'],
    keyFind: 'token',
  })
  @UseInterceptors(BaseValidateInterceptor)
  @UsePipes(RefreshTokenValidatePipe)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async renewAllTokenPost(@Body() body: RenewRefreshTokenDTO) {
    const result = await this.refreshTokenService.renewToken(body);
    return result;
  }

  // @ApiBearerAuth()
  // @UseGuards(PoliciesGuard)
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // async logOut(@CurrentAuthor('id') id: string, @Body() logOutDto: LogOutDTO) {
  //   const result = await this.authService.logOut(id, logOutDto.device_id);
  //   return result;
  // }

  @Public()
  @Post('password/forgot')
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(@Body() body: ForgotPasswordDTO) {
    const result = await this.authService.forgotPassword(body);

    this.eventEmitter.emitAsync('user.reset-password.send-otp', {
      email: result.author.email,
      otp: result.otp,
    });

    return { otp: result.otp };
  }

  @Public()
  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Body() body: ResetPassWordDTO) {
    const result = await this.authService.resetPassword(body);
    return result;
  }

  @Public()
  @Post('password/verify')
  @HttpCode(HttpStatus.OK)
  public async validateResetPasswordOtp(@Body() body: VerifyResetPasswordDTO) {
    const verifyOtp =
      await this.resetPasswordService.handleValidateResetPasswordOTP({
        filter: [
          {
            field: 'email',
            operator: 'eq',
            value: body.email,
          },
          {
            field: 'otp',
            operator: 'eq',
            value: body.otp,
          },
        ],
      });
    return verifyOtp;
  }
}
