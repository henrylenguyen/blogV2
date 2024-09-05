// joi-validation.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    // Nếu value không phải là một object, ném lỗi BadRequestException
    if (typeof value !== 'object' || value === null) {
      throw new BadRequestException('Validation failed: Value must be an object')
    }

    const { error } = this.schema.validate(value, { abortEarly: false }) // validate tất cả các lỗi
    if (error) {
      throw new BadRequestException('Validation failed: ' + error.details.map((err) => err.message).join(', '))
    }
    return value
  }
}
