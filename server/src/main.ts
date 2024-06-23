import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { configSwagger } from 'src/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)
  await app.listen(1812)
}
bootstrap()
