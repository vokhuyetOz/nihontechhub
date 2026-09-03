import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NewssourceController } from './newssource.controller';
import { NewssourceService } from './newssource.service';
import { Newssource } from './entities/newssource.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Newssource], 'mikro_orm_2')],
  controllers: [NewssourceController],
  providers: [NewssourceService],
  exports: [NewssourceService],
})
export class NewssourceModule {}
