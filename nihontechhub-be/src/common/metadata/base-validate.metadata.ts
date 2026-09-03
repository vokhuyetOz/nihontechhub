import { SetMetadata } from '@nestjs/common';

export const VALIDATE_BASE_KEY = 'validateBase';

export const ValidateBase = <T, E>(data: {
  types: (keyof T)[];
  keyFind: keyof E;
}) => {
  if (!data) return;
  const { types, keyFind } = data;
  const mapTypes = new Map(types.map((i) => [i, i]));
  return SetMetadata(VALIDATE_BASE_KEY, { mapTypes, keyFind });
};
