import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import CarouselsController from 'src/modules/carousels/carousels.controller'
import CarouselEntiy from 'src/modules/carousels/carousels.entities'
import CarouselsRepository from 'src/modules/carousels/carousels.repository'
import { CarouselsService } from 'src/modules/carousels/carousels.service'

@Module({
  imports: [TypeOrmModule.forFeature([CarouselEntiy])],
  controllers: [CarouselsController],
  providers: [
    CarouselsService,
    {
      provide: 'ICarouselsRepository',
      useClass: CarouselsRepository
    }
  ]
})
export class CarouselsModule {}
