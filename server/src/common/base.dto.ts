import { ApiProperty } from '@nestjs/swagger'
import { Expose, plainToClass } from 'class-transformer'
/**
 * Expose decorator được sử dụng để chỉ định các property mà bạn muốn expose (hiển thị) khi chuyển đổi từ class sang plain object
 */
export abstract class BaseDTO {
  @Expose()
  id: string
  @Expose()
  createdAt: Date
  @Expose()
  @ApiProperty()
  createdBy: string
  @Expose({ groups: ['update'] })
  updatedAt: Date
  @Expose({ groups: ['update'] })
  updatedBy?: string
  @Expose({ groups: ['delete'] })
  deletedAt?: Date
  @Expose({ groups: ['delete'] })
  deletedBy?: string
  @Expose()
  isArchived?: boolean
  @Expose()
  version?: number
  constructor() {
    this.id = null
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.deletedAt = new Date()
    this.createdBy = null
    this.updatedBy = null
    this.deletedBy = null
    this.isArchived = false
    this.version = null
  }
  static plainToClass<T>(this: new () => T, obj: Record<string, any>): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true })
  }
}
