import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { errorMessage } from '../errors/error-message';

export class BaseUpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  oldPassword: string;

  @ApiProperty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: errorMessage.password.passwordErrType,
  })
  @MinLength(8, { message: errorMessage.password.passwordErrType })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  newPassword: string;
}
