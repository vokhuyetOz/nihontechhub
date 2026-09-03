import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/common/decorators';
import { DownloadService } from './download.service';

@ApiTags('Download')
@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Public()
  @Get('local/:filePath')
  public getFileLocal(
    @Res() res: Response,
    @Param('filePath') filePath: string,
  ) {
    return this.downloadService.getFromLocal(res, filePath);
  }
}
