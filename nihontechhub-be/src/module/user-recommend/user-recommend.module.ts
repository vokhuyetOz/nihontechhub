import { Module } from '@nestjs/common';
import { UserRecommendService } from './user-recommend.service';
import { UserRecommendController } from './user-recommend.controller';

@Module({
  imports: [],
  controllers: [UserRecommendController],
  providers: [UserRecommendService],
  exports: [UserRecommendService],
})
export class UserRecommendModule {}
