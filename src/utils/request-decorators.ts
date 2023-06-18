import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayload } from '../modules/auth/auth.service'

export const AuthData = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.authData as TokenPayload
  },
)
