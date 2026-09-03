import { IntersectionType } from '@nestjs/swagger';
import { BaseDateEntityDTO } from './base-date-entity.dto';
import { BaseIdDTO } from './base-id.dto';
import { BaseVersionDTO } from './base-version.dto';

export class BaseMySqlEntityDTO extends IntersectionType(
  BaseDateEntityDTO,
  BaseIdDTO,
  BaseVersionDTO,
) {}
