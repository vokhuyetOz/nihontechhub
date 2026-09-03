import { PickType } from '@nestjs/swagger';
import { ResetPassword } from 'src/module/reset-password/entities/reset-password.entity';

export class ForgotPasswordDTO extends PickType(ResetPassword, [
  'authorRole',
  'email',
]) {}
