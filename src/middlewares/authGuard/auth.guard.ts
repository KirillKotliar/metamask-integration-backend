import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from '../../modules/auth/auth.service'

export const Protected = () => {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata('protected', true),
  )
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {
  }

  canActivate(context: ExecutionContext) {
    const protection = this.reflector.get<boolean | undefined>('protected', context.getHandler())

    if (!protection) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization || request.headers.Authorization
    const authQueryParam = request.query.authorization


    if (authHeader === undefined && authQueryParam === undefined) {
      throw new UnauthorizedException('No authorization header')
    }

    if (!authQueryParam && !authHeader.includes('Bearer')) {
      throw new UnauthorizedException('Invalid authorization header, no bearer prefix')
    }

    const token: string = authQueryParam ? authQueryParam : authHeader.replace('Bearer ', '')
    const payload = this.authService.verifyAuthToken(token, 'access')

    request.authData = payload

    return true
  }
}
