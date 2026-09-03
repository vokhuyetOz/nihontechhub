import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from '../refresh-token/entities/refresh-token.entity';
import { ResetPassword } from '../reset-password/entities/reset-password.entity';
import { VerifyAccount } from '../verify-account/entities/verify-account.entity';
import { RegisterController } from './register.controller';
import { RegisterControllerV2 } from './register.controller-v2';
import { RegisterService } from './register.service';

const registerValidateClasses = [];
const modules = [
  MikroOrmModule.forFeature([
    RefreshToken,
    ResetPassword,
    VerifyAccount,
    // HttpModule,
  ]),
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
  controllers: [RegisterController, RegisterControllerV2],
  providers: [RegisterService, ...registerValidateClasses],
  exports: [RegisterService],
})
export class RegisterModule {}
