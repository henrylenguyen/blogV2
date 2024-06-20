import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import CarouselEntiy from 'src/modules/carousels/carousels.entities'
import CarouselsRepository from 'src/modules/carousels/carousels.repository'
import { CarouselsService } from 'src/modules/carousels/carousels.service'

@Module({
  imports: [TypeOrmModule.forFeature([CarouselEntiy])],
  controllers: [],
  providers: [
    CarouselsService,
    {
      provide: 'ICarouselsRepository',
      useClass: CarouselsRepository
    }
  ]
})
export class CarouselsModule {}
