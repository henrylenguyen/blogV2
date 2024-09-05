import { ApiProperty } from '@nestjs/swagger'
import { Expose, plainToClass } from 'class-transformer'
/**
 * Expose decorator được sử dụng để chỉ định các property mà bạn muốn expose (hiển thị) khi chuyển đổi từ class sang plain object
 */
export abstract class BaseDTO {
  @Expose()
  id: string
  @Expose()
  @ApiProperty({ example: 'name' })
  name: string
  @Expose()
  @ApiProperty({ example: 'description' })
  description: string
  @Expose()
  status: number
  @Expose()
  createdAt: Date
  @Expose()
  @ApiProperty({ example: 'admin' })
  createdBy: string
  @Expose()
  version?: number
  constructor() {
    this.id = null
    this.createdAt = new Date()
    this.createdBy = null
    this.version = null
  }
  static plainToClass<T>(this: new () => T, obj: Record<string, any>): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true })
  }
}

export abstract class BaseUpdateDTO extends BaseDTO {
  @Expose()
  updatedAt: Date
  @Expose()
  updatedBy: string
  constructor() {
    super()
    this.updatedAt = new Date()
    this.updatedBy = null
  }
}
export abstract class BaseDeleteDTO extends BaseDTO {
  @Expose()
  deletedAt: Date
  @Expose()
  deletedBy: string
  constructor() {
    super()
    this.deletedAt = new Date()
    this.deletedBy = null
  }
}

export abstract class BasePaginationDTO {
  @ApiProperty({ example: 1 })
  page: number
  @ApiProperty({ example: 10 })
  limit: number
  constructor() {
    this.page = 1
    this.limit = 10
  }
}
