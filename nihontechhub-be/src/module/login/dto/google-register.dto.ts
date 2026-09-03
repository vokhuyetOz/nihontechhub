import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GoogleRegisterDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  deviceId: string;
}
