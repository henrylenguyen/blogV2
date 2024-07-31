import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SharepointService } from './sharepoint.service'
import { SharepointController } from './sharepoint.controller'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './uploads' // Thư mục lưu trữ file upload
    })
  ],
  providers: [SharepointService],
  controllers: [SharepointController]
})
export class SharepointModule {}
