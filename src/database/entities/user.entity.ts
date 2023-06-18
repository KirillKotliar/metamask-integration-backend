import {
  Column,
  CreateDateColumn,
  Entity,
  Index, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { LoginRecordEntity } from './login-record.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Index({ unique: true })
  @Column({ name: 'username' })
    username?: string

  @Index({ unique: true })
  @Column({ name: 'address' })
    ethAddress: string

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

  @OneToMany(() => LoginRecordEntity, (record) => record)
    loginRecords: LoginRecordEntity[]
}
