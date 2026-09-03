import { ROLES_KEY } from '@common/decorators/role.decorator';
import { EAuthorRole } from '@common/enums';
import { BASE_SYSTEM_ERROR } from '@common/errors';
import { Admin } from '@module/admin/entities/admin.entities';
import { User } from '@module/user/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { UN_AUTHORIZATION, NOT_ENOUGH_PERMISSION } = BASE_SYSTEM_ERROR;

    const requiredRole = this.reflector.getAllAndOverride<
      Map<EAuthorRole, EAuthorRole>
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRole) return true; // Nếu không set role, cho phép qua

    const request = context.switchToHttp().getRequest();

    const author = request.user; // Giả sử middleware decode JWT và attach user vào request

    if (!author)
      throw new UnauthorizedException(UN_AUTHORIZATION.message, {
        description: UN_AUTHORIZATION.code,
      });

    if (requiredRole.has(EAuthorRole.ADMIN) && author instanceof Admin)
      return true;

    if (requiredRole.has(EAuthorRole.USER) && author instanceof User)
      return true;

    const { code, message } = NOT_ENOUGH_PERMISSION;

    throw new ForbiddenException(message, { description: code });
  }
}
