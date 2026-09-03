import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SERVER_JWT_SECRET);

export class JWTHelper {
  static async sign(payload: any): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour
    return new SignJWT({ ...payload }).setProtectedHeader({ alg: 'HS256', typ: 'JWT' }).setExpirationTime(exp).setIssuedAt(iat).setNotBefore(iat).sign(secret);
  }
  static async verify(token: string): Promise<any> {
    try {
      const { payload } = await jwtVerify(token, secret);
      return payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
