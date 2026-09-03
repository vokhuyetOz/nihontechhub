import { User } from 'src/module/user/entities/user.entity';

export type TResponseRegisterUser = {
  user: User;
  otp: string;
};
