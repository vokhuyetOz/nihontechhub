import {
  Controller,
  // Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRecommendService } from './user-recommend.service';
// import { Public } from '@common/decorators';

@ApiTags('user-recommend')
@Controller({
  version: '1',
  path: 'user-recommend',
})
export class UserRecommendController {
  constructor(private readonly service: UserRecommendService) {}

  // @Public()
  // @Post()
  // async test() {
  //   return this.service.dailyPushContentBased();
  // }
  // @Public()
  // @Post('x')
  // async x() {
  //   return this.service.dailyCreateXPost();
  // }
}
