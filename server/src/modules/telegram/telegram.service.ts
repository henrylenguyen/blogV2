import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'
import { SendMessageOptions } from 'node-telegram-bot-api'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api')

@Injectable()
export class TelegramService {
  private bot: any

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN')
    this.bot = new TelegramBot(token, { polling: true })
  }
  onModuleInit() {
    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(msg.chat.id, 'Xin chào! Gõ /getid để lấy ID của kênh.')
    })
    this.bot.onText(/\/getid/, (msg) => {
      console.log('msg:', msg)
      const chatId = msg.chat.id
      this.getChannelId(chatId)
        .then((channelInfo) => {
          this.bot.sendMessage(chatId, `ID của kênh này là: ${channelInfo.id}`)
        })
        .catch((err) => {
          this.bot.sendMessage(chatId, `Không thể lấy ID của kênh: ${err.message}`)
        })
      console.log(this.bot.getChat(chatId))
    })
  }
  private async getChannelId(chatId: number): Promise<any> {
    try {
      const chat = await this.bot.getChat(chatId.toString())
      return chat
    } catch (error) {
      throw new Error('Không thể lấy thông tin của kênh.')
    }
  }
  async sendImageToTelegram(chatId: string, filePath: string): Promise<any> {
    return this.bot.sendPhoto(chatId, fs.createReadStream(filePath))
  }
  async sendMessage(chatId: string, message: string, options?: SendMessageOptions): Promise<void> {
    return await this.bot.sendMessage(chatId, message, options)
  }
}
