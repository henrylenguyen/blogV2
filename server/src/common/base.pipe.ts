import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseFile implements PipeTransform {
  transform(files: Express.Multer.File | Express.Multer.File[]): Express.Multer.File | Express.Multer.File[] {
    if (files === undefined || files === null) {
      throw new BadRequestException('File là bắt buộc')
    }

    if (Array.isArray(files) && files.length === 0) {
      throw new BadRequestException('File là bắt buộc')
    }

    return files
  }
}
