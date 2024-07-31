import { Body, Controller, Post } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TelegramService } from 'src/modules/telegram/telegram.service'

@Controller('telegram')
export default class TelegramController {
  private chatId: string
  constructor(
    private readonly telegramService: TelegramService,
    private configService: ConfigService
  ) {
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID')
  }
  @Post('/send-message')
  async sendMessageToTelegram(@Body() data: { message: string }) {
    if (data) {
      const { message } = data
      try {
        const res = await this.telegramService.sendMessage(this.chatId, message)
        console.log('res:', res)
      } catch (error) {
        console.log('error:', error)
      }
    }
  }
}
