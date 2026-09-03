import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { errorMessage } from '../../../common/errors/error-message';
import { AdminCreateUserDTO } from './admin-create-user.dto';

export class CreateManyUserDTO {
  @ApiProperty({ type: AdminCreateUserDTO, isArray: true })
  @ValidateNested({
    each: true,
    message: errorMessage.dto.invalidDTOArrayElement,
  })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => AdminCreateUserDTO)
  users: AdminCreateUserDTO[];
}
