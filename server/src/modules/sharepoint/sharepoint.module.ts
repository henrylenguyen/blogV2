import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  DocumentLibraryEntity,
  MediaSharepointEntity,
  SiteCollectionEntity
} from 'src/modules/sharepoint/sharepoint.entities'
import {
  DocumentLibraryRepository,
  MediaSharepointRepository,
  SiteCollectionRepository
} from 'src/modules/sharepoint/sharepoint.repository'
import { UploadController } from 'src/modules/upload/upload.controller'
import { UploadModule } from 'src/modules/upload/upload.module'
import { SharepointController } from './sharepoint.controller'
import { SharepointService } from './sharepoint.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([SiteCollectionEntity, DocumentLibraryEntity, MediaSharepointEntity]),
    UploadModule
  ],
  providers: [
    SharepointService,
    {
      provide: 'ISiteCollectionRepository',
      useClass: SiteCollectionRepository
    },
    {
      provide: 'IDocumentLibraryRepository',
      useClass: DocumentLibraryRepository
    },
    {
      provide: 'IMediaSharepointRepository',
      useClass: MediaSharepointRepository
    }
  ],
  controllers: [SharepointController, UploadController]
})
export class SharepointModule {}
