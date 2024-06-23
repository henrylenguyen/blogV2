import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import CarouselEntiy from 'src/modules/carousels/carousels.entities'
import { CarouselsModule } from 'src/modules/carousels/carousels.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để làm cho ConfigModule có thể truy cập toàn cục trong toàn bộ ứng dụng
      envFilePath: '.env' // Đường dẫn tới file .env, mặc định là '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'BlogV2',
      entities: [CarouselEntiy],
      synchronize: true
    }),
    CarouselsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
