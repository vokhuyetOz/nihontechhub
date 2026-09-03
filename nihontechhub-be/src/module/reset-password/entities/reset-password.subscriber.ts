import { EventSubscriber, EntityName } from '@mikro-orm/core';
import { ResetPassword } from './reset-password.entity';

export class ResetPasswordSubscriber implements EventSubscriber<ResetPassword> {
  getSubscribedEntities(): EntityName<ResetPassword>[] {
    return [ResetPassword];
  }
}
