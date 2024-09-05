import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ApiImageFile } from 'src/common/base-api.decorator'
import httpStatus from 'src/common/base.enum'
import { ParseFile } from 'src/common/base.pipe'
import { IResponseData, ResponseData, ResponseMessage } from 'src/common/base.reponse'
import {
  SharepointDeleteSiteCollectionDTO,
  SharepointDTO,
  SharepointUploadFileDTO
} from 'src/modules/sharepoint/sharepoint.dto'
import { sharepointDeleteSiteCollectionValidate, sharepointValidate } from 'src/modules/sharepoint/sharepoint.validate'
import { UploadService } from 'src/modules/upload/upload.service'
import { JoiValidationPipe } from 'validation.pipe'
import { SharepointService } from './sharepoint.service'

@Controller('sharepoint')
@ApiTags('sharepoint')
export class SharepointController {
  constructor(
    private readonly sharepointService: SharepointService,
    private readonly uploadService: UploadService
  ) {}

  @Get('test-connection')
  async testConnection() {
    return this.sharepointService.testConnection()
  }

  // ------------------TẠO MỚI SITE COLLECTION---------------------
  @Post('/create/site-collection')
  @ApiOperation({ summary: 'Create a new site collection' })
  @ApiResponse({
    status: httpStatus.CREATED,
    description: 'site collection created successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  @UsePipes(new JoiValidationPipe(sharepointValidate('site collection')))
  async createSiteCollection(@Body() SharepointDTO: SharepointDTO, @Res() res: Response): Promise<void> {
    try {
      const data = await this.sharepointService.createSiteCollection(SharepointDTO)
      if (!data) {
        const responseData = ResponseMessage({
          statusCode: httpStatus.BAD_REQUEST,
          message: 'SITE_COLLECTION_ALREADY_EXIST'
        })

        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else {
        const reponseData: IResponseData<SharepointDTO> = {
          data: data,
          statusCode: httpStatus.CREATED,
          message: 'SITE_COLLECTION_CREATED_SUCCESSFULLY'
        }
        res.status(httpStatus.CREATED).json(new ResponseData(reponseData))
      }
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'SITE_COLLECTION_CREATED_FAILED'
      }
      res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
    }
  }

  // ------------------XÓA SITE COLLECTION---------------------
  @Delete('/delete/site-collection')
  @ApiOperation({ summary: 'Delete a site collection' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'site collection deleted successfully',
    type: SharepointDeleteSiteCollectionDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  @UsePipes(new JoiValidationPipe(sharepointDeleteSiteCollectionValidate()))
  async deleteSiteCollection(
    @Body() SharepointDTO: SharepointDeleteSiteCollectionDTO,
    @Res() res: Response
  ): Promise<void> {
    try {
      const data = await this.sharepointService.deleteSiteCollection(SharepointDTO)
      if (data.error) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `SITE_COLLECTION_DELETED_FAILED - ${data.error.message.value}`
        }

        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else if (!data) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `SITE_COLLECTION_NOT_FOUND`
        }

        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else {
        {
          const reponseData: IResponseData<null> = {
            data: null,
            statusCode: httpStatus.SUCCESS,
            message: 'SITE_COLLECTION_DELETED_SUCCESSFULLY'
          }
          res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
        }
      }
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `INTERNAL_SERVER_ERROR ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ------------------LẤY TẤT CẢ SITE COLLECTION---------------------
  @Get('get-all/site-collections')
  @ApiOperation({ summary: 'Get all site collections' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get all site collections successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getSiteCollections(@Res() res: Response): Promise<void> {
    try {
      const data = await this.sharepointService.getSiteCollections()
      const reponseData: IResponseData<SharepointDTO> = {
        data: data,
        statusCode: httpStatus.SUCCESS,
        message: 'GET_SITE_COLLECTIONS_SUCCESSFULLY'
      }
      res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_SITE_COLLECTIONS_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ------------------TẠO MỚI DOCUMENT LIBRARY---------------------

  @Post('site/:siteId/library')
  @ApiOperation({ summary: 'Create a new document library' })
  @ApiResponse({
    status: httpStatus.CREATED,
    description: 'Document library created successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async createLibrary(
    @Param('siteId') id: string,
    @Body(new JoiValidationPipe(sharepointValidate('document library'))) SharepointDTO: SharepointDTO,
    @Res() res: Response
  ): Promise<void> {
    try {
      const result = await this.sharepointService.createLibrary(id, SharepointDTO)
      const reponseData: IResponseData<null> = {
        data: result,
        statusCode: httpStatus.CREATED,
        message: 'LIBRARY_CREATED_SUCCESSFULLY'
      }
      res.status(httpStatus.CREATED).json(new ResponseData(reponseData))
    } catch (error) {
      if (error.statusCode === httpStatus.BAD_REQUEST) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `LIBRARY_CREATED_FAILED - ${error.message}`
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else if (error.statusCode === httpStatus.ALREADY_EXIST) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.ALREADY_EXIST,
          message: `LIBRARY_CREATED_FAILED - ${error.message}`
        }
        res.status(httpStatus.ALREADY_EXIST).json(new ResponseData(responseData))
      } else {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: `INTERNAL_SERVER_ERROR - ${error.message}`
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
      }
    }
  }
  // ------------------LẤY TẤT CẢ DOCUMENT LIBRARY---------------------

  @Get('get-all/:siteId/document-libraries')
  @ApiOperation({ summary: 'Get all document libraries' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get all document libraries successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getDocumentLibraries(@Param('siteId') siteId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.getDocumentLibraries(siteId)
      const reponseData: IResponseData<null> = {
        data: data.value,
        statusCode: httpStatus.SUCCESS,
        message: 'GET_DOCUMENT_LIBRARIES_SUCCESSFULLY'
      }
      res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_DOCUMENT_LIBRARIES_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }

  // ------------------XÓA DOCUMENT LIBRARY---------------------
  @Delete('site/:siteName/library/:libraryName')
  @ApiOperation({ summary: 'Delete a document library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Document library deleted successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async deleteLibrary(
    @Param('siteName') siteName: string,
    @Param('libraryName') libraryName: string,
    @Res() res: Response
  ) {
    try {
      const data = await this.sharepointService.deleteLibrary(siteName, libraryName)
      if (data?.error) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `LIBRARY_DELETED_FAILED - ${data.error.message.value}`
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else {
        const reponseData: IResponseData<SharepointDTO> = {
          data: null,
          statusCode: httpStatus.SUCCESS,
          message: 'LIBRARY_DELETED_SUCCESSFULLY'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `LIBRARY_DELETED_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ------------------CẬP NHẬT DOCUMENT LIBRARY---------------------
  @Patch('site/:siteName/library/:libraryName/update')
  @ApiOperation({ summary: 'Update a document library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Document library updated successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async updateLibrary(
    @Param('siteName') siteName: string,
    @Param('libraryName') libraryName: string,
    @Body() SharepointDTO: SharepointDTO,
    @Res() res: Response
  ) {
    try {
      const data = await this.sharepointService.updateLibrary(siteName, libraryName, SharepointDTO)
      console.log('data:', data)
      if (data?.error) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `LIBRARY_UPDATED_FAILED - ${data.error.message.value}`
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else {
        const reponseData: IResponseData<SharepointDTO> = {
          data: null,
          statusCode: httpStatus.SUCCESS,
          message: 'LIBRARY_UPDATED_SUCCESSFULLY'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `LIBRARY_UPDATED_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ------------------LẤY TẤT CẢ FILE TRONG LIBRARY---------------------
  @Get('site/:siteId/library/:libraryId/files')
  async getFilesInLibrary(@Param('siteId') siteId: string, @Param('libraryId') libraryId: string) {
    return this.sharepointService.getFilesInLibrary(siteId, libraryId)
  }
  @Post('site/:siteId/library/:libraryId/upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({
    status: httpStatus.CREATED,
    description: 'File uploaded successfully',
    type: SharepointUploadFileDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  @ApiImageFile('file', true, {
    siteId: { type: 'string', example: '59234c93-b62b-4b10-98d8-fc57eaaaa774', required: true },
    libraryId: { type: 'string', example: '59234c93-b62b-4b10-98d8-fc57eaaaa774', required: true }
  })
  async uploadFile(
    @Body() data: SharepointUploadFileDTO,
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @Res() res: Response
  ) {
    const isValid = await this.uploadService.uploadFile(file)
    console.log('isValid:', isValid)
    if (!isValid) {
      const responseData = ResponseMessage({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'INVALID_FILE_TYPE'
      })

      res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
    } else {
      const { siteId, libraryId } = data

      try {
        const result = await this.sharepointService.uploadFile(siteId, libraryId, file.originalname, file.buffer)
        if (result) {
          const responseData = ResponseMessage({
            statusCode: httpStatus.CREATED,
            message: 'UPLOAD_FILE_SUCCESSFULLY',
            data: result
          })
          res.status(httpStatus.CREATED).json(new ResponseData(responseData))
        }
      } catch (error) {
        const responseData = ResponseMessage({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: `UPLOAD_FILE_FAILED - ${error.message}`
        })

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
      }
    }
  }
}
