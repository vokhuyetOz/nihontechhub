import { AppText } from '@elements/AppText';

import { ComonStyle } from '../comonStyle';

export const StringsJapanese = {
  Now: 'Now',
  AppIntro_next: 'Next',
  App_name: 'NihonTechHub',
  Error_title: {
    No_data: 'No Data',
  },
  Menu: 'メニュー',
  Language: '言語',
  Mode: '外観設定',
  Current_version: '現在のバージョン',
  English: 'English',
  Japanese: '日本語',
  Vietnamese: 'Tiếng Việt',
  French: 'French',
  Portuguese: 'português',
  Italiano: 'Italiano',
  Light_mode: 'ライトモード',
  Dark_mode: 'ダークモード',
  Base_device: 'システムモード',
  Appintro_des_1: 'Appintro_des_1',
  Appintro_des_2: 'Appintro_des_2',
  Appintro_des_3: 'Appintro_des_3',
  Login: 'ログイン',
  Home: 'ホーム',
  Settings: '設定',
  Phone_is_not_empty: 'Phone is required',
  Phone_max_length: 'Phone is invalid',
  Password_is_not_empty: 'Password is not empty',
  Mobile_phone: 'Mobile number',
  Password: 'Password',
  Forgot_password: 'Forgot password?',
  Dont_have_an_account: "Don't have an account?",
  Sign_up: 'Sign up',
  Remember_account: 'Remember account',
  Create_account: 'Create account',
  Have_an_account: 'Already have an account',
  Gallery: 'Gallery',
  Camera: 'Camera',
  Image: 'Image',
  Next: 'Next',
  Full_name: 'Full name',
  Full_name_is_not_empty: 'Full name is not empty',
  Avatar_is_required: 'Avatar is required',
  Verify_mobile_number: 'Verify\nmobile number',
  Enter_verification_code: 'Enter the verification code sent to you via SMS.',
  Code: 'Code',
  Code_is_empty: 'Code is empty',
  Set_password: 'Set password',
  Register_vehicle_s: 'Register vehicle(s)',
  Card_number: 'Card number',
  Date: 'Date',
  Duration: 'Duration',
  Start_time: 'Start time',
  Required: '必須',
  Account_created: 'Account created',
  Account_created_success: 'You have successfully created an account.',
  Permission_denided: 'パーミッションが拒否されました',
  Permission_denided_description: '設定からパーミッションを許可してください',
  Ok: 'Ok',
  Cancel: 'Cancel',
  Profile: 'プロフィール',
  Empty_data: 'Empty data',
  Save: '保存',
  Bookmark: 'ブックマーク',
  History: '履歴',
  Phone_placeholder: 'Phone_placeholder',
  Permission: 'パーミッション',
  File_permission_denied:
    'ファイルのパーミッションが拒否されました。\n設定からファイルのパーミッションを許可してください。',
  Setting: '設定',
  Error_server: `🚧 システムをより良くするため、現在アップグレードを行っています。\nただいまサービスを一時停止しております。\nしばらくしてからもう一度お試しください。💙`,
  Network_request_fail: 'Network_request_fail',
  Account_deactive: 'Account_deactive',
  Get_started: 'Get started',
  Publisher_translator: 'Publisher/Translator',
  X_min_read: (x: string | number) => `${x}分で読めます`,
  Back: '戻る',
  Related_news: '関連記事',
  About_us: '關於我們',
  News: 'ニュース',
  AICurated: 'AI厳選',
  AI_Trend: 'AIトレンド',
  Read_more: 'もっと読む',
  Show_less: '折りたたむ',

  highlightType: {
    affairs: '時事',
    products: '製品',
    innovation: 'イノベーション',
  },
  X_articles: (x: string | number) => `AIが${x}件の記事をまとめました`,
  AIPoweredIntelligence: '「AI搭載インテリジェンス」',
  AIPoweredIntelligenceDesc:
    '「当社のAIはニュースを集めるだけではなく、複数の関連する記事を知的に統合し、包括的なイベント要約を作成します。\nタイムラインの各項目は、複数の信頼できる情報源を照合・検証し、最も重要な出来事だけをお届けします。」',
  smartNewsSynthesis: '「AIが賢くまとめるニュース」',
  smartNewsSynthesisDesc:
    '「当社AIはニュースを集めるだけでなく、複数の関連情報を統合し、分かりやすいイベントサマリーを作成します。\nタイムラインでは、信頼できる複数の情報源を照合し、重要な出来事だけを厳選してお届けします。」',
  xImpact: (x: string) => {
    const impact = x.toLowerCase();
    if (impact === 'low') {
      return '影響が低い';
    }
    if (impact === 'medium') {
      return '影響が中程度';
    }
    if (impact === 'high') {
      return '影響が高い';
    }
    if (impact === 'critical') {
      return '影響が深刻';
    }

    return `影響 ${x}`;
  },
  AISynthesized: 'AI要約',
  AIAggregatedFrom: 'AIまとめ',
  About_us_description:
    '「当社は、ニュースを集めるだけでなく、複数の関連情報を統合し、分かりやすいイベントサマリーを作成します。\nタイムラインでは、信頼できる複数の情報源を照合し、重要な出来事だけを厳選してお届けします。」',
  Contact_at: (email: string) => `メール: ${email}`,
  Search: '検索',
  Search_empty_title: '検索結果が見つかりませんでした',
  Search_empty_description: '検索キーワードを変更して、再度検索してください。',
  Logout: 'ログアウト',
  Latest_news: '最新のニュース',
  Most_viewed_news: '人気のニュース',
  Keyword: 'キーワード',
  Search_placeholder: 'ニュースを検索',
  X_view: (x: string | number) => `${x} 回表示`,
  AboutUsTitle: 'FresCoによるプロダクト',
  For_you: 'あなた向け',
  Extension: '拡張機能',
  Retry: '再試行',
  GDDownloader_title: 'Google Drive 制限付きファイル ダウンローダー',
  GDDownloader_desc:
    'ダウンロードが制限された PDF、DOC などのファイルを簡単に取得できるツールです。\n「ダウンロード」ボタンが表示されない場合でも、PDF 形式で安全に保存できます。',
  GDDowloader_placeholder: 'https://drive.google.com/file/d/xxxxxx/preview',
  GDDowloader_explain: (
    <AppText>
      1.{' '}
      <AppText style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
        https://drive.google.com/file/d/xxxxxx/preview
      </AppText>
      の形式でリンクを入力してください。 {'\n'}
      2.「PDFを作成」を押してください。
    </AppText>
  ),
  Create_PDF: 'PDFを作成',
  Extension_status: {
    init: '初期状態',
    scrolling:
      'システムはURLからデータを読み込んでいます。\n少々お待ちください。',
    loading_url:
      'システムはURLからデータを読み込んでいます。\n少々お待ちください。',
    creating_pdf:
      'システムはデータからPDFを作成しています。\n数秒かかる場合があります。',
    done: '完了しました。PDFファイルはメモリに保存されました。\nページ数が不足している場合は、ボタン「PDFを作成」を押して再度ダウンロードしてください。',
    error: '読み込み失敗。\n接続を確認して「PDFを作成」を押してください。',
  },
  Extension_explain: (
    <AppText>
      <AppText style={ComonStyle.bold}>
        PDF Google Drive ダウンローダーの紹介{'\n'}
      </AppText>
      このツールは、Google Drive 上でダウンロードが制限されている PDF や DOC
      ファイルを、最も簡単な方法でダウンロードできるオンラインツールです。{'\n'}
      Google Drive の設定や制限により、PDF や DOC
      ファイルを直接ダウンロードできない場合がありますが、このツールを使えば、ファイルをコンピューターやスマートフォンに保存して、より便利に利用することができます。
      {'\n\n'}
      <AppText style={ComonStyle.bold}>主な機能{'\n'}</AppText>*{' '}
      ダウンロードボタンが無い Google Drive の PDF、DOC
      ファイルをダウンロード可能{'\n'}* .doc、.docx、Excel
      ファイルもサポート（ダウンロード形式は .pdf になります）{'\n'}*
      ダウンロード品質：元ファイルのオリジナル品質を保持（サイズも元のまま）
      {'\n\n'}
      <AppText style={ComonStyle.bold}>使用方法{'\n'}</AppText>
      1. ダウンロードしたい Google Drive の PDF、DOC、Excel ファイルの URL
      を入力 {'\n'}
      2. 「PDFを作成」ボタンを押す {'\n'}
      3. PDF ファイルが生成され、オリジナル品質で保存されます
    </AppText>
  ),
  View: '表示',
  Share: '共有',
  File_info: (name: string, page: number) => {
    return `PDFファイル「${name}」がメモリに保存されました（ページ数: ${page}）`;
  },
  IOS_share_explain:
    'ファイルを端末に保存するには、「共有」をタップして「ファイルに保存」を選択してください。',
  Url_is_required: 'URLは必須です。',

  Notification_setting: '通知設定',
  Notification_On: 'オン',
  Notification_Off: 'オフ',
  Notification_status: '通知ステータス',
  Subscribe_tags: 'フォローしたいストーリーのタグを選択してください',
};
