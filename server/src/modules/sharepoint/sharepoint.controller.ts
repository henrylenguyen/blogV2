import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import sharp from 'sharp'
import { ApiImageFile } from 'src/common/base-api.decorator'
import httpStatus from 'src/common/base.enum'
import { ParseFile } from 'src/common/base.pipe'
import { IResponseData, ResponseData, ResponseMessage } from 'src/common/base.reponse'
import {
  SharepointCreateDocumentLibraryDTO,
  SharepointDeleteDocumentLibraryDTO,
  SharepointDeleteFileDTO,
  SharepointDeleteSiteCollectionDTO,
  SharepointDTO,
  SharepointFileByPaginationDTO,
  SharepointFileDTO,
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
import { v4 as uuidv4 } from 'uuid'
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
  // ------------------LẤY TẤT CẢ DOCUMENT LIBRARY---------------------

  @Get('get-all/:siteSPOId/document-libraries')
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
  async getDocumentLibraries(@Param('siteSPOId') siteSPOId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.getDocumentLibraries(siteSPOId)
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

  // -----------LẤY TẤT CẢ DOCUMENT LIBRARY ĐÃ BỊ XÓA MỀM---------------------
  @Get('get-all/:siteSPOId/deleted-document-libraries')
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
  async getDeletedLibraries(@Param('siteSPOId') siteSPOId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.getDeletedLibraries(siteSPOId)
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

  // ------------------LẤY TẤT CẢ FILE TRONG LIBRARY---------------------
  @Get('get-all/site/:siteSPOId/library/:libraryId/files')
  @ApiOperation({ summary: 'Get all files in library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get all files in library successfully',
    type: DocumentLibrary
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getFilesInLibrary(@Param('documentSPOId') documentSPOId: string, @Res() res: Response) {
    const response = await this.sharepointService.getFilesInLibrary(documentSPOId)
    try {
      const reponseData = ResponseMessage({
        statusCode: httpStatus.SUCCESS,
        message: 'GET_FILES_IN_LIBRARY_SUCCESSFULLY',
        data: response
      })
      res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
    } catch (error) {
      const responseData = ResponseMessage({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_FILES_IN_LIBRARY_FAILED - ${error.message}`
      })
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }

  // --------LẤY TẤT CẢ FILE TRONG LIBRARY THEO PHÂN TRANG---------------------
  @Get('get-all/library/get-files-by-pagination')
  @ApiOperation({ summary: 'Get all files in library by pagination' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get all files in library by pagination successfully',
    type: DocumentLibrary
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getFilesInLibraryByPagination(@Body() data: SharepointFileByPaginationDTO, @Res() res: Response) {
    const response = await this.sharepointService.getFilesInLibraryByPagination(data)
    try {
      const reponseData = ResponseMessage({
        statusCode: httpStatus.SUCCESS,
        message: 'GET_FILES_IN_LIBRARY_SUCCESSFULLY',
        data: response
      })
      res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
    } catch (error) {
      const responseData = ResponseMessage({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_FILES_IN_LIBRARY_FAILED - ${error.message}`
      })
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }

  // ------------------LẤY TẤT CẢ FILE ĐÃ BỊ XÓA MỀM TRONG LIBRARY---------------------
  @Get('get-all/:libraryId/deleted-files')
  @ApiOperation({ summary: 'Get all deleted files in library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'Get all deleted files in library successfully',
    type: SharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async getDeletedFiles(@Param('libraryId') libraryId: string, @Res() res: Response) {
    try {
      const data = await this.sharepointService.getDeletedFilesInLibrary(libraryId)
      const reponseData: IResponseData<DocumentLibrary> = {
        data,
        statusCode: httpStatus.SUCCESS,
        message: 'GET_DELETED_FILES_IN_LIBRARY_SUCCESSFULLY'
      }
      res.status(httpStatus.SUCCESS).json(new ResponseData(reponseData))
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `GET_DELETED_FILES_IN_LIBRARY_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
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

  // ------------------TẠO MỚI DOCUMENT LIBRARY---------------------

  @Post('site/:siteSPOId/library')
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
      if (result) {
        const reponseData: IResponseData<SharepointDTO> = {
          data: result,
          statusCode: httpStatus.CREATED,
          message: 'LIBRARY_CREATED_SUCCESSFULLY'
        }
        res.status(httpStatus.CREATED).json(new ResponseData(reponseData))
      } else {
        const responseData: IResponseData<null> = {
          data: null,
          statusCode: httpStatus.BAD_REQUEST,
          message: `SITE_ID_NOT_FOUND`
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      }
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

  @Post('site/:siteSPOId/library/:libraryId/upload')
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
    siteSPOId: { type: 'string', example: '', required: true },
    description: { type: 'string', example: 'image about ...', required: true },
    documentSPOId: { type: 'string', example: '', required: true },
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
        const webpImageBuffer = await sharp(response)
          .webp({ quality: 80 }) // Chuyển đổi sang định dạng WebP với chất lượng 80%
          .toBuffer()
        // res.set({
        //   'Content-Type': 'application/octet-stream', // Sử dụng loại MIME phù hợp, ví dụ: 'image/jpeg'
        //   'Content-Disposition': 'attachment; filename="image.png"' // Tùy chọn: gợi ý tên file tải về
        // })
        const uniqueFileName = `${uuidv4()}.webp`
        res.set({
          'Content-Type': 'image/webp', // Định dạng MIME cho ảnh WebP
          'Cache-Control': 'public, max-age=31536000', // Lưu trong bộ nhớ cache tối đa 1 năm
          ETag: '12345', // ETag để kiểm tra thay đổi nội dung
          'Content-Disposition': `inline; filename="${uniqueFileName}"` // Đề xuất tên file động
        })
        res.status(httpStatus.SUCCESS).send(Buffer.from(webpImageBuffer))
      } else {
        const responseData = ResponseMessage({
          statusCode: httpStatus.BAD_REQUEST,
          message: 'ID_NOT_FOUND'
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

  // ------------------XÓA DOCUMENT LIBRARY---------------------
  @Delete('/delete/document-library')
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
  // ------------------XÓA VĨNH VIỄN FILE TRONG LIBRARY---------------------
  @Delete('delete/files')
  @ApiOperation({ summary: 'Delete a file or many files in library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'File deleted successfully',
    type: SharepointFileDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async deleteFile(@Body() SharepointDTO: SharepointDeleteFileDTO, @Res() res: Response) {
    try {
      const data = await this.sharepointService.deleteFilePermanently(SharepointDTO)
      if (!data) {
        const responseData: IResponseData<boolean> = {
          data: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'ID_NOT_FOUND'
        }
        res.status(httpStatus.BAD_REQUEST).json(new ResponseData(responseData))
      } else {
        const responseData: IResponseData<boolean> = {
          data: true,
          statusCode: httpStatus.SUCCESS,
          message: 'DELETE_FILE_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `DELETE_FILE_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
  // ------------------XÓA MỀM DOCUMENT LIBRARY---------------------
  @Delete('soft-delete/library/:libraryId')
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

  // ------------------XÓA MỀM FILE TRONG LIBRARY---------------------
  @Delete('soft-delete/files')
  @ApiOperation({ summary: 'Soft delete a file in library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'File soft deleted successfully',
    type: SharepointFileDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async softDeleteFile(@Body() SharepointDTO: SharepointFileDTO, @Res() res: Response) {
    try {
      const data = await this.sharepointService.softDeleteFileInLibrary(SharepointDTO)
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
          message: 'SOFT_DELETE_FILE_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `SOFT_DELETED_FILE_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }

  // ------------------CẬP NHẬT DOCUMENT LIBRARY---------------------
  @Patch('update/site/:siteName/library/:libraryName/')
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

  // ------------------KHÔI PHỤC DOCUMENT LIBRARY---------------------
  @Patch('recover/library/:libraryId')
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

  // ------------------KHÔI PHỤC FILE TRONG LIBRARY---------------------
  @Patch('recover/file/:fileId/')
  @ApiOperation({ summary: 'Recover a file or many files in library' })
  @ApiResponse({
    status: httpStatus.SUCCESS,
    description: 'File recovered successfully',
    type: SharepointFileDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  async recoverFile(@Body() sharepointDTO: SharepointFileDTO, @Res() res: Response) {
    try {
      const data = await this.sharepointService.recoverFileInLibrary(sharepointDTO)
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
          message: 'RECOVER_FILE_SUCCESS'
        }
        res.status(httpStatus.SUCCESS).json(new ResponseData(responseData))
      }
    } catch (error) {
      const responseData: IResponseData<null> = {
        data: null,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: `RECOVER_FILE_FAILED - ${error.message}`
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData(responseData))
    }
  }
}
