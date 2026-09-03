import { Public } from '@common/decorators';
import { RandomHelper } from '@common/helper';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  appInfo() {
    return this.appService.appInfo();
  }

  @Public()
  @Post('generator-password')
  generatorPassword() {
    return RandomHelper.generateRandomStringWithSpecialChar(64);
  }
}
