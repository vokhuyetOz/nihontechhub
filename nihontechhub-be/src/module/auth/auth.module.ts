import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CheckRoleIsNotAdmin } from '../../common/validator-constraints/check-role-create-user.contraint';
import { RefreshToken } from '../refresh-token/entities/refresh-token.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const modules = [MikroOrmModule.forFeature([RefreshToken])];

const authValidateClass = [CheckRoleIsNotAdmin];

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
  controllers: [AuthController],
  providers: [AuthService, SqlEntityRepository, ...authValidateClass],
  exports: [AuthService, JwtModule, ...authValidateClass],
})
export class AuthModule {}
