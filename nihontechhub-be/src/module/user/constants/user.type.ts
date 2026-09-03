import { TBaseValidateType } from 'src/common/types';

export type TValidateUser = TBaseValidateType & {
  password: 'password';
};
