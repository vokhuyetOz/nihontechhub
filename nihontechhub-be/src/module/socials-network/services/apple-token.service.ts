import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
@Injectable()
export class AppleTokenService {
  constructor() {}

  //get profile by id apple
  async getClaimsFromAppleIDToken(idToken: string) {
    const client = new JwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
      requestHeaders: {},
      timeout: 30000,
    });
    const keys = await client.getSigningKeys();

    const options: jwt.VerifyOptions = {
      issuer: 'https://appleid.apple.com',
      algorithms: ['RS256'],
    };

    try {
      // Find the key matching the "kid" in the token header
      const decodedHeader = Buffer.from(
        idToken.split('.')[0],
        'base64',
      ).toString('utf8');
      const header = JSON.parse(decodedHeader);
      const matchingKey = keys.find((key) => key.kid === header.kid);

      if (!matchingKey) {
        throw new Error('Unable to find matching key for token');
      }

      const jwtClaims = jwt.verify(
        idToken,
        matchingKey.getPublicKey(),
        options,
      );

      return jwtClaims;
    } catch (err) {
      throw err;
    }
  }
}
