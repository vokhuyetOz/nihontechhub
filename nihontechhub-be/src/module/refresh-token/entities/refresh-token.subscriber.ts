import { EventSubscriber, EventArgs } from '@mikro-orm/core';
import { RefreshToken } from './refresh-token.entity';

export class RefreshTokenSubscriber implements EventSubscriber<RefreshToken> {
  /**
   * Specify the entity this subscriber listens to.
   */
  listenTo() {
    return RefreshToken;
  }

  /**
   * Called before an entity is created.
   * @param args The event arguments.
   */
  async beforeCreate(args: EventArgs<RefreshToken>) {
    args;
  }

  /**
   * Called after an entity is created.
   * @param args The event arguments.
   */
  async afterCreate(args: EventArgs<RefreshToken>) {
    args;
  }

  /**
   * Called before an entity is updated.
   * @param args The event arguments.
   */
  async beforeUpdate(args: EventArgs<RefreshToken>) {
    args;
  }

  /**
   * Called after an entity is updated.
   * @param args The event arguments.
   */
  async afterUpdate(args: EventArgs<RefreshToken>) {
    args;
  }

  /**
   * Called before an entity is removed.
   * @param args The event arguments.
   */
  async beforeDelete(args: EventArgs<RefreshToken>) {
    args;
  }

  /**
   * Called after an entity is removed.
   * @param args The event arguments.
   */
  async afterDelete(args: EventArgs<RefreshToken>) {
    args;
  }
}
