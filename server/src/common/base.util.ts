import { InternalServerErrorException, UnsupportedMediaTypeException } from '@nestjs/common'

// Hàm fileMimetypeFilter với kiểm tra MIME type
export function fileMimetypeFilter(...mimetypes: string[]) {
  return async (req, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    console.log('file:', file)
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      // Nếu là hình ảnh, kiểm tra chi tiết hơn với checkImageFile
      try {
        callback(null, true)
      } catch (error) {
        console.log('error:', error)
        // Xử lý lỗi từ checkImageFile
        callback(new InternalServerErrorException('Lỗi khi kiểm tra hình ảnh'), false)
      }
    } else {
      // Nếu không phải là hình ảnh, từ chối file
      callback(new UnsupportedMediaTypeException(`Định dạng file không đúng: ${mimetypes.join(', ')}`), false)
    }
  }
}
