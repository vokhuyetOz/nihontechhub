// import { BaseParamIdDto } from '@Common/dto/base-param-id.dto';
// import { PoliciesGuard } from '@Modules/casl/guards/policies.guard';
// import { CurrentAuthor } from '@Modules/user/decorators/user.decorator';
// import { User } from '@Modules/user/entities/user.entity';
// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Param,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { RechargeGooglePayDto } from './dto/recharge-gg-pay.dto';
// import { GooglePayService } from './gg-pay.service';

// @ApiTags('Google-pay')
// @Controller({
//   version: '1',
//   path: 'google-pay',
// })
// export class GooglePayController {
//   constructor(private readonly service: GooglePayService) {}

//   @ApiBearerAuth()
//   @ApiOperation({
//     summary: 'Recharge with google pay',
//   })
//   @UseGuards(PoliciesGuard)
//   @Post('recharge')
//   @HttpCode(HttpStatus.CREATED)
//   async detailsProductPurchase(
//     @CurrentAuthor() user: User,
//     @Body() body: RechargeGooglePayDto,
//   ) {
//     return this.service.rechargeWithGooglePay(
//       body.product_id,
//       body.purchase_token,
//       user,
//     );
//   }

//   @ApiBearerAuth()
//   @UseGuards(PoliciesGuard)
//   @ApiOperation({
//     summary: 'Get details product in apple play',
//   })
//   @Post('product/:id')
//   @HttpCode(HttpStatus.CREATED)
//   async getDetailsProduct(@Param() param: BaseParamIdDto) {
//     const { id } = param;
//     return this.service.getDetailsProduct(id);
//   }
// }
