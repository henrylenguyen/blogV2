import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { memoryStorage } from 'multer'
import { fileMimetypeFilter } from 'src/common/base.util'

export type UploadFields = MulterField & { required?: boolean }
interface AdditionalProperties {
  [key: string]: {
    type: string
    required?: boolean
    example?: string
  }
}

export function ApiFile(
  fieldName: string = 'file',
  required: boolean = false,
  localOptions?: MulterOptions,
  additionalProperties?: { [key: string]: { type: string; required?: boolean; example?: string } }
) {
  const properties: Record<string, any> = {
    [fieldName]: {
      type: 'string',
      format: 'binary'
    }
  }

  const requiredFields: string[] = []

  if (required) {
    requiredFields.push(fieldName)
  }

  if (additionalProperties) {
    for (const [key, value] of Object.entries(additionalProperties)) {
      properties[key] = { ...value }
      if (value.required) {
        requiredFields.push(key)
      }
    }
  }

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: memoryStorage(), // Sử dụng RAM để lưu trữ file tạm thời
        ...localOptions
      })
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: requiredFields.length ? requiredFields : undefined,
        properties
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

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
  additionalProperties?: AdditionalProperties
) {
  return ApiFile(
    fileName,
    required,
    {
      storage: memoryStorage(), // Sử dụng RAM để lưu trữ file tạm thời
      fileFilter: fileMimetypeFilter('image')
    },
    additionalProperties
  )
}

export function ApiVideoFile(
  fileName: string = 'video',
  required: boolean = false,
  additionalProperties?: AdditionalProperties
) {
  return ApiFile(
    fileName,
    required,
    {
      storage: memoryStorage(), // Sử dụng RAM để lưu trữ file tạm thời
      fileFilter: fileMimetypeFilter('video')
    },
    additionalProperties
  )
}

export function ApiPdfFile(
  fileName: string = 'document',
  required: boolean = false,
  additionalProperties?: AdditionalProperties
) {
  return ApiFile(
    fileName,
    required,
    {
      storage: memoryStorage(), // Sử dụng RAM để lưu trữ file tạm thời
      fileFilter: fileMimetypeFilter('pdf')
    },
    additionalProperties
  )
}
