import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { BaseEmailDTO } from 'src/common/dto';
import { BaseValidateInterceptor } from 'src/common/interceptor/base-validate.interceptor';
import { ValidateBase } from 'src/common/metadata/base-validate.metadata';
import { TValidateUser } from 'src/common/types';
import { User } from '../user/entities/user.entity';
import { UserValidatePipe } from '../user/pipes';
import { UserService } from '../user/user.service';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { ActiveAccountOtpDTO } from './dto/active-account.dto';
import { RegisterWithEmailPassWordDTO } from './dto/register-email-password.dto';
import { RegisterAccountEmailValidatePipe } from './pipes/register-account-email-validate.pipe';
import { RegisterService } from './register.service';

@ApiTags('Register')
@Controller({
  version: '2',
  path: 'register',
})
export class RegisterControllerV2 {
  constructor(
    private readonly registerService: RegisterService,
    private readonly verifyAccountService: VerifyAccountService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Public()
  @Post('email')
  @HttpCode(HttpStatus.CREATED)
  async createOne(
    @Body(RegisterAccountEmailValidatePipe) dto: RegisterWithEmailPassWordDTO,
  ) {
    const result = await this.registerService.registerWithEmailPassword(dto);
    this.eventEmitter.emitAsync('user.verify-email.deep-link', {
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
    const verifyAccount =
      await this.verifyAccountService.saveVerifyAccountOtp(user);
    this.eventEmitter.emitAsync('user.verify-email.deep-link', {
      email: dto.email,
      otp: verifyAccount.otp,
    });
    return { otp: verifyAccount.otp };
  }

  @ApiExcludeEndpoint()
  @Public()
  @Get('active/verify')
  @HttpCode(HttpStatus.OK)
  async activeUser(@Query() query: ActiveAccountOtpDTO) {
    const result = await this.userService.userActiveAccount(query);
    return result;
  }
}
