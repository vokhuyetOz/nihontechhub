import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/module/user/entities/user.entity';
import { errorMessage } from '../../../common/errors/error-message';

export class ActiveAccountOtpDTO extends PickType(User, ['email']) {
  @ApiProperty()
  @MinLength(6, {
    message: errorMessage.OTP.otpLengthTooShort,
    context: { errorCode: 'E0023' },
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  otp: string;
}
