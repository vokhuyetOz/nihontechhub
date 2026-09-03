import { EAdminRole } from '@common/enums';
import { BASE_SYSTEM_ERROR } from '@common/errors';
import { Admin } from '@module/admin/entities/admin.entities';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_ROLES_KEY } from '../decorator/admin-role.decorator';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { UN_AUTHORIZATION, NOT_ENOUGH_PERMISSION } = BASE_SYSTEM_ERROR;

    const requiredRole = this.reflector.getAllAndOverride<
      Map<EAdminRole, EAdminRole>
    >(ADMIN_ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRole) return true; // Nếu không set role, cho phép qua

    const request = context.switchToHttp().getRequest();

    const author: Admin = request.user; // Giả sử middleware decode JWT và attach user vào request

    if (!author)
      throw new UnauthorizedException(UN_AUTHORIZATION.message, {
        description: UN_AUTHORIZATION.code,
      });

    if (requiredRole.has(EAdminRole.ADMIN) && author.role === EAdminRole.ADMIN)
      return true;

    if (
      requiredRole.has(EAdminRole.SUPER_ADMIN) &&
      author.role === EAdminRole.SUPER_ADMIN
    )
      return true;

    const { code, message } = NOT_ENOUGH_PERMISSION;

    throw new ForbiddenException(message, { description: code });
  }
}
