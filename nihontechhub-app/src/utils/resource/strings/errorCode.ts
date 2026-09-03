import { LanguageService } from '@utils/modules';
import { CheckLogic } from './logic';

type TErrorMessage = keyof typeof ErrorCodeJapan;
export function errorMessage(data: Array<TErrorMessage> = []) {
  const { ErrorCode } = getErrorLanguage();
  let message = '';
  if (!data?.length) {
    return message;
  }
  data?.forEach(item => {
    const messageString = ErrorCode?.[item] ? `${ErrorCode?.[item]}\n` : '';
    message += messageString;
  });
  return message?.trim();
}

function getErrorLanguage() {
  const languageCode = LanguageService.getCode();
  let errorCode: typeof ErrorCodeEnglish | typeof ErrorCodeJapan =
    ErrorCodeJapan;
  if (languageCode === CheckLogic.Language_code.en) {
    errorCode = ErrorCodeEnglish;
  }
  return { ErrorCode: errorCode };
}
export const ErrorCodeJapan = {
  // register email
  E0001: '有効なメールアドレス形式で指定してください',
  E0002: 'メールアドレスは、必ず指定してください',
  E0003: 'メールアドレスまたはパスワードが違います',
  E0004: '指定のメールアドレスは既に使用されています',

  // password
  E0010:
    'パスワードは8文字以上で、少なくとも1つの大文字、1つの小文字、1つの数字を含む必要があります',
  E0011: 'メールアドレスまたはパスワードが違います',
  E0012: 'パスワードは、必ず指定してください',
  E0014: 'パスワードは変更しました',

  // otp
  E0020: '送信されたコードが一致しません',
  E0021: '確認コードを送信しました',
  E0022: '確認コードを再送信しました',
  E0023: '確認コードは6文字で入力してください',

  // image
  E0030: '画像は、必ず指定してください',
  E0031: '画像には、8KB以下のファイルを指定してください',
  E0032: '画像は、25個以下にしてください',
  E0033: '画像のアップロードに失敗しました',
  E0034: '画像のアップロードに成功しました',
  E0035: '画像の値型ファイルを指定してください',
  E0036: '画像内の顔を認証できませんでした。',

  // login
  E0040: 'ログインしました',
  E0041: 'セッションがタイムアウトしました。再度ログインしてください',

  // register
  E0050: 'アカウントの登録は成功しました',
  E0051: 'アカウントの登録は失敗しました',

  // common
  E0060: 'この項目は入力必須です',
  E0061: 'この項目は最大値以下に設定してください。',
  E0062: 'ネットワークを確認してください',
  E0063: 'この項目の最大長以下の文字を指定してください。',
  E0064: 'この項目は必ずに数字を指定してください',
  E0065: '入力された価値は、有効ではありません',

  // video
  E0070: 'ビデオは、必ず指定してください',
  E0071: 'ビデオには、25MB以下のファイルを指定してください',
  E0072: 'ビデオは、25個以下にしてください',
  E0073: 'ビデオのアップロードに失敗しました',
  E0074: 'ビデオのアップロードに成功しました',
  E0075: 'ビデオの値タイプのファイルを指定してください',
};
export const ErrorCodeEnglish = {
  // register email
  E0001: 'Please specify a valid email address format',
  E0002: 'Please be sure to specify your email address',
  E0003: 'The email address or password is incorrect',
  E0004: 'The specified email address is already in use',

  // password
  E0010:
    'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number',
  E0011: 'The email address or password is incorrect',
  E0012: 'Please be sure to specify a password',
  E0014: 'Password has been changed',

  //otp
  E0020: 'Submitted codes do not match',
  E0021: 'Verification code sent',
  E0022: 'Verification code resent',
  E0023: 'Please enter the confirmation code in 6 characters',

  // image
  E0030: 'Please be sure to specify an image',
  E0031: 'Please specify a file of 8KB or less for the image',
  E0032: 'Please limit the number of images to 25 or less',
  E0033: 'Failed to upload image',
  E0034: 'Image upload successfully',
  E0035: 'Please specify the image value type file',
  E0036: 'Failed to recognize the face in the image. ',

  // login
  E0040: 'Logined',
  E0041: 'Session timed out. Please log in again',

  // register
  E0050: 'Account registration was successful',
  E0051: 'Account registration failed',

  // common
  E0060: 'This field is required',
  E0061: 'Please set this item below the maximum value. ',
  E0062: 'Please check the network',
  E0063:
    'Please specify characters less than or equal to the maximum length for this item. ',
  E0064: 'Please be sure to specify a number for this item',
  E0065: 'The value entered is not valid',

  // video
  E0070: 'Please be sure to specify the video',
  E0071: 'Please specify a file size of 25MB or less for the video',
  E0072: 'Please limit the number of videos to 25 or less',
  E0073: 'Failed to upload video',
  E0074: 'Video upload successfully',
  E0075: 'Please specify a file of video value type',
};
