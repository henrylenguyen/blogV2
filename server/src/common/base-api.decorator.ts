import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { fileMimetypeFilter } from 'src/common/base.util'

export type UploadFields = MulterField & { required?: boolean }

export function ApiFile(fieldName: string = 'file', required: boolean = false, localOptions?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    })
  )
}

export function ApiFiles(
  fieldName: string = 'files',
  required: boolean = false,
  maxCount: number = 10,
  localOptions?: MulterOptions
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    })
  )
}

export function ApiFileFields(uploadFields: UploadFields[], localOptions?: MulterOptions) {
  const bodyProperties: Record<string, SchemaObject | ReferenceObject> = Object.assign(
    {},
    ...uploadFields.map((field) => {
      return { [field.name]: { type: 'string', format: 'binary' } }
    })
  )
  const apiBody = ApiBody({
    schema: {
      type: 'object',
      properties: bodyProperties,
      required: uploadFields.filter((f) => f.required).map((f) => f.name)
    }
  })

  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor(uploadFields, localOptions)),
    ApiConsumes('multipart/form-data'),
    apiBody
  )
}

export function ApiImageFile(fileName: string = 'image', required: boolean = false) {
  return ApiFile(fileName, required, {
    storage: diskStorage({
      destination: './uploads', // Đường dẫn lưu file tạm thời
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname))
      }
    }),
    fileFilter: fileMimetypeFilter('image')
  })
}

export function ApiVideoFile(fileName: string = 'video', required: boolean = false) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('video')
  })
}

export function ApiPdfFile(fileName: string = 'document', required: boolean = false) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('pdf')
  })
}
