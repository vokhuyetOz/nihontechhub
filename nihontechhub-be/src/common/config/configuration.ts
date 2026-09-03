import { Options } from '@mikro-orm/core';
import { MongoDriver } from '@mikro-orm/mongodb';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Admin } from '@module/admin/entities/admin.entities';
import { AdminSubscriber } from '@module/admin/entities/admin.subscriber';
import { News } from '@module/news/entities/news.entity';
import { Count } from '@module/count/entities/count.entity';
import { DeviceToken } from '@module/device-token/entities/device-token.entity';
import { NotificationReadStatus } from '@module/notification-read-status/entities/notification-read-status.entity';
import { Profile } from '@module/profile/entities/profile.entity';
import { PushNotification } from '@module/push-notification/entities/push-notification.entity';
import { RefreshToken } from '@module/refresh-token/entities/refresh-token.entity';
import { RefreshTokenSubscriber } from '@module/refresh-token/entities/refresh-token.subscriber';
import { ResetPassword } from '@module/reset-password/entities/reset-password.entity';
import { ResetPasswordSubscriber } from '@module/reset-password/entities/reset-password.subscriber';
import { User } from '@module/user/entities/user.entity';
import { UserSubscriber } from '@module/user/entities/user.subscriber';
import { VerifyAccount } from '@module/verify-account/entities/verify-account.entity';
import { VerifyAccountSubscriber } from '@module/verify-account/entities/verify-account.subscriber';
import { registerAs } from '@nestjs/config';
import { AgendaConfig } from 'agenda';
import { Newssource } from '@module/newssource/entities/newssource.entity';
import { Event } from '@module/event/entities/event.entity';
import { Highlight } from '@module/highlight/entities/highlight.entity';
import { UserView } from '@module/user-view/entities/user-view.entity';
import { NewsStatistics } from '@module/news-statistics/entities/news-statistics.entity';
import { AppVersionEntity } from '@module/app-version/entities/app-version.entity';

const mysqlEntities = [
  Admin,
  User,
  RefreshToken,
  ResetPassword,
  VerifyAccount,
  Count,
  Profile,
  AppVersionEntity,
];

const mongoEntities = [
  DeviceToken,
  PushNotification,
  NotificationReadStatus,
  News,
  Newssource,
  Event,
  Highlight,
  NewsStatistics,
  UserView,
];

const mysqlSubscriber = [
  AdminSubscriber,
  UserSubscriber,
  RefreshTokenSubscriber,
  ResetPasswordSubscriber,
  VerifyAccountSubscriber,
];

export default registerAs('cfg', () => {
  return {
    db: {
      mikro_mysql: {
        driver: MySqlDriver,
        clientUrl: `mysql://${process.env.MYSQL_USER_ROOT}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQL_ROOT_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`,
        entities: mysqlEntities,
        subscribers: mysqlSubscriber,
        allowGlobalContext: true,
        populateAfterFlush: false, //after flush not return relation record
        // timezone: 'UTC',
        // metadataProvider: TsMorphMetadataProvider,
        // autoLoadEntities: true,
        // debug: true, //config for genarate to sql commands
      } as Options,
      mikro_mongo: {
        driver: MongoDriver,
        clientUrl: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?directConnection=true&authSource=admin`,
        entities: mongoEntities,
        disableIdentityMap: false,
        allowGlobalContext: true,
        contextName: 'mikro_orm_2',
        populateAfterFlush: false,
        // timezone: 'UTC',
        // metadataProvider: TsMorphMetadataProvider,
        // autoLoadEntities: true,
        // debug: true, //config for genarate to sql command
      } as Options,
      agenda: {
        name: 'AGENDA',
        db: {
          address: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`,
          collection: 'job',
          options: {
            directConnection: true,
            authSource: 'admin',
          },
        },
      } as AgendaConfig,
    },
    minio: {
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    },
    auth: {
      secretOrKey: process.env.SECRET_KEY,
      expiresIn: process.env.EXPIRES_IN,
      resetPasswordExpiresIn: parseInt(process.env.RESET_PASSWORD_EXPIRES_IN),
      refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      activeAccountExpiresIn: process.env.ACTIVE_ACCOUNT_EXPIRES_IN,
    },
    bcrypt: {
      saltOrRounds: parseInt(process.env.SALT_ROUNDS),
    },
    mail: {
      mailHost: process.env.MAIL_HOST,
      mailPort: parseInt(process.env.MAIL_PORT),
      mailUser: process.env.MAIL_USER,
      mailPassword: process.env.MAIL_PASSWORD,
      mailFrom: process.env.MAIL_FROM,
    },
    timezone: {
      vietnam: process.env.TZ,
    },
    api: {
      url: process.env.URL,
    },
    app: {
      name: 'NestJS API',
    },
    paging: {
      size: process.env.DEFAULT_PAGE_SIZE,
    },
    openai: {
      key: process.env.OPENAI_API_KEY,
    },
    grok: {
      apiKey: process.env.GROK_API,
    },
    web: {
      domain: process.env.WEB_DOMAIN,
    },
    xapi: {
      consumer_key: process.env.XAPI_CONSUMER_KEY,
      consumer_secret: process.env.XAPI_CONSUMER_SECRET,
      access_token: process.env.XAPI_ACCESS_TOKEN,
      access_token_secret: process.env.XAPI_ACCESS_TOKEN_SECRET,
    },
  };
});
