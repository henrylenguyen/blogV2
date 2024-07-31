import { BaseEntity, FindOptionsWhere } from 'typeorm'

/**
 * BaseInterfaceRepository<T> là một interface generic, nó định nghĩa các phương thức cơ bản mà một repository cần phải implement
 * @param T Đây là một generic type, nó biểu diễn cho một model/interface
 * @method findAll() Lấy tất cả các bản ghi
 * @method findById(id) Lấy một bản ghi theo id
 * @method find(condition) Lấy tất cả các bản ghi theo điều kiện
 * @method findAndCount(condition) Lấy tất cả các bản ghi theo điều kiện và đếm số lượng bản ghi
 * @method findByIdAndCheckDeleted(id) Kiểm tra xem một bản ghi có bị xóa không
 * @method softDelete(id) Xóa mềm một bản ghi
 * @method recoverDelete(id) Khôi phục một bản ghi đã bị xóa
 * @method delete(id) Xóa vĩnh viễn một bản ghi
 * @method create(data) Tạo một bản ghi mới
 * @method BulkCreate(data) Tạo nhiều bản ghi mới
 * @method paginate(page, limit) Phân trang
 * @method update(id, data) Cập nhật một bản ghi
 * @method exists(field, value) Kiểm tra xem một bản ghi có tồn tại không
 */

//   Partial<T> là một built-in type trong TypeScript, nó giúp bạn tạo ra một type mới từ type đã có, nhưng tất cả các property của type mới đều là optional
//   @example
//   Ví dụ:
//   type User = {
//    id: number
//    name: string
//    age: number
//   }
//   type PartialUser = Partial<User>

//   Kết quả:
//   type PartialUser = {
//    id?: number
//    name?: string
//   age?: number
//  }

export interface BaseInterfaceRepository<T> {
  findAll(): Promise<T[]>
  findById(id: number | string): Promise<T | undefined>
  find(condition: FindOptionsWhere<BaseEntity>): Promise<T[]>
  findAndCount(condition: FindOptionsWhere<BaseEntity>): Promise<[T[], number]>
  softDelete(id: number | string): Promise<boolean>
  recoverDelete(id: number | string): Promise<boolean>
  delete(id: number | string): Promise<boolean>
  create(data: T): Promise<T>
  BulkCreate(data: T[]): Promise<T[]>
  paginate(
    page: number,
    limit: number
  ): Promise<{ totalData: number; totalPage: number; pageIndex: number; dataIndex: number; data: T[] }>
  update(id: number | string, data: Partial<T>): Promise<T | undefined>
  exists(field: keyof T, value: any): Promise<boolean>
}
