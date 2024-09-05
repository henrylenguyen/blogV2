import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AllExceptionsFilter } from 'src/common/base-log.decorator'
import { AppDataSource } from 'src/data-source'
import { CarouselsModule } from 'src/modules/carousels/carousels.module'
import { SharepointModule } from 'src/modules/sharepoint/sharepoint.module'
import { TelegramModule } from 'src/modules/telegram/telegram.module'
import { UploadModule } from 'src/modules/upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để làm cho ConfigModule có thể truy cập toàn cục trong toàn bộ ứng dụng
      envFilePath: '.env' // Đường dẫn tới file .env, mặc định là '.env'
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    CarouselsModule,
    UploadModule,
    TelegramModule,
    SharepointModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER, // Đăng ký AllExceptionsFilter để xử lý tất cả các ngoại lệ trong ứng dụng
      useClass: AllExceptionsFilter // Sử dụng AllExceptionsFilter để xử lý tất cả các ngoại lệ trong ứng dụng
    }
  ]
})
export class AppModule {}
