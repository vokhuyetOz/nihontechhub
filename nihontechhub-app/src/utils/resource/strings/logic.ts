export const CheckLogic = {
  No_internet: 'Network request failed',
  Unexpected_json: 'Unexpected end of JSON input',
  Parse_error: 'JSON Parse error: Unexpected end of input',
  Unexpected_end: 'Unexpected end of input',
  Account_state: {
    login: 'login',
    logout: 'logout',
  },
  User_status: {
    navigating: 'navigating',
    normal: 'normal',
  },
  Language_code: {
    en: 'en',
    vi: 'vi',
    ja: 'ja',
  },
  Theme: {
    base_device: 'base_device',
    light: 'light',
    dark: 'dark',
  },
  Click_notification_action: {
    detail_page: 'DETAIL_PAGE',
    url: 'URL',
    browser: 'URL_BROWSER',
  },
  Noti_type: {
    All_new: 'ALL',
    Only_metion: 'MENTION',
    None: 'NONE',
  },
  Storage_key: {
    app_intro: 'app-intro',
  },
};

export const QueryKeys = {
  EVENT: 'event',
  HIGHLIGHT: 'highlight',
  COMMENT: 'comment',
  FEED_RELATED: 'feed-related',
  ALL_CATEGORY: 'all-category',
  SEARCH: 'search',
  PROFILE: 'profile',
  NEWS: 'news',
  NEWS_MOST: 'news-most',
  TAG: 'tag',
  SOURCE: 'source',
  FOR_YOU: 'for-you',
  CHECK_APP_VERSION: 'check-app-version',
};

export enum EAppOS {
  IOS = 'ios',
  ANDROID = 'android',
  WEB = 'web',
}

export enum EAppLanguage {
  EN = 'en',
  VI = 'vi',
}

export enum ENotificationType {
  NEWS = 'news',
  EVENT = 'event',
  HIGHLIGHT = 'highlight',
}
