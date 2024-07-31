import { Injectable } from '@nestjs/common'
import { filetypemime } from 'magic-bytes.js'

@Injectable()
export class UploadService {
  constructor() {}
  async validateFileType(fileBuffer: Buffer, fileType: string): Promise<boolean> {
    // Lấy mime types từ buffer
    const mimeTypes = filetypemime(fileBuffer)
    console.log('mimeTypes:', mimeTypes)
    let validMimeTypes = []
    switch (fileType) {
      case 'image':
        validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/jpg']
        break
      case 'video':
        validMimeTypes = ['video/mp4', 'video/quicktime']
        break
      case 'audio':
        validMimeTypes = ['audio/mpeg', 'audio/wav']
        break
      case 'document':
        validMimeTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        break
      default:
        break
    }
    return mimeTypes.some((mime) => validMimeTypes.includes(mime))
  }
}
