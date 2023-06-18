import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginRecordEntity } from '../../database/entities/login-record.entity'
import { UserEntity } from '../../database/entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LoginRecordEntity)
    private readonly loginRecordRepository: Repository<LoginRecordEntity>,
  ) {}
  getUserByAddress(ethAddress: string) {
    return this.userRepository.findOne({
      where: { ethAddress },
    })
  }
  getUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    })
  }
  getUserById(id: string) {
    return this.userRepository.findOne({
      where: { id },
    })
  }
  createUser(user: Partial<UserEntity>) {
    return this.userRepository.save(user)
  }

  createLoginRecord(loginRecord: Partial<LoginRecordEntity>) {
    return this.loginRecordRepository.save(loginRecord)
  }

  getLoginRecordByUserIdAndNonce(userId: string, nonce: number) {
    return this.loginRecordRepository.findOneBy({ userId, nonce })
  }
}
