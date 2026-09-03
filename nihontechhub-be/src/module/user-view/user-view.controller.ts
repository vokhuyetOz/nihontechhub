import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserViewDTO } from './dto/user-view.dto';
import { UserViewService } from './user-view.service';
import { Public } from '@common/decorators';

@ApiTags('user-view')
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'user-view',
})
export class UserViewController {
  constructor(private readonly service: UserViewService) {}

  @Public()
  @Post()
  async view(@Body() body: UserViewDTO) {
    return this.service.view(body);
  }
}
