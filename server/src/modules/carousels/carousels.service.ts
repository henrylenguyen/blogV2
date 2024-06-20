import { Inject, Injectable } from '@nestjs/common'
import ICarousels from 'src/modules/carousels/carousels.interface'
import Carousels from 'src/modules/carousels/carousels.model'

// nhận từ controller, xử lý xuống repository và trả về kết quả cho client
@Injectable()
export class CarouselsService {
  constructor(
    @Inject('ICarouselsRepository')
    private readonly carouselsRepository: ICarousels
  ) {}
  async findAll(): Promise<Carousels[]> {
    return await this.carouselsRepository.findAll()
  }
}
