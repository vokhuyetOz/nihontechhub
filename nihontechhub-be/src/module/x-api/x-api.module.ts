import { Module } from '@nestjs/common';
import { XApiService } from './x-api.service';

@Module({
  imports: [],
  controllers: [],
  providers: [XApiService],
  exports: [XApiService],
})
export class XApiModule {}
