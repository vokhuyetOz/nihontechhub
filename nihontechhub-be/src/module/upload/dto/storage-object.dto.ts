import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNumberString } from 'class-validator';

export class StorageObjectDTO {
  @ApiProperty({ type: 'string', format: 'string', required: false })
  @IsNumberString()
  chunkIndex?: number;

  // @ApiProperty({ type: 'string', format: 'string', required: false })
  // @IsNumberString()
  // chunkSize?: number;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  fileId?: string;

  @ApiProperty({ type: 'string', format: 'string', required: false })
  fileType?: string;

  @ApiProperty({ type: 'boolean', format: 'string', required: false })
  @IsBooleanString()
  endFile?: boolean;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: Express.Multer.File;
}
