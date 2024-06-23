import { ApiProperty } from '@nestjs/swagger'

/**
 * @class ReponseData dùng để trả về dữ liệu cho client, là class chung cho toàn bộ dự án
 * @param statusCode: number - mã trạng thái của response
 * @param data: T | T[] - dữ liệu trả về cho client
 * @param message: string - thông điệp trả về cho client
 */
export interface IReponseData<T> {
  statusCode: number
  data: T | T[]
  message: string
}

export class ResponseData<T> {
  @ApiProperty()
  data?: T | T[]
  @ApiProperty()
  statusCode?: number
  @ApiProperty()
  message?: string

  constructor({ data, statusCode, message }: IReponseData<T>) {
    this.data = data
    this.statusCode = statusCode
    this.message = message
  }
}
