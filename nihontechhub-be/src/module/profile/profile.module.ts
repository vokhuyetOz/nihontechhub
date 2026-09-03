import { SqlEntityRepository } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { IsPhoneNumberValid } from '@common/validator-constraints/checkPhoneNumber.contraint';

@Module({
  imports: [MikroOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService, SqlEntityRepository, IsPhoneNumberValid],
  exports: [ProfileService, IsPhoneNumberValid],
})
export class ProfileModule {}
