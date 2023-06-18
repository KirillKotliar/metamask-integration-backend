import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(
  app: INestApplication,
) {
  const options = new DocumentBuilder()
    .setTitle('Metamask integration backend')
    .addServer('/')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/docs', app, document)
}
