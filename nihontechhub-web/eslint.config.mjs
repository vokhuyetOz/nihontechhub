import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-sync-scripts': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['tailwind.config.ts'],
  },
  {
    plugins: {
      'prettier-plugin-tailwindcss': tailwindPlugin,
    },
  },
];

export default eslintConfig;
