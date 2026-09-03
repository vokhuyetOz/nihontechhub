import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { EAuthorRole } from '../enums';

export class BaseAuthorRoleDTO {
  @ApiProperty({ example: EAuthorRole.USER })
  @IsEnum(EAuthorRole)
  @IsNotEmpty()
  @IsDefined()
  authorRole: EAuthorRole;
}
