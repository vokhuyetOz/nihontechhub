import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import * as fse from 'fs-extra';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Public } from 'src/common/decorators';
import { StorageObjectDTO } from './dto/storage-object.dto';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  public async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const result = await this.uploadService.uploadFile(file, req.hostname);

    return result;
  }

  // Multipart
  @Public()
  @Post('chunk')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          const multipartTmpFolderName = process.env.MULTIPART_TMP_FOLDER;
          const fullPath = path.join(
            process.cwd(),
            `${multipartTmpFolderName}`,
          );

          if (!fse.existsSync(fullPath)) {
            fse.mkdirSync(fullPath);
          }

          cb(null, fullPath);
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
      limits: { fieldSize: 10000 * 1024 * 1024 },
    }),
  )
  public async uploadFileMultiPart(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: StorageObjectDTO,
    @Req() req: Request,
  ) {
    const host =
      process.env.ENABLE_HTTPS === 'true'
        ? 'https://'
        : 'http://' + req.headers.host;

    const result = await this.uploadService.saveFileMulter(host, file, data);

    return result;
  }
}
