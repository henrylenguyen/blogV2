import { InjectRepository } from '@nestjs/typeorm'
import { BaseEntity, DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm'

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
   * Phương thức tìm kiếm dựa vào id và kiểm tra thuộc tính deleteAt.
   *
   * @param id - ID của đối tượng cần tìm kiếm.
   * @returns Một Promise chứa đối tượng tìm thấy hoặc null nếu không tìm thấy hoặc đã bị xóa (deleteAt khác null).
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
   * // Sử dụng hàm findByIdAndCheckDeleted với id của người dùng
   * userRepository.findByIdAndCheckDeleted(1)
   *  .then(user => {
   *  // user là một đối tượng chứa thông tin của người dùng có id là 1
   *  console.log(user);
   * })
   * .catch(error => {
   *  // Xử lý lỗi nếu có
   *  console.error(error);
   * });
   */
  async findByIdAndCheckDeleted(id: number | string): Promise<boolean> {
    try {
      // Tìm kiếm dựa vào id
      const result = await this.findById(id)

      // Nếu tìm thấy và deleteAt khác null, trả về true
      if (Array.isArray(result) && result.length > 0 && result[0].deleteAt === null) {
        return true
      }

      // Nếu không tìm thấy hoặc deleteAt khác null, trả về false
      return false
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error)
      throw error
    }
  }

  /**
   * Soft delete là dạng xóa mềm, dữ liệu vẫn còn trong database nhưng không hiển thị ra ngoài, nó chỉ cập nhật lại trường deletedAt
   * @param id là id của dữ liệu cần xóa
   *
   */
  async softDelete(id: number | string): Promise<boolean> {
    await this.repository.softDelete(id)
    return this.findByIdAndCheckDeleted(id)
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
    if (result.affected === 1) {
      return true
    }

    // Nếu không thành công, trả về false
    return false
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
   * Phương thức lấy dữ liệu theo phân trang.
   *
   * @param page - Số trang cần lấy dữ liệu.
   * @param limit - Số lượng dữ liệu muốn lấy trên mỗi trang.
   * @returns Một Promise chứa một mảng của các đối tượng tìm thấy.
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
   * // Sử dụng hàm paginate với số trang và giới hạn
   * userRepository.paginate(1, 10)
   * .then(users => {
   * // users là một mảng chứa 10 người dùng đầu tiên
   * console.log(users);
   * })
   * .catch(error => {
   * // Xử lý lỗi nếu có
   * console.error(error);
   * });
   */
  async paginate(page: number, limit: number): Promise<T[]> {
    // Tính toán offset dựa trên số trang và giới hạn
    const offset = (page - 1) * limit

    // Lấy dữ liệu từ cơ sở dữ liệu với giới hạn và offset
    const result = await this.repository.find({
      skip: offset,
      take: limit
    })

    // Trả về kết quả
    return result
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
  async exists(field: keyof T, value: any): Promise<boolean> {
    // Tìm kiếm đối tượng dựa trên trường và giá trị
    const result = await this.repository.findOne({ [field]: value })

    // Nếu tìm thấy, trả về true
    if (result) {
      return true
    }

    // Nếu không tìm thấy, trả về false
    return false
  }
}
