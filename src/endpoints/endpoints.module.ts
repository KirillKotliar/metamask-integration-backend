import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthModule } from '../modules/auth/auth.module'
import { UserModule } from '../modules/user/user.module'
import { UserController } from './user.controller'

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
  exports: [],
  controllers: [AuthController, UserController],
})

export class EndpointsModule {}
