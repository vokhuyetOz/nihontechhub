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
// import {
//   AppStoreServerAPI,
//   Environment,
//   JWSTransactionDecodedPayload,
//   TransactionInfoResponse,
//   decodeTransaction,
// } from 'app-store-server-api';
// import * as fs from 'fs';
// import { PaymentHistory } from '../payment-history/entities/payment-history.entity';
// import { PaymentHistoryService } from '../payment-history/payment-history.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Transactional } from 'typeorm-transactional';

// @Injectable()
// export class ApplePayService {
//   private readonly KEY_APPLE = fs.readFileSync(
//     `${process.env.KEY_APPLE_FILE_P8}`,
//     'utf-8',
//   );
//   private readonly appleApi: AppStoreServerAPI;
//   constructor(
//     @InjectRepository(PaymentHistory)
//     protected repository: Repository<PaymentHistory>,
//     private readonly exchangeCoinManagementService: ExchangeCoinManagementService,
//     private readonly eventEmitter: EventEmitter2,
//     private readonly paymentHistoryService: PaymentHistoryService,
//   ) {
//     this.appleApi = new AppStoreServerAPI(
//       this.KEY_APPLE,
//       process.env.KEY_ID,
//       process.env.ISSUER_ID,
//       process.env.APP_BUNDLE_ID,
//       Environment.Sandbox,
//     );
//   }

//   @Transactional()
//   async getTransactionDetails(transactionId: string, user: User) {
//     try {
//       const isAlreadyImplement = await this.repository
//         .createQueryBuilder()
//         .setLock('pessimistic_write') // Lock the row to avoid race conditions
//         .where(
//           'purchase_token = :purchase_token AND payment_type = :payment_type',
//           {
//             purchase_token: transactionId,
//             payment_type: ETypeCharge.APPLE_PAY,
//           },
//         )
//         .getOne();

//       if (isAlreadyImplement) {
//         throw new BadRequestException(
//           ErrorMessage.ExchangeCoin.TransactionAlreadyImplementBefore,
//         );
//       }
//       const response: TransactionInfoResponse =
//         await this.appleApi.getTransactionInfo(transactionId);
//       const details: JWSTransactionDecodedPayload = await decodeTransaction(
//         response.signedTransactionInfo,
//       );
//       if (!details) {
//         throw new BadRequestException(
//           ErrorMessage.Payment.paymentFailedPleaseTryAgain,
//         );
//       }
//       const dtoPaymentHistory: Partial<PaymentHistory> = {
//         status: StatusPayment.FAILED,
//         user_id: user.id,
//         payment_type: ETypeCharge.APPLE_PAY,
//       };
//       const exchangeCoin =
//         await this.exchangeCoinManagementService.findOneByManyField({
//           code: details.productId,
//           payment_type: ETypeCharge.APPLE_PAY,
//         });
//       if (!exchangeCoin) {
//         await this.paymentHistoryService.createOne(dtoPaymentHistory);
//         throw new BadRequestException(
//           ErrorMessage.Payment.notFoundMstExchangeCoin,
//         );
//       }

//       this.eventEmitter.emitAsync('recharge', {
//         coin: exchangeCoin.received_coin,
//         code: user.id,
//         key: 'user_id',
//         description: ETypeDesciptionPayment.RECHARGE_COIN,
//       });

//       await this.paymentHistoryService.createOne({
//         ...dtoPaymentHistory,
//         product_id: exchangeCoin.code,
//         purchase_token: transactionId,
//         received_coin: exchangeCoin.received_coin,
//         status: StatusPayment.SUCCESSFUL,
//         payment_data: JSON.stringify(details),
//       });
//       return details;
//     } catch (e) {
//       throw new BadRequestException(e);
//     }
//   }
// }
