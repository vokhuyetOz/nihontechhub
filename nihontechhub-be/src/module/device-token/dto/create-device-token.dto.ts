import { PickType } from '@nestjs/swagger';
import { DeviceToken } from 'src/module/device-token/entities/device-token.entity';
export class CreateDeviceTokenDTO extends PickType(DeviceToken, [
  'authorId',
  'token',
  'deviceId',
  'os',
  'authorRole',
  'language',
]) {}
