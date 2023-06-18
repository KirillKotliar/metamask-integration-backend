import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { TokenPayload } from '../modules/auth/auth.service'
import { UserService } from '../modules/user/user.service'
import { AuthData } from '../utils/request-decorators'
import { Protected } from '../middlewares/authGuard/auth.guard'

@Controller()
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}


  @Get('/profile')
  @Protected()
  @ApiOperation({ summary: 'Get my profile' })
  getProfile(@AuthData() authData: TokenPayload) {
    return this.userService.getUserById(authData.userId)
  }
}