import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class BaseVersionDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  version?: string;
}
