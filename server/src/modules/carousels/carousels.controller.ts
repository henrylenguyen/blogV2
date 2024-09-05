import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { BasePaginationDTO } from 'src/common/base.dto'
import httpStatus from 'src/common/base.enum'
import { IReponsePaginationData, IResponseData, ResponseData, ResponsePaginationData } from 'src/common/base.reponse'
import { validPagination } from 'src/common/validate'
import CarouselDTO from 'src/modules/carousels/carousels.dto'
import { CarouselsService } from 'src/modules/carousels/carousels.service'
import carouselValidationSchema from 'src/modules/carousels/carousels.validate'
import { JoiValidationPipe } from 'validation.pipe'

@Controller('carousels')
@ApiTags('carousels')
class CarouselsController {
  constructor(private readonly carouselsService: CarouselsService) {}

  // -------------------LẤY DANH SÁCH CAROUSEL----------------------------------
  @Get('/get-all')
  @ApiOperation({ summary: 'Get all carousels' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get All Carousel successful',
    type: ResponseData<[CarouselDTO]>
  })
  @ApiResponse({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  async getListCarousels(@Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.findAll()
      const responseData: IResponseData<CarouselDTO> = {
        data: CarouselDTO.plainToClass(data),
        statusCode: httpStatus.SUCCESS,
        message: `GET_ALL_CAROUSELS_SUCCESS`
      }
      res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_CAROUSELS_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // -------------------TẠO MỚI CAROUSEL----------------------------------
  @Post('/create')
  @ApiOperation({ summary: 'Create a new carousel' })
  @ApiResponse({
    status: httpStatus.CREATED,
    description: 'Carousel created successfully',
    type: CarouselDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  @UsePipes(new JoiValidationPipe(carouselValidationSchema))
  async createCarousels(@Body() carouselDTO: CarouselDTO, @Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.createCarousels(carouselDTO)
      if (data === false) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: 'IMAGE_EXIST'
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
        return
      } else {
        const responseData: IResponseData<CarouselDTO> = {
          data: CarouselDTO.plainToClass(data as CarouselDTO),
          statusCode: httpStatus.CREATED,
          message: 'CREATE_CAROUSEL_SUCCESS'
        }
        res.status(httpStatus.CREATED).json(new ResponseData(responseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'CREATE_CAROUSEL_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // -------------------CẬP NHẬT CAROUSEL----------------------------------
  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a carousel' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Cập nhật carousel thành công',
    type: CarouselDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Lỗi trong validation dữ liệu'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy id của carousel cần cập nhật'
  })
  @ApiResponse({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    description: 'Lỗi server'
  })
  async updateCarousels(
    @Param('id') id: string,
    @Body() carouselDTO: CarouselDTO,
    @Res() res: Response
  ): Promise<void> {
    try {
      const data = await this.carouselsService.updateCarousels(id, carouselDTO)
      console.log('data:', data)
      if (data === false) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: 'IMAGE_EXIST'
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
        return
      } else if (data === null) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.NOT_FOUND,
          message: 'ID_NOT_FOUND'
        }
        res.status(404).json(new ResponseData(responseData))
      } else {
        const responseData: IResponseData<CarouselDTO> = {
          data: CarouselDTO.plainToClass(data as CarouselDTO),
          statusCode: httpStatus.SUCCESS,
          message: 'UPDATE_CAROUSEL_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'UPDATE_CAROUSEL_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  //---------------------- XÓA MỀM---------------------
  @Delete('soft-delete/:id')
  @ApiOperation({ summary: 'Delete a carousel' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Delete carousel successfully',
    type: Boolean
  })
  @ApiResponse({
    status: 404,
    description: 'Not found carousel id'
  })
  @ApiResponse({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  async softDeleteCarousels(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.softDeleteCarousels(id)
      if (data === false) {
        const responseData: IResponseData<boolean> = {
          data: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'ID_NOT_FOUND'
        }
        res.status(404).json(new ResponseData(responseData))
      } else {
        const responseData: IResponseData<boolean> = {
          data: true,
          statusCode: httpStatus.SUCCESS,
          message: 'DELETE_CAROUSEL_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'DELETE_CAROUSEL_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  //---------------------- KHÔI PHỤC---------------------
  @Patch('recover/:id')
  @ApiOperation({ summary: 'Recover a carousel' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Recover carousel successfully',
    type: Boolean
  })
  @ApiResponse({
    status: 404,
    description: 'Not found carousel id'
  })
  @ApiResponse({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  async recoverDeleteCarousels(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.recoverDeleteCarousels(id)
      if (data === false) {
        const responseData: IResponseData<boolean> = {
          data: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'ID_NOT_FOUND'
        }
        res.status(404).json(new ResponseData(responseData))
      } else {
        const responseData: IResponseData<boolean> = {
          data: true,
          statusCode: httpStatus.SUCCESS,
          message: 'RECOVER_CAROUSEL_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'RECOVER_CAROUSEL_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ----------------------------XÓA VĨNH VIỄN--------------------------------
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a carousel' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Delete carousel successfully',
    type: Boolean
  })
  @ApiResponse({
    status: 404,
    description: 'Not found carousel id'
  })
  @ApiResponse({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  async deleteCarousels(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const data = await this.carouselsService.deleteCarousels(id)
      if (data === false) {
        const responseData: IResponseData<boolean> = {
          data: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'ID_NOT_FOUND'
        }
        res.status(404).json(new ResponseData(responseData))
      } else {
        const responseData: IResponseData<boolean> = {
          data: true,
          statusCode: httpStatus.SUCCESS,
          message: 'DELETE_CAROUSEL_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'DELETE_CAROUSEL_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ----------------------------PHÂN TRANG--------------------------------
  @Get('get-all/pagination')
  @ApiOperation({ summary: 'Pagination' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Pagination successful',
    type: ResponseData<[CarouselDTO]>
  })
  @ApiResponse({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error'
  })
  @UsePipes(new JoiValidationPipe(validPagination))
  async pagination(@Query() req: BasePaginationDTO, @Res() res: Response): Promise<void> {
    const { page, limit } = req

    try {
      const { totalData, totalPage, pageIndex, data, dataIndex } = await this.carouselsService.paginate(page, limit)
      const responseData: IReponsePaginationData<CarouselDTO> = {
        totalData,
        totalPage,
        pageIndex,
        dataIndex,
        data: CarouselDTO.plainToClass(data),
        statusCode: httpStatus.SUCCESS,
        message: `GET_ALL_CAROUSEL_BY_PAGINATION_SUCCESS`
      }
      res.status(httpStatus.SUCCESS).json(new ResponsePaginationData(responseData))
    } catch (error) {
      const responseData: IReponsePaginationData<CarouselDTO> = {
        totalData: 0,
        totalPage: 0,
        pageIndex: 0,
        dataIndex: 0,
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_CAROUSEL_BY_PAGINATION_FAIL'
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponsePaginationData(responseData))
    }
  }
}

export default CarouselsController
