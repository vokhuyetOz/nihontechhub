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
import { BaseEmailDTO } from 'src/common/dto';
import { BaseValidateInterceptor } from 'src/common/interceptor/base-validate.interceptor';
import { ValidateBase } from 'src/common/metadata/base-validate.metadata';
import { AppleRegisterDTO } from '../login/dto/apple-register.dto';
import { FacebookRegisterDTO } from '../login/dto/facebook-register.dto';
import { LineRegisterDTO } from '../login/dto/line-register.dto';
import { User } from '../user/entities/user.entity';
import { UserValidatePipe } from '../user/pipes';
import { UserService } from '../user/user.service';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { ActiveAccountOtpDTO } from './dto/active-account.dto';
import { RegisterWithEmailPassWordDTO } from './dto/register-email-password.dto';
import { RegisterAccountEmailValidatePipe } from './pipes/register-account-email-validate.pipe';
import { RegisterService } from './register.service';
import { TValidateUser } from 'src/common/types';
import { Public } from 'src/common/decorators';
import { GoogleRegisterDTO } from '@module/login/dto/google-register.dto';

@ApiTags('Register')
@Controller({
  version: '1',
  path: 'register',
})
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly verifyAccountService: VerifyAccountService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Public()
  @Post('facebook')
  @HttpCode(HttpStatus.OK)
  async registerFacebookUser(@Body() dto: FacebookRegisterDTO) {
    const result = await this.registerService.registerWithFacebook(dto);
    return result;
  }

  //Register account line
  @Public()
  @Post('line')
  @HttpCode(HttpStatus.OK)
  async registerLineUser(@Body() dto: LineRegisterDTO) {
    const result = await this.registerService.registerWithLine(dto);
    return result;
  }

  @Public()
  @Post('apple')
  @HttpCode(HttpStatus.OK)
  async registerAppleUser(@Body() dto: AppleRegisterDTO) {
    const result = await this.registerService.registerWithApple(dto);
    return result;
  }

  @Public()
  @Post('google')
  @HttpCode(HttpStatus.OK)
  async registerGoogleUser(@Body() dto: GoogleRegisterDTO) {
    const result = await this.registerService.registerWithGoogle(dto);
    return result;
  }

  @Public()
  @Post('email')
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @Body(RegisterAccountEmailValidatePipe) dto: RegisterWithEmailPassWordDTO,
  ) {
    const result = await this.registerService.registerWithEmailPassword(dto);
    this.eventEmitter.emitAsync('user.verify-email', {
      email: dto.email,
      otp: result.otp,
    });
    return result.user;
  }

  @Public()
  @Post('verify/resend')
  @HttpCode(HttpStatus.OK)
  @ValidateBase<TValidateUser, User>({
    types: ['exists'],
    keyFind: 'email',
  })
  @UseInterceptors(BaseValidateInterceptor)
  @UsePipes(UserValidatePipe)
  async sendActiveEmail(@Body() dto: BaseEmailDTO) {
    const user = await this.userService.getOne({
      filter: [{ field: 'email', operator: '$eq', value: dto?.email }],
    });

    const result = await this.verifyAccountService.saveVerifyAccountOtp(user);

    this.eventEmitter.emitAsync('user.verify-email', {
      email: dto.email,
      otp: result.otp,
    });

    return { otp: result.otp };
  }

  @Public()
  @Post('active/verify')
  @HttpCode(HttpStatus.OK)
  async activeUser(@Body() body: ActiveAccountOtpDTO) {
    const result = await this.userService.userActiveAccount(body);
    return result;
  }
}
