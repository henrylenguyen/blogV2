import { ApiProperty } from '@nestjs/swagger'

class SharepointDTO {
  @ApiProperty({ required: true, example: 'name' })
  name?: string
  @ApiProperty({ required: false, example: 'description' })
  description?: string
}
class SharepointCreateDocumentLibraryDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteSPOId: string
  @ApiProperty({ required: true, example: '9234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteCollectionId: string
  @ApiProperty({ required: true, example: 'name' })
  name: string
  @ApiProperty({ required: true, example: 'description' })
  description: string
}
class SharepointDeleteSiteCollectionDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteSPOId: string
}
class SharepointSoftDeleteDocumentLibraryDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  documentLibraryId: string
}
class SharepointFileDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  fileIds: string | string[]
}
class SharepointFileByPaginationDTO {
  @ApiProperty({ required: true, example: 1 })
  page: number
  @ApiProperty({ required: true, example: 10 })
  limit: number
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  documentLibraryId: string
}
class SharepointDeleteFileDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteSPOId: string
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  fileSPOIds: string | string[]
}
class SharepointUploadFileDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteSPOId: string
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  documentSPOId: string
  @ApiProperty({ required: true, example: 'image about ...' })
  description: string
  @ApiProperty({ required: false })
  isForceUpdate?: boolean
  @ApiProperty({ required: true, example: 'file' })
  file: any
}
class SharepointDeleteDocumentLibraryDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteSPOId: string
  @ApiProperty({ required: true, example: 'name' })
  siteName: string
  @ApiProperty({ required: true, example: 'name' })
  libraryName: string
}
class SharepointUpdateDocumentLibraryDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  libraryId: string
  @ApiProperty({ required: true, example: 'sitename' })
  siteName: string
  @ApiProperty({ required: true, example: 'oldname' })
  libraryOldName: string
  @ApiProperty({ required: true, example: 'newname' })
  libraryNewName?: string
  @ApiProperty({ required: false, example: 'description' })
  description?: string
}
class SharepointGetImageDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  fileId: string
  @ApiProperty({ required: true, example: 'sitename' })
  siteCollectionName: string
  @ApiProperty({ required: true, example: 'documentlibraryname' })
  documentLibraryName: string
}
export {
  SharepointCreateDocumentLibraryDTO,
  SharepointDeleteDocumentLibraryDTO,
  SharepointDeleteSiteCollectionDTO,
  SharepointDTO,
  SharepointFileDTO,
  SharepointGetImageDTO,
  SharepointSoftDeleteDocumentLibraryDTO,
  SharepointUpdateDocumentLibraryDTO,
  SharepointUploadFileDTO,
  SharepointDeleteFileDTO,
  SharepointFileByPaginationDTO
}
