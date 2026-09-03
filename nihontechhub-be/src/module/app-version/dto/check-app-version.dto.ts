import { EOperatingSystem } from '@common/enums';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CheckAppVersionDto {
  @IsNotEmpty()
  @IsString()
  version: string;

  @IsNotEmpty()
  @IsEnum(EOperatingSystem)
  os: EOperatingSystem;
}
