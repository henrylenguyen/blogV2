import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để làm cho ConfigModule có thể truy cập toàn cục trong toàn bộ ứng dụng
      envFilePath: '.env' // Đường dẫn tới file .env, mặc định là '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
