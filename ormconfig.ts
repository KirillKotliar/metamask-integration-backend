import { config } from 'dotenv'
import { join } from 'path'
import { DataSource } from 'typeorm'
config()

const SQLLITE_DATABASE_FILE = process.env.SQLLITE_DATABASE_FILE || 'db.sqlite'
export default new DataSource({
  type: 'sqlite',
  database: SQLLITE_DATABASE_FILE,
  logging: ['log', 'info', 'warn', 'error'],
  entities: [join(__dirname, 'src', '/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'src/database/migrations/*{.ts,.js}')],
})
