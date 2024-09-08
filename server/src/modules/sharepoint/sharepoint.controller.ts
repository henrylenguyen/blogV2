import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ApiImageFile } from 'src/common/base-api.decorator'
import httpStatus from 'src/common/base.enum'
import { ParseFile } from 'src/common/base.pipe'
import { IResponseData, ResponseData, ResponseMessage } from 'src/common/base.reponse'
import {
  SharepointCreateDocumentLibraryDTO,
  SharepointDeleteDocumentLibraryDTO,
  SharepointDeleteSiteCollectionDTO,
  SharepointDTO,
  SharepointGetImageDTO,
  SharepointSoftDeleteDocumentLibraryDTO,
  SharepointUpdateDocumentLibraryDTO,
  SharepointUploadFileDTO
} from 'src/modules/sharepoint/sharepoint.dto'
import { DocumentLibrary } from 'src/modules/sharepoint/sharepoint.model'
import {
  sharepointCreateDocumentLibrary,
  sharepointDeleteSiteCollectionValidate,
  sharepointValidate
} from 'src/modules/sharepoint/sharepoint.validate'
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
        message: `INTERNAL_SERVER_ERROR ${error.message}`
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
        const reponseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.SUCCESS,
          message: 'SITE_COLLECTION_DELETED_SUCCESSFULLY'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
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
  @UsePipes(new JoiValidationPipe(sharepointCreateDocumentLibrary))
  async createLibrary(@Body() SharepointDTO: SharepointCreateDocumentLibraryDTO, @Res() res: Response): Promise<void> {
    try {
      const result = await this.sharepointService.createLibrary(SharepointDTO)
      const reponseData: IResponseData<DocumentLibrary> = {
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
      const reponseData: IResponseData<DocumentLibrary> = {
        data,
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
    type: SharepointDeleteDocumentLibraryDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async deleteLibrary(@Body() SharepointDTO: SharepointDeleteDocumentLibraryDTO, @Res() res: Response) {
    try {
      const data = await this.sharepointService.deleteLibrary(SharepointDTO)
      // if (data?.error) {
      //   const responseData: IResponseData<null> = {
      //     data: null,
      //     statusCode: httpStatus.BAD_REQUEST,
      //     message: `LIBRARY_DELETED_FAILED - ${data.error.message.value}`
      //   }
      //   res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      // } else {
      //   const reponseData: IResponseData<SharepointDTO> = {
      //     data: null,
      //     statusCode: httpStatus.SUCCESS,
      //     message: 'LIBRARY_DELETED_SUCCESSFULLY'
      //   }
      //   res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
      // }
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
  // ------------------XÓA MỀM DOCUMENT LIBRARY---------------------
  @Delete('library/:libraryId/soft-delete')
  @ApiOperation({ summary: 'Soft delete a document library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Document library soft deleted successfully',
    type: SharepointSoftDeleteDocumentLibraryDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async softDeleteLibrary(@Param('libraryId') libraryId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.softDeleteLibrary(libraryId)
      if (!data) {
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
          message: 'SOFT_DELETE_DOCUMENT_LIBRARY_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `SOFT_DELETED_DOCUMENT_LIBRARY_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ------------------KHÔI PHỤC DOCUMENT LIBRARY---------------------
  @Patch('library/:libraryId/recover')
  @ApiOperation({ summary: 'Recover a document library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Document library recovered successfully',
    type: SharepointSoftDeleteDocumentLibraryDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async recoverLibrary(@Param('libraryId') libraryId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.recoverLibrary(libraryId)
      if (!data) {
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
          message: 'RECOVER_DOCUMENT_LIBRARY_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      console.log('error:', error)
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `RECOVER_DOCUMENT_LIBRARY_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // -----------LẤY TẤT CẢ DOCUMENT LIBRARY ĐÃ BỊ XÓA MỀM---------------------
  @Get('get-all/:siteId/deleted-document-libraries')
  @ApiOperation({ summary: 'Get all deleted document libraries' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get all deleted document libraries successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getDeletedLibraries(@Param('siteId') siteId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.getDeletedLibraries(siteId)
      const reponseData: IResponseData<DocumentLibrary> = {
        data,
        statusCode: httpStatus.SUCCESS,
        message: 'GET_DELETED_DOCUMENT_LIBRARIES_SUCCESSFULLY'
      }
      res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_DELETED_DOCUMENT_LIBRARIES_FAILED - ${error.message}`
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
  async updateLibrary(@Body() sharepointData: SharepointUpdateDocumentLibraryDTO, @Res() res: Response) {
    try {
      const data = await this.sharepointService.updateLibrary(sharepointData)
      console.log('data:', data)
      if (data?.error) {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `LIBRARY_UPDATED_FAILED - ${data.error.message.value}`
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else {
        if (data) {
          const reponseData: IResponseData<DocumentLibrary> = {
            data,
            statusCode: httpStatus.SUCCESS,
            message: 'LIBRARY_UPDATED_SUCCESSFULLY'
          }
          res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
        } else if (data === null) {
          const responseData: IResponseData<null> = {
            data: null,
            statusCode: httpStatus.NOT_FOUND,
            message: `LIBRARY_UPDATED_FAILED - LIBRARY_OLD_NAME_NOT_FOUND`
          }
          res.status(httpStatus.NOT_FOUND).json(new ResponseData(responseData))
        } else {
          const responseData: IResponseData<null> = {
            data: null,
            statusCode: httpStatus.ALREADY_EXIST,
            message: `LIBRARY_NAME_ALREADY_EXIST`
          }
          res.status(httpStatus.ALREADY_EXIST).json(new ResponseData(responseData))
        }
      }
    } catch (error) {
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
    description: { type: 'string', example: 'image about ...', required: true },
    libraryId: { type: 'string', example: '59234c93-b62b-4b10-98d8-fc57eaaaa774', required: true },
    isForceUpdate: { type: 'boolean', required: false }
  })
  async uploadFile(
    @Body() data: SharepointUploadFileDTO,
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @Res() res: Response
  ) {
    const isValid = await this.uploadService.uploadFile(file)
    if (!isValid) {
      const responseData = ResponseMessage({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'INVALID_FILE_TYPE'
      })

      res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
    } else {
      try {
        const result = await this.sharepointService.uploadFile(data, file)
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

  @Post('/get-a-imame')
  @ApiOperation({ summary: 'Get a image in document library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get a image in document library successfully',
    type: SharepointGetImageDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getFile(@Body() data: SharepointGetImageDTO, @Res() res: Response) {
    try {
      const response = await this.sharepointService.getImageInLibrary(data)
      if (response) {
        const responseData = ResponseMessage({
          statusCode: httpStatus.SUCCESS,
          message: 'GET_IMAGE_SUCCESSFULLY',
          data: response
        })
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      } else {
        const responseData = ResponseMessage({
          statusCode: httpStatus.BAD_REQUEST,
          message: 'GET_IMAGE_FAILED'
        })

        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      }
    } catch (error) {
      const responseData = ResponseMessage({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_IMAGE_FAILED - ${error.message}`
      })

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
}
