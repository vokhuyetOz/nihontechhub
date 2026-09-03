import { BaseMySqlEntity } from '@common/entities/base-mysql.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'app_version' })
export class AppVersionEntity extends BaseMySqlEntity {
  @Property({ fieldName: 'android_version', length: 10 })
  androidVersion: string;

  @Property({ length: 10, fieldName: 'ios_version' })
  iosVersion: string;

  @Property({ type: 'boolean', default: false, fieldName: 'androidRequire' })
  androidRequire: boolean;

  @Property({ type: 'boolean', default: false, fieldName: 'iosRequire' })
  iosRequire: boolean;

  @Property({ length: 50, fieldName: 'androidTitle' })
  androidTitle: string;

  @Property({ length: 50, fieldName: 'iosTitle' })
  iosTitle: string;

  @Property({ length: 250, fieldName: 'androidDescription' })
  androidDescription: string;

  @Property({ length: 250, fieldName: 'iosDescription' })
  iosDescription: string;

  @Property({ length: 300, fieldName: 'androidLink' })
  androidLink: string;

  @Property({ length: 300, fieldName: 'iosLink' })
  iosLink: string;
}
