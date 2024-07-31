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
  async createCarousels(data: Carousels): Promise<Carousels | boolean> {
    const res = await this.carouselsRepository.exists('imageUrl', data.imageUrl)
    if (res) {
      return false
    } else {
      return await this.carouselsRepository.create(data)
    }
  }
  async updateCarousels(id: string, data: Carousels): Promise<Carousels | boolean> {
    const res = await this.carouselsRepository.exists('imageUrl', data.imageUrl)
    if (res) {
      return false
    } else {
      return await this.carouselsRepository.update(id, data)
    }
  }
  async softDeleteCarousels(id: string): Promise<boolean> {
    return await this.carouselsRepository.softDelete(id)
  }
  async recoverDeleteCarousels(id: string): Promise<boolean> {
    return await this.carouselsRepository.recoverDelete(id)
  }
  async deleteCarousels(id: string): Promise<boolean> {
    return await this.carouselsRepository.delete(id)
  }

  async paginate(
    page: number,
    limit: number
  ): Promise<{ totalData: number; totalPage: number; pageIndex: number; dataIndex: number; data: Carousels[] }> {
    // return await this.carouselsRepository.paginate(page, limit)
    return await this.carouselsRepository.paginate(page, limit)
  }
}
