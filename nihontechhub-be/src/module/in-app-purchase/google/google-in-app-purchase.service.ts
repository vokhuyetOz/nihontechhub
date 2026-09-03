// import {
//   ETypeCharge,
//   ETypeDesciptionPayment,
//   StatusPayment,
// } from '@Common/enum';
// import { ErrorMessage } from '@Common/error-message';
// import { ExchangeCoinManagementService } from '@Modules/exchange-coins-management/exchange-coins-management.service';
// import { User } from '@Modules/user/entities/user.entity';
// import { BadRequestException, Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { InjectRepository } from '@nestjs/typeorm';
// import { androidpublisher_v3, Auth, google } from 'googleapis';
// import * as path from 'path';
// import { Repository } from 'typeorm';
// import { Transactional } from 'typeorm-transactional';
// import { PaymentHistory } from '../payment-history/entities/payment-history.entity';
// import { PaymentHistoryService } from '../payment-history/payment-history.service';

// @Injectable()
// export class GooglePayService {
//   private readonly google: Auth.OAuth2Client;
//   private readonly androidPublisher: androidpublisher_v3.Androidpublisher;
//   private keyFile = path.join(
//     __dirname,
//     '../../../../',
//     'google-applicantion-credentials.json',
//   );
//   private readonly packageName = process.env.GOOGLE_PACKAGE_NAME;
//   constructor(
//     @InjectRepository(PaymentHistory)
//     protected repository: Repository<PaymentHistory>,
//     private readonly exchangeCoinManagementService: ExchangeCoinManagementService,
//     private readonly eventEmitter: EventEmitter2,
//     private readonly paymentHistoryService: PaymentHistoryService,
//   ) {
//     this.google = new google.auth.JWT({
//       keyFile: this.keyFile,
//       scopes: ['https://www.googleapis.com/auth/androidpublisher'],
//     });
//     this.androidPublisher = google.androidpublisher({
//       version: 'v3',
//       auth: this.google,
//     });
//   }

//   @Transactional()
//   async rechargeWithGooglePay(
//     productId: string,
//     purchaseToken: string,
//     user: User,
//   ) {
//     const isAlreadyImplement = await this.repository
//       .createQueryBuilder()
//       .setLock('pessimistic_write') // Lock the row to avoid race conditions
//       .where(
//         'purchase_token = :purchase_token AND product_id = :product_id AND payment_type = :payment_type',
//         {
//           product_id: productId,
//           purchase_token: purchaseToken,
//           payment_type: ETypeCharge.GOOGLE_PAY,
//         },
//       )
//       .getOne();

//     if (isAlreadyImplement) {
//       throw new BadRequestException(
//         ErrorMessage.ExchangeCoin.TransactionAlreadyImplementBefore,
//       );
//     }
//     const resPurchases = await this.androidPublisher.purchases.products.get({
//       packageName: this.packageName,
//       productId,
//       token: purchaseToken,
//     });
//     const purchasesDetails: androidpublisher_v3.Schema$ProductPurchase =
//       resPurchases?.data;
//     if (!resPurchases || purchasesDetails.purchaseState !== 0) {
//       throw new BadRequestException(
//         ErrorMessage.Payment.paymentFailedPleaseTryAgain,
//       );
//     }

//     const dtoPaymentHistory: Partial<PaymentHistory> = {
//       product_id: productId,
//       purchase_token: purchaseToken,
//       status: StatusPayment.FAILED,
//       user_id: user.id,
//       payment_type: ETypeCharge.GOOGLE_PAY,
//     };
//     const exchangeCoin =
//       await this.exchangeCoinManagementService.findOneByManyField({
//         code: productId,
//         payment_type: ETypeCharge.GOOGLE_PAY,
//       });
//     if (!exchangeCoin) {
//       await this.paymentHistoryService.createOne(dtoPaymentHistory);
//       throw new BadRequestException(
//         ErrorMessage.Payment.notFoundMstExchangeCoin,
//       );
//     }

//     this.eventEmitter.emitAsync('recharge', {
//       coin: exchangeCoin.received_coin,
//       code: user.id,
//       key: 'user_id',
//       description: ETypeDesciptionPayment.RECHARGE_COIN,
//     });

//     await this.paymentHistoryService.createOne({
//       ...dtoPaymentHistory,
//       product_id: exchangeCoin.code,
//       received_coin: exchangeCoin.received_coin,
//       status: StatusPayment.SUCCESSFUL,
//       payment_data: JSON.stringify(purchasesDetails),
//     });
//   }

//   async getDetailsProduct(productId: string) {
//     try {
//       const response = await this.androidPublisher.inappproducts.get({
//         packageName: this.packageName,
//         sku: productId,
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Error acknowledging product purchase:', error);
//       throw new Error('Failed to acknowledge product purchase');
//     }
//   }
// }
