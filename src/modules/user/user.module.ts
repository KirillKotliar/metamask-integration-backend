import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoginRecordEntity } from '../../database/entities/login-record.entity'
import { UserEntity } from '../../database/entities/user.entity'
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      LoginRecordEntity,
    ]),
  ],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {
}
