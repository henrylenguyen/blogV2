import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'src/common/base.repository'
import CarouselEntiy from 'src/modules/carousels/carousels.entities'
import ICarousels from 'src/modules/carousels/carousels.interface'
import { Repository } from 'typeorm'

// implement là một từ khóa của TypeScript, nó giúp chúng ta thực thi một interface hoặc một abstract class từ nơi khác
// @Injectable(): Đây là một decorator của NestJS, dùng để đánh dấu một lớp nơi khác có thể sử dụng trong ứng dụng.
// @InjectRepository(): Đây là một decorator của TypeORM, dùng để sử dụng repository cụ thể trong ứng dụng.
@Injectable()
class CarouselsRepository extends BaseRepository<CarouselEntiy, Repository<CarouselEntiy>> implements ICarousels {
  constructor(
    @InjectRepository(CarouselEntiy)
    protected readonly repository: Repository<CarouselEntiy>
  ) {
    super(repository)
  }
}
export default CarouselsRepository
