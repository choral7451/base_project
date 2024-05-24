import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { USER_TYPE } from '@/user/entity/user.entity';
import { Auths } from '@/common/decorator/rest-api';

@Injectable()
export class JwtAuthAndRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const auths = this.reflector.get(Auths, context.getHandler());

    if (!auths) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.type === USER_TYPE.ADMIN) return true;
    if (auths) {
      if (auths.includes(user.type)) return true;
    }

    throw new Error();
  }
}
