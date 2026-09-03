import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GetFacebookInformationDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  token: string;
}
