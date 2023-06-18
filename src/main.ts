import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import * as express from 'express'
import { setupSwagger } from './swagger'
import { PORT } from './config'
import { ApplicationModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { loggerService } from './utils/log-utils'

async function bootstrap() {
  const server = express()
  server.disable('x-powered-by')

  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
    new ExpressAdapter(server),
    {
      cors: { origin: ['*'], credentials: true },
    },
  )
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  setupSwagger(app)
  await app.listen(PORT)
}

bootstrap().catch((err) => {
  loggerService.error(err, err?.stack ,'Bootstrap')
  process.exit(1)
})
