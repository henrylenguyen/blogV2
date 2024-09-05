import { ApiProperty } from '@nestjs/swagger'
import httpStatus from 'src/common/base.enum'

/**
 * @class ReponseData dùng để trả về dữ liệu cho client, là class chung cho toàn bộ dự án
 * @param statusCode: number - mã trạng thái của response
 * @param data: T | T[] - dữ liệu trả về cho client
 * @param message: string - thông điệp trả về cho client
 */
export interface IResponseData<T> {
  statusCode: number
  data: T | T[]
  message: string
}
export interface IReponsePaginationData<T> extends IResponseData<T> {
  totalData?: number
  totalPage?: number
  pageIndex?: number
  dataIndex?: number
}

export class ResponseData<T> {
  @ApiProperty()
  data?: T | T[]
  @ApiProperty()
  statusCode?: number
  @ApiProperty()
  message?: string

  constructor({ data, statusCode, message }: IResponseData<T>) {
    this.data = data
    this.statusCode = statusCode
    this.message = message
  }
}

export class ResponsePaginationData<T> extends ResponseData<T> {
  @ApiProperty()
  totalData?: number
  @ApiProperty()
  totalPage?: number
  @ApiProperty()
  pageIndex?: number
  @ApiProperty()
  dataIndex?: number

  constructor({ data, statusCode, message, totalData, totalPage, pageIndex, dataIndex }: IReponsePaginationData<T>) {
    super({ data, statusCode, message })
    this.totalData = totalData
    this.totalPage = totalPage
    this.pageIndex = pageIndex
    this.dataIndex = dataIndex
  }
}

export function ResponseMessage({
  statusCode,
  message,
  data,
  DTO
}: {
  statusCode: number
  message: string
  data?: any
  DTO?: any
}): IResponseData<null | typeof DTO> {
  let responseData: IResponseData<null | typeof DTO>
  switch (statusCode) {
    case httpStatus.BAD_REQUEST:
      responseData = {
        data: null,
        statusCode: httpStatus.BAD_REQUEST,
        message: message
      }
      break
    case httpStatus.INTERNAL_SERVER_ERROR:
      responseData = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `INTERNAL_SERVER_ERROR - ${message}`
      }
      break
    default:
      responseData = {
        data,
        statusCode: httpStatus.SUCCESS,
        message: message
      }
      break
  }
  return responseData
}
