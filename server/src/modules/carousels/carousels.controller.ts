import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import httpStatus from 'src/common/base.enum'
import { IReponseData, ResponseData } from 'src/common/base.reponse'
import Carousels from 'src/modules/carousels/carousels.model'
import { CarouselsService } from 'src/modules/carousels/carousels.service'

@Controller('carousels')
class CarouselsController {
  constructor(private readonly carouselsService: CarouselsService) {}

  @Get()
  async getListCarousels(@Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.findAll()
      const responseData: IReponseData<Carousels[]> = {
        data,
        statusCode: 200,
        message: `GET_ALL_CAROUSELS_SUCCESS`
      }
      res.status(200).json(new ResponseData(responseData))
    } catch (error) {
      const responseData: IReponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_CAROUSELS_FAIL'
      }
      res.status(500).json(new ResponseData(responseData))
    }
  }
}

export default CarouselsController
