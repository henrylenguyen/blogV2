import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TelegramModule } from 'src/modules/telegram/telegram.module'
import { UploadController } from 'src/modules/upload/upload.controller'
import { UploadService } from 'src/modules/upload/upload.service'

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    }),
    TelegramModule
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
