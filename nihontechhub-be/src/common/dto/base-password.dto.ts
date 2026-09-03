import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { errorMessage } from '../errors/error-message';

export class BasePasswordDTO {
  @ApiProperty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: errorMessage.password.passwordErrType,
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
