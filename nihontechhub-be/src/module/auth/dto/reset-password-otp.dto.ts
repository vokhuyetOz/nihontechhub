import { PickType } from '@nestjs/swagger';
import { ResetPassWordDTO } from './reset-password.dto';

// export class VerifyResetPasswordDTO {
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

export class VerifyResetPasswordDTO extends PickType(ResetPassWordDTO, [
  'email',
  'otp',
]) {}
