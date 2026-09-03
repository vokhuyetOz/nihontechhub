import { IntersectionType, PickType, OmitType } from '@nestjs/swagger';
import { CreateDeviceTokenDTO } from 'src/module/device-token/dto/create-device-token.dto';
import { User } from 'src/module/user/entities/user.entity';

export class LoginWithEmailPasswordDTO extends IntersectionType(
  PickType(User, ['email', 'password', 'provider']),
  OmitType(CreateDeviceTokenDTO, ['authorId']),
) {}
