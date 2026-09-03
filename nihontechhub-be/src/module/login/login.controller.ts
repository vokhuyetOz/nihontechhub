import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseValidateInterceptor } from 'src/common/interceptor/base-validate.interceptor';
import { ValidateBase } from 'src/common/metadata/base-validate.metadata';
import { TValidateUser } from 'src/common/types';
import { Public } from '../../common/decorators/public.decorator';
import { User } from '../user/entities/user.entity';
import { UserValidatePipe } from '../user/pipes';
import { LoginWithEmailPasswordDTO } from './dto/login-with-email-password.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller({
  version: '1',
  path: 'login',
})
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    // private readonly pushNotificationService: PushNotificationService,
  ) {}

  //Default Login
  @Public()
  @Post()
  @ValidateBase<TValidateUser, User>({
    types: ['exists', 'active', 'deleted', 'password'],
    keyFind: 'email',
  })
  @UseInterceptors(BaseValidateInterceptor)
  @UsePipes(UserValidatePipe)
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: LoginWithEmailPasswordDTO) {
    const result = await this.loginService.userLoginWithEmailPassword(body);
    return result;
  }
}
