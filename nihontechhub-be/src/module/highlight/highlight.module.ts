import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { HighlightController } from './highlight.controller';
import { HighlightService } from './highlight.service';
import { Highlight } from './entities/highlight.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Highlight], 'mikro_orm_2')],
  controllers: [HighlightController],
  providers: [HighlightService],
  exports: [HighlightService],
})
export class HighlightModule {}
