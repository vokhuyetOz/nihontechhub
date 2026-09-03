import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class RechargeApplePayDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  transaction_id: string;
}
