import {
  Column, CreateDateColumn,
  Entity, Index, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('logins')
@Index(['userId', 'nonce'], { unique: true })
export class LoginRecordEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ name: 'user_id' })
    userId: string

  @Column({ name: 'nonce', type: 'integer' })
    nonce: number

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
    user: UserEntity
}
