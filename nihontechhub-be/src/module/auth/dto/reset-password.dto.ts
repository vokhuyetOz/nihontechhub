import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseEmailDTO, BasePasswordDTO } from 'src/common/dto';
import { errorMessage } from '../../../common/errors/error-message';

// export class ResetPassWordDTO {
//   @ApiProperty()
//   @Validate(IsExistOtpWithEmail, {
//     message: errorMessage.invalidRecord('otp'),
//   })
//   @IsString()
//   @MinLength(6, { message: errorMessage.OTP.otpLengthTooShort })
//   @IsNotEmpty()
//   @IsDefined()
//   otp: string;

//   @ApiProperty()
//   @MinLength(8, {
//     message: errorMessage.password.passwordErrType,
//     context: {
//       errorCode: errorCode.password.notMatchTypePassword,
//     },
//   })
//   @IsString()
//   @IsNotEmpty({
//     context: {
//       errorCode: errorCode.password.isEmpty,
//     },
//   })
//   @IsDefined()
//   password: string;

//   @ApiProperty()
//   @Validate(IsUserActiveConstraint, [{ field: 'email' }], {
//     message: errorMessage.user.accountNotActive,
//     context: {
//       errorCode: errorCode.user.notActive,
//     },
//   })
//   @Validate(IsUserSoftDeleteConstraint, [{ field: 'email' }], {
//     message: errorMessage.user.accountIsAlreadySoftRemove,
//   })
//   @Validate(IsUserExistConstraint, [{ field: 'email' }], {
//     message: errorMessage.notFoundRecord('user'),
//     context: {
//       errorCode: errorCode.user.notExistUser,
//     },
//   })
//   @IsEmail()
//   @IsNotEmpty({
//     context: {
//       errorCode: errorCode.email.isEmpty,
//     },
//   })
//   @IsDefined()
//   email: string;
// }

export class ResetPassWordDTO extends IntersectionType(
  BaseEmailDTO,
  BasePasswordDTO,
) {
  @ApiProperty()
  @IsString()
  @MinLength(6, { message: errorMessage.OTP.otpLengthTooShort })
  @IsNotEmpty()
  @IsDefined()
  otp: string;
}
