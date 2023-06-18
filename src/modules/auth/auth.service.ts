/* eslint-disable max-len */
import { HttpException, Injectable } from '@nestjs/common'
import { Jwt, JwtPayload, sign, verify } from 'jsonwebtoken'
import { UserEntity } from '../../database/entities/user.entity'
import {
  ACCESS_TOKEN_DURATION,
  AUTH_PRIVATE_KEY,
  AUTH_PUBLIC_KEY,
  LOGIN_NONCE_VALID_TIME,
  REFRESH_TOKEN_DURATION,
} from '../../config'
import { SiweMessage } from 'siwe'

export type TokenPayload = {
  purpose: 'access' | 'refresh',
  userId: string,
}

export type JWTPayload = Omit<Jwt, 'payload'> & { payload: JwtPayload } & {
  payload: TokenPayload,
}

@Injectable()
export class AuthService {
  verifyAuthToken(token: string, purpose: 'access' | 'refresh') {
    let decrypted: JWTPayload

    try {
      decrypted = verify(
        token,
        AUTH_PUBLIC_KEY,
        {
          complete: true,
          algorithms: ['RS256'],
          ignoreExpiration: true,
        },
      ) as JWTPayload
    } catch (e) {
      throw new HttpException('Invalid token', 403)
    }

    const payload = decrypted.payload

    if (!payload || payload.exp === undefined || payload.exp * 1000 <= Date.now()) {
      throw new HttpException('Authorization token expired', 403)
    }
    if (payload.purpose !== purpose) {
      throw new HttpException('Invalid token purpose', 400)
    }
    return payload
  }

  getAuthTokens(user: UserEntity) {
    const accessToken = this.sign({
      purpose: 'access',
      userId: user.id,
    }, ACCESS_TOKEN_DURATION)

    const refreshToken = this.sign({
      purpose: 'refresh',
      userId: user.id,
    }, REFRESH_TOKEN_DURATION)

    return {
      accessToken,
      refreshToken,
    }
  }

  async verifySiweHashMessage(hash: string, signature: string, tsNonce: number) {
    if (tsNonce > Date.now() || tsNonce + LOGIN_NONCE_VALID_TIME < Date.now()) {
      throw new HttpException('Invalid tsNonce', 400)
    }
    try {
      const siweObject = new SiweMessage(hash)
      const { data: { address } } = await siweObject.verify({ signature, nonce: tsNonce.toString() })
      return address
    } catch (e) {
      throw new HttpException('Invalid siwe hash-signature pair', 401)
    }
  }

  private sign(data: string | Buffer | object, expiresIn: number) {
    return sign(data, AUTH_PRIVATE_KEY, {
      expiresIn,
      algorithm: 'RS256',
    })
  }
}
