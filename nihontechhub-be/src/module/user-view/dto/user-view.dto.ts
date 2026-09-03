import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserView } from '../entities/user-view.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserViewDTO extends PickType(UserView, ['deviceId']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  news: string;
}
