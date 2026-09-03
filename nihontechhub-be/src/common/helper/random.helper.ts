import * as crypto from 'crypto';

const charactersWithSpecialChar =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
const charactersWithNonSpecialChar =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const RandomHelper = {
  generateRandomString: (length: number): string => {
    let result = '';

    const charactersLength = charactersWithNonSpecialChar.length;

    for (let i = 0; i < length; i++) {
      result += charactersWithNonSpecialChar.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result;
  },

  generateRandomNumber: (length: number): string => {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },

  generateRandomStringWithSpecialChar: (
    length: number,
    isSpecialChar?: boolean,
  ): string => {
    let character = charactersWithNonSpecialChar;

    if (isSpecialChar) {
      character = charactersWithSpecialChar;
    }

    let result = '';
    const byteSize = Math.ceil(length * 1.25);
    // Generate random bytes
    const randomBytes = crypto.randomBytes(byteSize);
    const charactersLength = character.length;

    for (let i = 0; i < length; i++) {
      result += character.charAt(
        Math.floor(Math.random() * (randomBytes[i] % charactersLength)),
      );
    }

    return result;
  },

  randomOtp: (min: number, max: number): string => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    const otp = String(randomNumber).padStart(6, '0');

    return otp;
  },
};
