const JA = {
  language: 'Language',
  login: 'Login',
  signup: 'Signup',
  dontHaveAccount: `Don't have an account?`,
  somethingWentWrong: 'Something went wrong, please try again later.',
  darkMode: 'Dark Mode',
  lightMode: 'Light Mode',
  xMinRead: (x: string | number) => `${x}分で読めます`,
  featuredStory: '注目の記事',
  trendingNow: '今話題',
  recentPost: '最新の投稿',
  viewAll: 'すべて見る',
  newsletter: 'ニュースレター',
  footerDes: '最新のテクノロジーニュース、洞察、トレンドをお届けする信頼の情報源。テック業界を幅広くカバーする当サイトで常に最新情報を把握しましょう。',
  footerSub: '最新のテクノロジーニュースをメールで受け取りましょう。今すぐ購読を！',
  GoToSite: 'サイトを見る',
  searchArticles: '記事を検索...',
  smartNewsSynthesis: '「AIが賢くまとめるニュース」',
  smartNewsSynthesisDesc:
    '「当社AIはニュースを集めるだけでなく、複数の関連情報を統合し、分かりやすいイベントサマリーを作成します。タイムラインでは、信頼できる複数の情報源を照合し、重要な出来事だけを厳選してお届けします。」',
  readMore: 'もっと読む',
  showLess: '折りたたむ',
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
  AIAggregatedTechTimeline: '「AIがまとめたテクノロジー年表」',
  AICuratedTechHighlights: 'AI厳選テクノロジーハイライト',
  navHighlights: 'AIハイライト',
  navEvents: 'テックタイムライン',
  sources: '情報源',
  about: 'サイトについて',
  viewAllEvents: 'すべてのイベントを見る',
  AISynthesized: 'AI要約',
  AIAggregatedFrom: 'AIまとめ',
  AIPoweredIntelligence: '「AI搭載インテリジェンス」',
  AIPoweredIntelligenceDesc:
    '「当社のAIはニュースを集めるだけではなく、複数の関連する記事を知的に統合し、包括的なイベント要約を作成します。タイムラインの各項目は、複数の信頼できる情報源を照合・検証し、最も重要な出来事だけをお届けします。」',
  AICurated: 'AI厳選',
  xArticles: (x: string | number) => `AIが${x}件の記事をまとめました`,
  highlightType: {
    affairs: '時事',
    products: '製品',
    innovation: 'イノベーション',
  },
  loadMore: 'もっと見る',
  loading: '読み込み中',
  viewAllAIHighlights: 'AIハイライトをすべて表示',
  privacyPolicy: 'プライバシーポリシー',
  terms: '利用規約',
  contactUs: 'お問い合わせ',
  popularTags: '人気タグ',
  categories: 'カテゴリー',
  appInstallBanner: '外出先でも最新のテクノロジーニュースをチェック！リアルタイム通知とパーソナライズされたニュースフィードを受け取るにはアプリをダウンロードしてください。',
  downloadApp: 'アプリをダウンロード',
  realTimeUpdates: 'リアルタイム更新',
  personalizedNewsFeeds: 'カスタマイズ可能',
  pushNotifications: 'プッシュ通知',
  downloadAppOnGooglePlay: 'Google Playでダウンロード',
  free: '無料',
  downloadAppOnAppStore: 'App Storeでダウンロード',
  nihonTechHubSoftware: 'NihonTechHub ソフトウェア',
  softwareDescription: '私たちが開発した便利なツールとソフトウェア',
  driveDownloader: 'Google Drive ダウンローダー',
  downloadDescription: '閲覧専用ファイルの簡単ダウンロード',
  downloadDescriptionLong: 'Google DriveのView-only（閲覧専用）ファイルを簡単にダウンロードできるツールです。PDF、Docxファイルに対応しています。',
  supportedFormat: '対応済み',
  availableFree: '無料で利用可能',
  alsoAvailableInApp: 'この機能はNihonTechHubアプリでもご利用いただけます（Android・iOS対応）',
  downloadOnAndroid: 'Androidアプリ',
  downloadOnIOS: 'iOSアプリ',
  software: 'ソフトウェア',
  home: 'ホーム',
};

export default JA;
