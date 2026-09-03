import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { CreateDeviceTokenDTO } from 'src/module/device-token/dto/create-device-token.dto';

export class FacebookRegisterDTO extends CreateDeviceTokenDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  facebookUserId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  token: string;
}
