import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class BaseIdDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;
}
