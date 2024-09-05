import { Controller, Post, Res, UploadedFile, UploadedFiles } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import * as fs from 'fs'
import { ApiFiles, ApiImageFile } from 'src/common/base-api.decorator'
import httpStatus from 'src/common/base.enum'
import { ParseFile } from 'src/common/base.pipe'
import { IResponseData, ResponseData } from 'src/common/base.reponse'
import { fileMimetypeFilter } from 'src/common/base.util'
import { UploadService } from 'src/modules/upload/upload.service'

@Controller('upload')
export class UploadController {
  private chatId: string
  constructor(
    private readonly uploadService: UploadService,
    private configService: ConfigService
    // private readonly telegramService: TelegramService
  ) {
    // this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID')
  }

  @Post('/image')
  @ApiImageFile('file', true)
  async uploadImageFile(@UploadedFile(ParseFile) file: Express.Multer.File, @Res() res: Response) {
    try {
      const fileBuffer = fs.readFileSync(file.path)
      const isValid = await this.uploadService.validateFileType(fileBuffer, 'image')

      if (!isValid) {
        //  Xóa file không hợp lệ
        fs.unlinkSync(file.path)
        const reponse: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: 'INVALID_IMAGE_FILE_TYPE'
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(reponse))
      }
    } catch (error) {
      // Xóa file khi có lỗi
      fs.unlinkSync(file.path)
      throw new Error('INTERNAL_SERVER_ERROR')
    }
    const reponse: IResponseData<null> = {
      data: null,
      statusCode: httpStatus.SUCCESS,
      message: 'IMAGE_UPLOADED_SUCCESSFULLY'
    }
    res.status(httpStatus.SUCCESS).json(new ResponseData(reponse))
  }

  // @Post('images')
  @ApiFiles('files', true, 10, { fileFilter: fileMimetypeFilter('image') })
  async uploadMultipleFiles(@UploadedFiles(ParseFile) files: Express.Multer.File[], @Res() res: Response) {
    console.log('files:', files)
  }
}
