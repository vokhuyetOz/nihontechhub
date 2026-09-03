import { http } from '../../http';
import { TLoginDTO, TSignupDTO } from './auth-api.dto';

export class AuthAPI {
  static async login(dto: TLoginDTO): Promise<any> {
    return http.post('/auth/signin', dto);
  }
  static async signup(dto: TSignupDTO): Promise<any> {
    return http.post('/auth/signup', dto);
  }
}
