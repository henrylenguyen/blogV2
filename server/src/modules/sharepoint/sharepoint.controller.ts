import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common'
import { SharepointService } from './sharepoint.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import httpStatus from 'src/common/base.enum'
import { JoiValidationPipe } from 'validation.pipe'
import sharepointValidate from 'src/modules/sharepoint/sharepoint.validate'
import sharepointDTO from 'src/modules/sharepoint/sharepoint.dto'

@Controller('sharepoint')
@ApiTags('sharepoint')
export class SharepointController {
  constructor(private readonly sharepointService: SharepointService) {}

  @Get('test-connection')
  async testConnection() {
    return this.sharepointService.testConnection()
  }

  @Get('site-collections')
  async getSiteCollections() {
    return this.sharepointService.getSiteCollections()
  }

  @Get('site/:siteId/document-libraries')
  async getDocumentLibraries(@Param('siteId') siteId: string) {
    return this.sharepointService.getDocumentLibraries(siteId)
  }

  @Get('site/:siteId/library/:libraryId/files')
  async getFilesInLibrary(@Param('siteId') siteId: string, @Param('libraryId') libraryId: string) {
    return this.sharepointService.getFilesInLibrary(siteId, libraryId)
  }

  @Post('site-collection')
  @ApiOperation({ summary: 'Create a new site collection' })
  @ApiResponse({
    status: httpStatus.CREATED,
    description: 'Carousel created successfully',
    type: sharepointDTO
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Validation failed'
  })
  @UsePipes(new JoiValidationPipe(sharepointValidate('site collection')))
  async createSiteCollection(@Body() sharepointDTO: sharepointDTO) {
    return this.sharepointService.createSiteCollection(sharepointDTO)
  }

  @Post('site/:siteId/library')
  async createLibrary(@Param('siteId') siteId: string, @Body('libraryName') libraryName: string) {
    return this.sharepointService.createLibrary(siteId, libraryName)
  }

  @Post('site/:siteId/library/:libraryId/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('siteId') siteId: string,
    @Param('libraryId') libraryId: string,
    @Body('fileName') fileName: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.sharepointService.uploadFile(siteId, libraryId, fileName, file.buffer)
  }
}
