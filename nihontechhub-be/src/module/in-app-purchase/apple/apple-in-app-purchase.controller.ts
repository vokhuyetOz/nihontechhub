// import { PoliciesGuard } from '@Modules/casl/guards/policies.guard';
// import { CurrentAuthor } from '@Modules/user/decorators/user.decorator';
// import { User } from '@Modules/user/entities/user.entity';
// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { ApplePayService } from './apple-pay.service';
// import { RechargeApplePayDto } from './dto/recharge-apple-pay.dto';

// @ApiTags('Apple-pay')
// @Controller({
//   version: '1',
//   path: 'apple-pay',
// })
// export class ApplePayController {
//   constructor(private readonly service: ApplePayService) {}

//   @ApiBearerAuth()
//   @UseGuards(PoliciesGuard)
//   @ApiOperation({
//     summary: 'Recharge with apple pay',
//   })
//   @Post('recharge')
//   @HttpCode(HttpStatus.CREATED)
//   async detailsProductPurchase(
//     @CurrentAuthor() user: User,
//     @Body() body: RechargeApplePayDto,
//   ) {
//     return this.service.getTransactionDetails(body.transaction_id, user);
//   }
// }
