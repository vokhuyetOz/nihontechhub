import { ELanguage } from 'src/common/enums';
import { English } from './en';
import { Japanese } from './ja';
import { Vietnamese } from './vi';

export const I18n = {
  [ELanguage.EN]: English,
  [ELanguage.JA]: Japanese,
  [ELanguage.VI]: Vietnamese,

  // default undefined language to Japanese
  ['undefined']: Vietnamese,
};
