import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthTokenRequest, AuthTokenResponse, SignInReq, SignUpReq } from './dto/auth.dto'
import { AuthService } from '../modules/auth/auth.service'
import { UserService } from '../modules/user/user.service'

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Sign-up through siwe' })
  @ApiResponse({ type: AuthTokenResponse })
  async signUp(@Body() body: SignUpReq) {
    const address = await this.authService.verifySiweHashMessage(body.hash, body.signature, body.nonce)
    const existedUser = await this.userService.getUserByAddress(address)
    if (existedUser) {
      throw new HttpException('User already exists', 400)
    }
    const existedSameUsername = await this.userService.getUserByUsername(body.username)
    if (existedSameUsername) {
      throw new HttpException('Username already exists', 400)
    }
    const user = await this.userService.createUser({ ethAddress: address, username: body.username })
    await this.userService.createLoginRecord({ userId: user.id, nonce: body.nonce })
    return this.authService.getAuthTokens(user)
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign-in through siwe' })
  @ApiResponse({ type: AuthTokenResponse })
  async signIn(@Body() body: SignInReq) {
    const address = await this.authService.verifySiweHashMessage(body.hash, body.signature, body.nonce)
    const user = await this.userService.getUserByAddress(address)
    if (!user) {
      throw new HttpException('User not exists', 404)
    }
    const existedLoginRecord = await this.userService.getLoginRecordByUserIdAndNonce(user.id, body.nonce)
    if (existedLoginRecord) {
      throw new HttpException('Nonce was already used', 403)
    }
    await this.userService.createLoginRecord({ userId: user.id, nonce: body.nonce })
    return this.authService.getAuthTokens(user)
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh auth tokens with refreshToken' })
  @ApiResponse({ type: AuthTokenResponse })
  async refreshAuthTokens(@Body() body: AuthTokenRequest) {
    const tokenData = await this.authService.verifyAuthToken(body.token, 'refresh')
    const { userId } = tokenData
    const user = await this.userService.getUserById(userId)
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const { accessToken, refreshToken } = this.authService.getAuthTokens(user)

    return {
      accessToken,
      refreshToken,
    }
  }
  @Post('/verify')
  @ApiOperation({ summary: 'Verify access token' })
  @ApiResponse({ type: AuthTokenResponse })
  async verifyAccessToken(@Body() body: AuthTokenRequest) {
    const tokenData = await this.authService.verifyAuthToken(body.token, 'access')
    const { userId } = tokenData
    const user = await this.userService.getUserById(userId)
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const { accessToken, refreshToken } = this.authService.getAuthTokens(user)

    return {
      accessToken,
      refreshToken,
    }
  }
}