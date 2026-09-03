import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { ERole } from 'src/common/enums';
import { User } from './user.entity';

export class UserSubscriber implements EventSubscriber<User> {
  // This method returns the entity name the subscriber is listening to.
  getSubscribedEntities(): EntityName<User>[] {
    return [User];
  }

  // This method is called before an entity is inserted.
  async beforeCreate(args: EventArgs<User>): Promise<void> {
    const obj = args.entity;
    if (obj.password) {
      obj.password = await bcrypt.hash(
        obj.password,
        parseInt(process.env.SALT_ROUNDS),
      );
    }
    if (!obj?.role) {
      obj.role = ERole.USER;
    }
    if (!obj?.active) {
      obj.active = false;
    }
  }
}
