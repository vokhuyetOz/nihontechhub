import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EOperatingSystem } from '../enums';

export class BaseLoginDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  device_id: string;

  @ApiProperty({ example: EOperatingSystem.ANDROID })
  @IsEnum(EOperatingSystem)
  @IsNotEmpty()
  @IsOptional()
  os: EOperatingSystem;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  device_token: string;
}
