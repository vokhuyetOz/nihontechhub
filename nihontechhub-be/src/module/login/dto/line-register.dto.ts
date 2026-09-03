import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { CreateDeviceTokenDTO } from 'src/module/device-token/dto/create-device-token.dto';

export class LineRegisterDTO extends CreateDeviceTokenDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  id_token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  client_id: string;
}
