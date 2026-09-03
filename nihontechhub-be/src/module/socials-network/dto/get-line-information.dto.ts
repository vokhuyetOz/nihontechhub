import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GetLineInformationDTO {
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
