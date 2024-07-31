import { Module } from '@nestjs/common'
import TelegramController from 'src/modules/telegram/telegram.controlller'
import { TelegramService } from 'src/modules/telegram/telegram.service'
@Module({
  imports: [],
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService]
})
export class TelegramModule {}
