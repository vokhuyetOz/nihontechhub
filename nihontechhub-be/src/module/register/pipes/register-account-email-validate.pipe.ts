import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EAuthProvider } from 'src/common/enums';
import { BASE_USER_ERROR, USER_ERROR } from 'src/common/errors';
import { User } from 'src/module/user/entities/user.entity';
import { UserService } from 'src/module/user/user.service';
import { RegisterWithEmailPassWordDTO } from '../dto';

@Injectable()
export class RegisterAccountEmailValidatePipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(body: RegisterWithEmailPassWordDTO) {
    const user: User = await this.userService.getOneWithoutValidate({
      filter: [{ field: 'email', operator: '$eq', value: body.email }],
    });
    if (!user) return body;
    if (user?.provider !== EAuthProvider.EMAIL) {
      const { message, code } = USER_ERROR.ACCOUNT_NOT_SUPPORT_PROVIDER;
      throw new BadRequestException(message, {
        description: code,
      });
    }
    const isPasswordMatching: boolean = await bcrypt.compare(
      body?.password,
      user?.password,
    );
    if (!isPasswordMatching) {
      const { message, code } = BASE_USER_ERROR.DUPLICATE_RECORD;
      throw new BadRequestException(message, {
        description: code,
      });
    }
    if (!user?.active) {
      const { message, code } = BASE_USER_ERROR.NOT_ACTIVE_RECORD;
      throw new BadRequestException(message, {
        description: code,
      });
    }
    if (user?.deletedAt) {
      const { message, code } = BASE_USER_ERROR.SOFT_DELETE_FAILED;
      throw new BadRequestException(message, {
        description: code,
      });
    }
  }
}
