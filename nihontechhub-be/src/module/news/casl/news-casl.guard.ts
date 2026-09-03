import {} from '@casl/ability'; // Ensure this is the correct module for AddRule
import { CHECK_POLICIES_KEY } from '@common/casl/casl-ability.decorator';
import { execPolicyHandler, PolicyHandler } from '@common/casl/policies.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NewsCaslAbilityFactory } from './news-ability.factory';

@Injectable()
export class NewsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: NewsCaslAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const { user, route, params } = request;

    const ability = await this.caslAbilityFactory.createForNews(
      user,
      route,
      params,
    );

    const result = policyHandlers.every((handler) =>
      execPolicyHandler(handler, ability),
    );

    return result;
  }
}
