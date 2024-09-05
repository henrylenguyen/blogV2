import { ArgumentsHost, Catch, ExceptionFilter, Logger, UseFilters } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import httpStatus from 'src/common/base.enum'
import { IResponseData, ResponseData } from 'src/common/base.reponse'
import { TelegramService } from 'src/modules/telegram/telegram.service'
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly chatId: string
  private readonly logger = new Logger(AllExceptionsFilter.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly telegramService: TelegramService
  ) {
    this.chatId = this.configService.get<string>('TELEGRAM_LOG_ID')
  }

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus ? exception.getStatus() : 500

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || exception.name,
      error: exception.response || exception.message || exception.name
    }

    const reponse: IResponseData<null> = {
      data: null,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message || exception.name
    }

    // Gửi thông báo lỗi tới Telegram
    await this.sendErrorToTelegram(errorResponse)

    response.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(reponse))
  }

  private async sendErrorToTelegram(errorResponse: any) {
    const errorContent =
      typeof errorResponse.error === 'object' ? JSON.stringify(errorResponse.error, null, 2) : errorResponse.error

    const message = `
    *Error Occurred:*
    \n*Status Code:* ${errorResponse.statusCode}
    \n*Message:* ${errorResponse.message}
    \n*Path:* ${errorResponse.path}
    \n*Method:* ${errorResponse.method}
    \n*Timestamp:* ${errorResponse.timestamp}
    \n*Error:*
    \n\`\`\`json
    ${errorContent}
    \`\`\`
    `

    try {
      await this.telegramService.sendMessage(this.chatId, message, { parse_mode: 'Markdown' })
    } catch (error) {
      this.logger.error('Failed to send error message to Telegram', error)
    }
  }
}
export function HandleErrors() {
  return UseFilters(AllExceptionsFilter)
}
