import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CheckAppVersionDto } from './dto/check-app-version.dto';
import { AppVersionService } from './app-version.service';
import { Public } from '@common/decorators';

@ApiTags('AppVersion')
@Controller({
  version: '1',
  path: 'app-version',
})
export class AppVersionController {
  constructor(private service: AppVersionService) {}

  @Public()
  @Post('/check')
  check(@Body() dto: CheckAppVersionDto) {
    return this.service.check(dto);
  }
}
