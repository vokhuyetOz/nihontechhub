import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserViewController } from './user-view.controller';
import { UserView } from './entities/user-view.entity';
import { UserViewService } from './user-view.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserView], 'mikro_orm_2')],
  controllers: [UserViewController],
  providers: [UserViewService],
  exports: [UserViewService],
})
export class UserViewModule {}
