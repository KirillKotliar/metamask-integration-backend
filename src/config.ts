import { config } from 'dotenv'
import { Env } from '@wavesenterprise/env-extractor'
import { resolve as pathResolve } from 'path'
import { readFileSync } from 'fs'

config()
export const PORT = Env.number('PORT').default(3038).get()
export const LOGIN_NONCE_VALID_TIME = Env.number('LOGIN_NONCE_VALID_TIME').default(60 * 1000).get()

const RSA_PRIVATE_FILE_PATH = pathResolve(
  __dirname,
  '..',
  Env.string('RSA_PRIVATE_FILE_PATH').default('./keys/jwtRS256.key').get(),
)
const RSA_PUBLIC_FILE_PATH = pathResolve(
  __dirname,
  '..',
  Env.string('RSA_PUBLIC_FILE_PATH').default('./keys/jwtRS256.key.pub').get(),
)

export const AUTH_PUBLIC_KEY = Env.string('AUTH_PUBLIC_KEY').default(readFileSync(RSA_PUBLIC_FILE_PATH).toString()).get()
export const AUTH_PRIVATE_KEY = Env.string('AUTH_PRIVATE_KEY').default(readFileSync(RSA_PRIVATE_FILE_PATH).toString()).get()

export const ACCESS_TOKEN_DURATION = Env.number('ACCESS_TOKEN_DURATION').default(5 * 60 * 1000).get()
export const REFRESH_TOKEN_DURATION = Env.number('REFRESH_TOKEN_DURATION').default(86400 * 1000).get()

export const SQLLITE_DATABASE_FILE = Env.string('SQLLITE_DATABASE_FILE').default('db.sqlite').get()
