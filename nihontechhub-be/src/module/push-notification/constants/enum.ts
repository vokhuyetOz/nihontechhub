export enum EAudienceType {
  ALL = 'all', // Tất cả người dùng
  GROUP = 'group', // Nhóm người dùng cụ thể
  EXCLUDE = 'exclude', // Loại bỏ 1 nhóm cụ thể
}

export enum EAuthorType {
  SYSTEM = 'system',
  ADMIN = 'admin',
  USER = 'user',
}

export enum EAuthorRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum ENotificationType {
  NEWS = 'news',
  EVENT = 'event',
  HIGHLIGHT = 'highlight',
}
