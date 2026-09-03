import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entities';
import { EAdminRole } from '../constants/admin.enum';

export class AdminSubscriber implements EventSubscriber<Admin> {
  // This method returns the entity name the subscriber is listening to.
  getSubscribedEntities(): EntityName<Admin>[] {
    return [Admin];
  }

  // This method is called before an entity is inserted.
  async beforeCreate(args: EventArgs<Admin>): Promise<void> {
    const obj = args.entity;
    if (obj.password) {
      obj.password = await bcrypt.hash(
        obj.password,
        parseInt(process.env.SALT_ROUNDS),
      );
    }
    if (!obj?.role) {
      obj.role = EAdminRole.ADMIN;
    }
    if (!obj?.active) {
      obj.active = false;
    }
  }

  async beforeUpdate(args: EventArgs<Admin>): Promise<void> {
    const obj = args.entity;
    if (obj.password) {
      obj.password = await bcrypt.hash(
        obj.password,
        parseInt(process.env.SALT_ROUNDS),
      );
    }
  }
}
