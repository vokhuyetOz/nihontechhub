import { EventSubscriber, EntityName } from '@mikro-orm/core';
import { VerifyAccount } from './verify-account.entity';

export class VerifyAccountSubscriber implements EventSubscriber<VerifyAccount> {
  getSubscribedEntities(): EntityName<VerifyAccount>[] {
    return [VerifyAccount];
  }
}
