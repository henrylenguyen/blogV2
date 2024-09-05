import { ApiProperty } from '@nestjs/swagger'

class SharepointDTO {
  @ApiProperty({ required: true, example: 'name' })
  name?: string
  @ApiProperty({ required: false, example: 'description' })
  description?: string
}

class SharepointDeleteSiteCollectionDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteId: string
}
class SharepointUploadFileDTO {
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  siteId: string
  @ApiProperty({ required: true, example: '59234c93-b62b-4b10-98d8-fc57eaaaa774' })
  libraryId: string
  @ApiProperty({ required: true, example: 'file' })
  file: any
}

export { SharepointDeleteSiteCollectionDTO, SharepointDTO, SharepointUploadFileDTO }
