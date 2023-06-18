import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class SignInReq {
  @ApiProperty({ example: 'hash' })
  @IsString()
    hash: string

  @ApiProperty({ example: 'signature' })
  @IsString()
    signature: string

  @ApiProperty({ example: Date.now() })
  @IsNumber()
    nonce: number
}

export class SignUpReq extends SignInReq {
  @ApiProperty({ example: 'username' })
  @IsString()
  @Length(3, 32)
    username: string
}

export class AuthTokenResponse {
  @ApiProperty()
    accessToken: string
  @ApiProperty()
    refreshToken: string
}

export class AuthTokenRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    token: string
}