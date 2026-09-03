import { BadRequestException } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';
import * as crypto from 'crypto';
import { DateHelper } from './date.helper';
export const EncryptHelper = {
  encrypt: (data: any): string => {
    try {
      const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
      const IV_LENGTH = Buffer.from(process.env.IV_LENGTH, 'hex');
      const ALGORITHMS = process.env.ALGORITHMS;
      const serializedObject = JSON.stringify(data);
      const cipher = createCipheriv(ALGORITHMS, ENCRYPTION_KEY, IV_LENGTH);
      let encrypted = cipher.update(serializedObject, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return Buffer.from(encrypted).toString('base64');
    } catch (e) {
      throw new BadRequestException(e);
    }
  },

  decrypt(encryptedData: string): string {
    try {
      const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
      const IV_LENGTH = Buffer.from(process.env.IV_LENGTH, 'hex');
      const buff = Buffer.from(encryptedData, 'base64').toString('utf8');
      const ALGORITHMS = process.env.ALGORITHMS;
      const decipher = createDecipheriv(ALGORITHMS, ENCRYPTION_KEY, IV_LENGTH);
      let decrypted = decipher.update(buff, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return JSON.parse(decrypted);
    } catch (e) {
      throw new BadRequestException(e);
    }
  },

  hashTokenByCrypto(token: string): string {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    return hashedToken;
  },

  createRawData(data: string): string {
    const rawToken: string =
      data +
      crypto.randomBytes(64).toString('hex') +
      DateHelper.currentDate().getTime().toString();
    return rawToken;
  },
  hash32(text: string) {
    return crypto.createHash('md5').update(text).digest('hex'); // luôn 32 ký tự hex
  },
};
