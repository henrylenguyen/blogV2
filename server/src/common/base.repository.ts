import { InjectRepository } from '@nestjs/typeorm'
import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  IsNull,
  Not,
  ObjectLiteral,
  Repository
} from 'typeorm'

export class BaseRepository<T extends BaseEntity, R extends Repository<T>> {
  constructor(
    @InjectRepository(Repository<T>)
    protected readonly repository: R
  ) {}

  /**
   *
   * @returns trả về tất cả dữ liệu trong bảng
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm findAll để lấy tất cả người dùng
   * userRepository.findAll()
   *  .then(users => {
   *  // users là một mảng chứa tất cả người dùng
   *  console.log(users);
   * })
   * .catch(error => {
   *  // Xử lý lỗi nếu có
   *  console.error(error);
   * });
   * ```
   */
  async findAll(): Promise<T[]> {
    return this.repository.find()
  }

  /**
   *
   * @param id là id của dữ liệu cần tìm
   * @returns trả về dữ liệu tìm được theo id
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm findById với id của người dùng
   * userRepository.findById(1)
   *  .then(user => {
   *  // user là một đối tượng chứa thông tin của người dùng có id là 1
   *  console.log(user);
   * })
   * .catch(error => {
   *  // Xử lý lỗi nếu có
   *  console.error(error);
   * });
   * ```
   */
  async findById(id: number | string): Promise<T | undefined> {
    return this.repository.findOne({
      where: {
        id
      } as FindOptionsWhere<BaseEntity>
    })
  }

  /**
   *
   * @param condition là điều kiện tìm kiếm
   * @returns trả về mảng dữ liệu tìm được theo điều kiện
   * @example
   * ```
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm find với điều kiện là tên người dùng
   * userRepository.find({ name: 'John Doe' })
   *   .then(users => {
   *    // users là một mảng chứa tất cả các người dùng có tên là 'John Doe'
   *    console.log(users);
   *  })
   *    .catch(error => {
   *      // Xử lý lỗi nếu có
   *    console.error(error);
   *  });
   * ```
   */
  async find(condition: FindOptionsWhere<BaseEntity>): Promise<T[]> {
    return this.repository.find({
      where: condition
    })
  }

  /**
   *
   * @param condition là điều kiện tìm kiếm
   * @returns trả về mảng dữ liệu tìm được theo điều kiện và số lượng dữ liệu tìm được
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm findAndCount với điều kiện là tên người dùng
   * userRepository.findAndCount({ name: 'John Doe' })
   *  .then(([users, count]) => {
   *  // users là một mảng chứa tất cả các người dùng có tên là 'John Doe'
   *  // count là số lượng người dùng có tên là 'John Doe'
   *  console.log(users, count);
   * })
   * .catch(error => {
   *  // Xử lý lỗi nếu có
   *  console.error(error);
   * });
   * ```
   */
  async findAndCount(condition: FindOptionsWhere<BaseEntity>): Promise<[T[], number]> {
    return this.repository.findAndCount({
      where: condition
    })
  }
  /**
   * Soft delete là dạng xóa mềm, dữ liệu vẫn còn trong database nhưng không hiển thị ra ngoài, nó chỉ cập nhật lại trường deletedAt
   * @param id là id của dữ liệu cần xóa
   *
   */
  async softDelete(id: number | string): Promise<boolean> {
    const result: DeleteResult = await this.repository.softDelete(id)
    return result.affected > 0
  }

  /**
   * Phương thức khôi phục dữ liệu đã bị xóa mềm.
   *
   * @param id - ID của đối tượng cần khôi phục.
   * @returns Một Promise chứa kết quả của việc khôi phục.
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm recoverDelete với id của người dùng
   * userRepository.recoverDelete(1)
   *  .then(isRecovered => {
   *    // isRecovered là true nếu khôi phục thành công, ngược lại là false
   *    console.log(isRecovered);
   * })
   *  .catch(error => {
   *    // Xử lý lỗi nếu có
   *    console.error(error);
   * });
   * ```
   */
  async recoverDelete(id: number | string): Promise<boolean> {
    // Khôi phục dữ liệu đã bị xóa mềm
    const result = await this.repository.restore(id)
    // Kiểm tra xem việc khôi phục có thành công hay không
    return result.affected === 1
  }

  /**
   *
   * @param id là id của dữ liệu cần xóa
   * @returns trả về true nếu xóa thành công, ngược lại trả về false
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm delete với id của người dùng
   * userRepository.delete(1)
   *  .then(isDeleted => {
   *  // isDeleted là true nếu xóa thành công, ngược lại là false
   *  console.log(isDeleted);
   * })
   * .catch(error => {
   *  // Xử lý lỗi nếu có
   *  console.error(error);
   * });
   * ```
   */
  async delete(id: number | string): Promise<boolean> {
    const isDeleted = await this.repository.delete(id)
    return isDeleted.affected > 0
  }

  /**
   *
   * @param condition là điều kiện xóa
   * @returns trả về true nếu xóa thành công, ngược lại trả về false
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm deleteByCondition với điều kiện là tên người dùng
   * userRepository.deleteByCondition({ name: 'John Doe' })
   *  .then(isDeleted => {
   *  // isDeleted là true nếu xóa thành công, ngược lại là false
   *  console.log(isDeleted);
   * })
   * .catch(error => {
   *  // Xử lý lỗi nếu có
   *  console.error(error);
   * });
   * ```
   */

  async deleteByCondition(field: keyof T, value: any): Promise<boolean> {
    const result = this.exists(field, value)
    if (result) {
      await this.repository.delete({ [field]: value } as FindOptionsWhere<T>)
      return true
    }
  }
  /**
   *
   * @param data là dữ liệu cần tạo
   * @returns trả về dữ liệu sau khi tạo
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm create với dữ liệu cần tạo
   * userRepository.create({ name: 'John Doe', email: 'example@gmail.com' })
   *  .then(user => {
   *    // user là một đối tượng chứa thông tin của người dùng sau khi tạo
   *    console.log(user);
   *  })
   *  .catch(error => {
   *    // Xử lý lỗi nếu có
   *    console.error(error);
   *  });
   * ```
   */
  async create(data: T): Promise<T> {
    return this.repository.save(data)
  }
  async BulkCreate(data: T[]): Promise<T[]> {
    return this.repository.save(data)
  }
  /**
   *
   * @param page là số trang cần phân trang
   * @param limit là số lượng phần tử trên mỗi trang
   * @returns trả về một object chứa thông tin phân trang
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   * name: string;
   * email: string;
   * // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm paginate với số trang là 1 và số lượng phần tử trên mỗi trang là 10
   * userRepository.paginate(1, 10)
   * .then(result => {
   * // result là một object chứa thông tin phân trang
   * console.log(result);
   * })
   * .catch(error => {
   * // Xử lý lỗi nếu có
   * console.error(error);
   * });
   */
  async paginate(
    page: number,
    limit: number
  ): Promise<{ totalData: number; totalPage: number; pageIndex: number; dataIndex: number; data: T[] }> {
    // Tính toán offset dựa trên số trang và giới hạn
    const offset = (page - 1) * limit

    // Lấy tổng số lượng phần tử có trong bảng
    const totalData = await this.repository.count()

    // Lấy dữ liệu từ cơ sở dữ liệu với giới hạn và offset
    const data = await this.repository.find({
      skip: offset,
      take: limit
    })

    // Tính tổng số trang
    const totalPage = Math.ceil(totalData / limit)

    // Tính số lượng phần tử hiện tại trên trang
    const dataIndex = data.length

    // Điều chỉnh pageIndex để không vượt quá totalPage
    const pageIndex = page

    // Trả về kết quả
    return {
      totalData,
      totalPage,
      pageIndex: Number(pageIndex),
      dataIndex,
      data
    }
  }

  /**
   *
   * @param id là id của dữ liệu cần update
   * @param data là dữ liệu cần update
   * @returns trả về dữ liệu sau khi update
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   * // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm update với id của người dùng và dữ liệu cần update
   * userRepository.update(1, { name: 'John Doe' })
   *  .then(user => {
   *    // user là một đối tượng chứa thông tin của người dùng sau khi update
   *    console.log(user);
   * })
   *  .catch(error => {
   *    // Xử lý lỗi nếu có
   *    console.error(error);
   *  });
   * ```
   */
  async update(
    id: number | string,
    data: T extends DeepPartial<ObjectLiteral> ? ObjectLiteral : object
  ): Promise<T | undefined> {
    await this.repository.update(id, data)
    return this.findById(id)
  }
  /**
   * Phương thức kiểm tra sự tồn tại của một giá trị trong một trường cụ thể của cơ sở dữ liệu.
   *
   * @param field - Trường cần kiểm tra.
   * @param value - Giá trị cần kiểm tra.
   * @returns Một Promise chứa giá trị boolean cho biết giá trị có tồn tại trong trường đó hay không.
   * @example
   * ```typescript
   * // Giả sử chúng ta có một lớp UserEntity kế thừa từ BaseEntity
   * class UserEntity extends BaseEntity {
   *  name: string;
   *  email: string;
   *  // các trường khác...
   * }
   * // Tạo một thể hiện của lớp UserEntity
   * const userRepository = new UserEntity();
   * // Sử dụng hàm exists với trường là email và giá trị là 'example@gmail.com'
   * userRepository.exists('email', 'example@gmail.com')
   *  .then(isExist => {
   *    // isExist là true nếu giá trị 'example@gmail.com' tồn tại trong trường email, ngược lại là false
   *    console.log(isExist);
   * })
   *  .catch(error => {
   *    // Xử lý lỗi nếu có
   *    console.error(error);
   * });
   * ```
   */

  async exists(fieldName: keyof T, value: any): Promise<boolean> {
    const result = await this.repository.findOne({
      where: { [fieldName]: value } as FindOptionsWhere<T>
    })
    return result !== null
  }

  async findOneWithSoftDeleted(id: number | string): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      withDeleted: true
    })
  }

  async findAllWithSoftDeleted(): Promise<T[]> {
    return await this.repository.find({
      withDeleted: true
    })
  }

  async findAllSoftDeleted(): Promise<T[]> {
    return await this.repository.find({
      where: { deleted_at: Not(IsNull()) } as unknown as FindOptionsWhere<T>,
      withDeleted: true
    })
  }
}
