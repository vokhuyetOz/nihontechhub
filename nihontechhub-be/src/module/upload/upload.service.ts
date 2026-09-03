import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import * as fse from 'fs-extra';
import { MinioService } from 'nestjs-minio-client';
import * as path from 'path';
import { StorageObjectDTO } from './dto/storage-object.dto';

const imageTypes = [
  'jpeg',
  'png',
  'jpg',
  'svg',
  'webp',
  'avif',
  'gif',
  'bmp',
  'ico',
  'tiff',
];
const videoTypes = ['mp4', 'mov', 'avi', 'flv', 'mkv', 'webm', 'wmv'];

@Injectable()
export class UploadService {
  constructor(
    private readonly minioClient: MinioService,
    private readonly configService: ConfigService,
  ) {}
  bucket = {
    IMAGES: 'images',
    VIDEOS: 'videos',
    OTHERS: 'others',
  };

  async uploadToBucket(
    bucketName: string,
    fileName: string,
    file: Express.Multer.File,
  ) {
    await this.minioClient.client.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.size,
      {
        'content-type': file.mimetype,
      },
    );
  }

  async uploadFile(file: Express.Multer.File, host: string) {
    const type = path.extname(file.originalname).split('.').pop();
    const hash = createHash('sha256').update(file.buffer).digest('hex');
    const fullFileName = `${hash}.${type}`;

    let destBucket = this.bucket.OTHERS;

    if (imageTypes.includes(type)) {
      destBucket = this.bucket.IMAGES;
    }

    if (videoTypes.includes(type)) {
      destBucket = this.bucket.VIDEOS;
    }

    await this.uploadToBucket(destBucket, fullFileName, file);

    const url = `${
      this.configService.get('cfg.app.enableHttps') ? 'https' : 'http'
    }://${host}:${this.configService.get(
      'cfg.minio.port',
    )}/${destBucket}/${encodeURI(fullFileName)}`;

    const res = {
      filename: fullFileName,
      urlFile: `/${destBucket}/${encodeURI(fullFileName)}`,
      url,
    };

    return res;
  }

  async saveFileMulter(
    host: string,
    file: Express.Multer.File,
    data: StorageObjectDTO,
  ) {
    let isMerged = false;
    let mergedFileURL = '';

    const fileNameRaw = data.fileId;
    const fileTypeRaw = data.fileType;

    const rootFolder = path.join(
      process.cwd(),
      `${process.env.FILE_TMP_FOLDER}`,
    );
    const folderName = `${fileNameRaw}`;
    const finalFolderPath = `${rootFolder}/${folderName}`;
    const outputFilePath = `${finalFolderPath}/${fileNameRaw}`;

    if (fse.existsSync(outputFilePath)) {
      fse.unlinkSync(file.path);
      const res = {
        isMerged: true,
        mergedFileURL:
          `${host}/download/local/` +
          encodeURIComponent(`tmp/${folderName}/${fileNameRaw}`),
      };
      return res;
    }

    if (!fse.existsSync(rootFolder)) {
      fse.mkdirSync(rootFolder);
    }

    // check folder is exist or not
    // if folder is not exist => make new folder
    if (!fse.existsSync(finalFolderPath)) {
      fse.mkdirSync(finalFolderPath, { recursive: true });
    }

    // format chunk index (add pad)
    const pad = '0000000000';
    const str = '' + data.chunkIndex;
    const chunkFormatted = pad.substring(0, pad.length - str.length) + str;
    const fileName = `${data.fileId}_${chunkFormatted}`;

    // check file is already exists in folder or not
    if (fse.existsSync(`${finalFolderPath}/${fileName}`)) {
      fse.unlinkSync(file.path);
      return `${finalFolderPath}/${fileName}`;
    }

    fse.moveSync(file.path, path.join(finalFolderPath, fileName), {
      dereference: true,
      overwrite: true,
    });

    fse.appendFileSync(
      `${finalFolderPath}/uploadDetails.txt`,
      parseInt(data.chunkIndex.toString()) +
        `${data.endFile.toString() == 'true' ? '-true' : '-false'}` +
        '\n',
    );

    const indexArray = [];
    const isEndFile = [];

    fse
      .readFileSync(`${finalFolderPath}/uploadDetails.txt`, 'utf-8')
      .split(/\r?\n/)
      .forEach((a) => {
        if (a) {
          const arr = a.split('-');
          indexArray.push(parseInt(arr[0]));
          isEndFile.push(arr[1]);
        }
      });

    if (
      isEndFile.some((a) => a == 'true') &&
      indexArray.length - 1 == Math.max(...indexArray)
    ) {
      isMerged = true;
      mergedFileURL =
        `${host}/download/local/` +
        encodeURIComponent(`tmp/${folderName}/${fileNameRaw}`);

      await this.mergeChunkedFile(fileNameRaw);
    }

    const result = {
      chunkIndex: parseInt(data.chunkIndex.toString()),
      fileId: fileName,
      fileType: fileTypeRaw,
      endFile: data.endFile.toString() === 'true',
      isMerged, // boolean
      mergedFileURL,
    };

    // chunk uploaded response
    return result;
  }

  async mergeChunkedFile(fileId: string) {
    const rootFolder = path.join(
      process.cwd(),
      `${process.env.FILE_TMP_FOLDER}`,
    );

    if (!fse.existsSync(rootFolder)) {
      fse.mkdirSync(rootFolder);
    }

    const folderName = `${fileId}`;
    const finalFolderPath = `${rootFolder}/${folderName}`;

    // check folder is exist or not
    if (!fse.existsSync(finalFolderPath)) {
      throw new Error("Folder doesn't exist.");
    }

    fse.unlinkSync(`${finalFolderPath}/uploadDetails.txt`);

    const outputFilePath = `${finalFolderPath}/${fileId}`;
    const fileArray = fse.readdirSync(finalFolderPath);
    const bufferArr = [];

    fileArray.forEach((file) => {
      const currentFileBuffer = fse.readFileSync(`${finalFolderPath}/${file}`);
      fse.unlinkSync(`${finalFolderPath}/${file}`);
      bufferArr.push(currentFileBuffer);
    });

    const bufferConcat = Buffer.concat(bufferArr);
    fse.writeFileSync(outputFilePath, bufferConcat);
  }
}
