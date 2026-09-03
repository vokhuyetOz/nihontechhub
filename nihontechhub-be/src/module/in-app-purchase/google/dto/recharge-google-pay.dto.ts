import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class RechargeGooglePayDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  product_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  purchase_token: string;
}
