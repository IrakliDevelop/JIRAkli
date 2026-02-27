import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { PublicUser } from '@jirakli/shared';

export const CurrentUser = createParamDecorator(
  (data: keyof PublicUser | undefined, ctx: ExecutionContext): PublicUser | unknown => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as PublicUser;
    return data ? user?.[data] : user;
  },
);
