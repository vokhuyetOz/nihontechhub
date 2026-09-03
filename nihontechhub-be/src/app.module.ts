import { AuthRoleGuard } from '@common/guard/role.guard';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ClassSerializerInterceptor,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { Agenda } from 'agenda';

import { ManagementAdminModule } from '@module/admin-management/management-admin/management-admin.module';
import { NewsModule } from '@module/news/news.module';
import { CountModule } from '@module/count/count.module';
import { ProfileModule } from '@module/profile/profile.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './common/config/configuration';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { JwtStrategy } from './common/guard/jwt.strategy';
import { RequestMiddleware } from './common/middleware/logger.middleware';
import { AdminLoginModule } from './module/admin-management/admin-login/admin-login.module';
import { AdminManageUserModule } from './module/admin-management/manage-user/admin-manage-user.module';
import { AdminModule } from './module/admin/admin.module';
import { AgendaModule } from './module/agenda/agenda.module';
import { AuthModule } from './module/auth/auth.module';
import { DeviceTokenModule } from './module/device-token/device-token.module';
import { DownloadModule } from './module/download/download.module';
import { LoginModule } from './module/login/login.module';
import { NotificationReadStatusModule } from './module/notification-read-status/notification-read-status.module';
import { PushNotificationModule } from './module/push-notification/push-notification.module';
import { RefreshTokenModule } from './module/refresh-token/refresh-token.module';
import { RegisterModule } from './module/register/register.module';
import { ResetPasswordModule } from './module/reset-password/reset-password.module';
import { UploadModule } from './module/upload/upload.module';
import { UserModule } from './module/user/user.module';
import { VerifyAccountModule } from './module/verify-account/verify-account.module';
import { CrawlModule } from '@module/crawl/crawl.module';
import { NewssourceModule } from '@module/newssource/newssource.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SitemapModule } from '@module/sitemap/sitemap.module';
import { EventModule } from '@module/event/event.module';
import { HighlightModule } from '@module/highlight/highlight.module';
import { NewsStatisticsModule } from '@module/news-statistics/news-statistics.module';
import { UserViewModule } from '@module/user-view/user-view.module';
import { UserRecommendModule } from '@module/user-recommend/user-recommend.module';
import { XApiModule } from '@module/x-api/x-api.module';
import { AppVersionModule } from '@module/app-version/app-version.module';

const adminModule = [
  ManagementAdminModule,
  AdminModule,
  AdminLoginModule,
  AdminManageUserModule,
];

const modules = [
  ...adminModule,
  UserModule,
  AuthModule,
  UploadModule,
  DownloadModule,
  RefreshTokenModule,
  ResetPasswordModule,
  VerifyAccountModule,
  LoginModule,
  AgendaModule,
  RegisterModule,
  PushNotificationModule,
  NotificationReadStatusModule,
  DeviceTokenModule,
  NewsModule,
  CountModule,
  ProfileModule,
  CrawlModule,
  NewssourceModule,
  SitemapModule,
  EventModule,
  HighlightModule,
  NewsStatisticsModule,
  UserViewModule,
  UserRecommendModule,
  XApiModule,
  AppVersionModule,
  // LokiModule,
  // ...queueModule,
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('cfg.db.mikro_mysql');
      },
    }),
    MikroOrmModule.forRootAsync({
      contextName: 'mikro_orm_2',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('cfg.db.mikro_mongo');
      },
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    // BullModule.forRoot({
    //   connection: {
    //     host: process.env.REDIS_HOST,
    //     port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    //     password: process.env.REDIS_PASSWORD,
    //   },
    //   defaultJobOptions: {
    //     removeOnComplete: 1000,
    //     removeOnFail: 5000,
    //     attempts: 3,
    //   },
    // }),
    PassportModule,
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthRoleGuard,
    },
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      inject: [Reflector],
      useFactory: (reflector: Reflector) => {
        return new ClassSerializerInterceptor(reflector, {
          enableImplicitConversion: true,
        });
      },
    },
    {
      provide: 'AGENDA',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const configAgenda = config.get('cfg.db.agenda');
        const agenda = new Agenda(configAgenda);
        agenda.start();
        return agenda;
      },
    },
  ],
  exports: [...modules, PassportModule, 'AGENDA'],
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    const schemaGenerator = this.orm.getSchemaGenerator();
    // Automatically create or update the database schema
    await schemaGenerator.updateSchema(); // Alternatively use createSchema(), dropSchema(), or refreshDatabase()
    // await this.orm.close();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
