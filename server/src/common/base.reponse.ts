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

export class ResponseData {
  data?: object | [] | boolean
  statusCode?: number
  message?: string

  constructor({ data, statusCode, message }: IReponseData<object | [] | boolean>) {
    this.data = data
    this.statusCode = statusCode
    this.message = message

    return this
  }
}
