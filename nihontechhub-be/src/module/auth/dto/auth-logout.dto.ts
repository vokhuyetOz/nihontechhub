import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
export class LogOutDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  device_id: string;
}
