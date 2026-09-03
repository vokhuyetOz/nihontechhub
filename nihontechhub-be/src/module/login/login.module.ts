import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EntityRepository } from '@mikro-orm/core';
import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AppleTokenService } from '../socials-network/services/apple-token.service';
import { FacebookTokenService } from '../socials-network/services/facebook-token.service';
import { LineTokenService } from '../socials-network/services/line-token.service';
import { GoogleTokenService } from '@module/socials-network/services/google-token.service';

const modules = [MikroOrmModule.forFeature([]), ConfigModule, PassportModule];

const providerService = [
  LineTokenService,
  AppleTokenService,
  FacebookTokenService,
  GoogleTokenService,
];

@Module({
  imports: [
    ...modules,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('cfg.auth.secretOrKey'),
        signOptions: { expiresIn: config.get('cfg.auth.expiresIn') },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    ...providerService,
    EntityRepository,
    SqlEntityRepository,
  ],
  exports: [LoginService, ...providerService, PassportModule, JwtModule],
})
export class LoginModule {}
