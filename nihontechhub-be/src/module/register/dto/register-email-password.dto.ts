import { PickType } from '@nestjs/swagger';
import { User } from 'src/module/user/entities/user.entity';

export class RegisterWithEmailPassWordDTO extends PickType(User, [
  'email',
  'password',
] as const) {}
