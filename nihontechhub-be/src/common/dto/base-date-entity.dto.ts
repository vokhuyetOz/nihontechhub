import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseDateEntityDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  deletedAt?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  createdAt: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  updatedAt: string;
}
