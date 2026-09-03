import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { RefreshToken } from '../entities/refresh-token.entity';

export class RenewRefreshTokenDTO extends PickType(RefreshToken, ['token']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  deviceId: string;
}
