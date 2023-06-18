import { join } from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { entities } from './entities'
import { SQLLITE_DATABASE_FILE } from '../config'


export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: SQLLITE_DATABASE_FILE,
  entities,
  migrations: [join(__dirname, './migrations', '/*{.ts,.js}')],
  migrationsRun: true,
}
