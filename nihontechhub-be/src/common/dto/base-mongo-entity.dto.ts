import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDateEntityDTO } from './base-date-entity.dto';
import { BaseVersionDTO } from './base-version.dto';

export class BaseMongoEntityDTO extends IntersectionType(
  BaseDateEntityDTO,
  BaseVersionDTO,
) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  _id: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;
}
