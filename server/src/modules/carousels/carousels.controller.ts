import { Body, Controller, Get, Post, Res, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'
import { Response } from 'express'
import httpStatus from 'src/common/base.enum'
import { IReponseData, ResponseData } from 'src/common/base.reponse'
import CarouselDTO from 'src/modules/carousels/carousels.dto'
import Carousels from 'src/modules/carousels/carousels.model'
import { CarouselsService } from 'src/modules/carousels/carousels.service'
import carouselValidationSchema from 'src/modules/carousels/carousels.validate'
import { JoiValidationPipe } from 'validation.pipe'

@Controller('carousels')
@ApiTags('carousels')
class CarouselsController {
  constructor(private readonly carouselsService: CarouselsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all carousels' })
  @ApiResponse({
    status: 200,
    description: 'Get All Carousel successful',
    type: ResponseData<[CarouselDTO]>
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
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

  @Post()
  @ApiOperation({ summary: 'Create a new carousel' })
  @ApiResponse({
    status: 201,
    description: 'Carousel created successfully',
    type: CarouselDTO
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed'
  })
  @UsePipes(new JoiValidationPipe(carouselValidationSchema))
  async createCarousels(@Body() carouselDTO: CarouselDTO, @Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.createCarousels(carouselDTO)
      if (!data) {
        const responseData: IReponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: 'IMAGE_EXIST'
        }
        res.status(400).json(new ResponseData(responseData))
        return
      } else {
        const responseData: IReponseData<Carousels> = {
          data: plainToClass(CarouselDTO, data, { excludeExtraneousValues: true }),
          statusCode: 201,
          message: 'CREATE_CAROUSEL_SUCCESS'
        }
        res.status(201).json(new ResponseData(responseData))
      }
    } catch (error) {
      const responseData: IReponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'CREATE_CAROUSEL_FAIL'
      }
      res.status(500).json(new ResponseData(responseData))
    }
  }
}

export default CarouselsController
