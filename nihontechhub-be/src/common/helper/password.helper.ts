import * as bcrypt from 'bcrypt';
import { DateHelper } from './date.helper';

export const PasswordHelper = {
  validatePasswordMatch: async (
    password: string,
    compareWithPassword: string,
  ): Promise<boolean> => {
    const isMatch: boolean = await bcrypt.compare(
      password,
      compareWithPassword,
    );
    return isMatch;
  },

  // PASSWORD
  // Check if password has changed based on the payload's issued time
  validatePassWordHasBeenChanged: (
    passwordChangedAt: Date | null,
    payloadIat: number,
  ): boolean => {
    if (!passwordChangedAt) return true;
    const issuedTime = payloadIat * 1000;
    return DateHelper.compareLessDates(passwordChangedAt, issuedTime);
  },
};
