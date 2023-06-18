import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { databaseConfig } from '../database/config'
import { EndpointsModule } from '../endpoints/endpoints.module'
import { AuthGuardModule } from '../middlewares/authGuard/auth.guard.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ScheduleModule.forRoot(),
    EndpointsModule,
    AuthGuardModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {}
