import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import 'newrelic'
import { configSwagger } from 'src/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)
  await app.listen(1812)
  // Tạo 500 bản ghi fake
  // const carouselsService = app.get(CarouselsService)
  // for (let i = 1; i <= 500; i++) {
  //   await carouselsService.createCarousels({
  //     createdBy: 'admin',
  //     name: 'name',
  //     description: 'description',
  //     imageUrl: `https://images.unsplash.com/${i % 100 || 100}` // Sử dụng modulo để lặp lại từ 1-100
  //   })
  // }
}
bootstrap()
