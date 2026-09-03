import { Action } from '@common/enums';
import { AppAbility, Subjects } from '@common/types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { BASE_SYSTEM_ERROR } from 'src/common/errors';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const execPolicyHandler = (
  handler: PolicyHandler,
  ability: AppAbility,
) => {
  if (typeof handler === 'function') {
    return handler(ability);
  }
  return handler.handle(ability);
};

@Injectable()
export class EntityPolicyHandler<T extends Action, E extends Subjects>
  implements IPolicyHandler
{
  action: T;
  entity: E;
  constructor(t: T, e: E) {
    this.action = t;
    this.entity = e;
  }
  handle(ability: AppAbility): boolean {
    const result =
      ability.can(this.action, this.entity) ||
      ability.can(Action.Manage, 'all');

    if (!result) {
      const { message, code } = BASE_SYSTEM_ERROR.NOT_ENOUGH_PERMISSION;
      throw new ForbiddenException(message, { description: code });
    }
    return result;
  }
}
