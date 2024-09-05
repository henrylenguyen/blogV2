import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'src/common/base.repository'
import {
  DocumentLibraryEntity,
  MediaSharepointEntity,
  SiteCollectionEntity
} from 'src/modules/sharepoint/sharepoint.entities'
import { IDocumentLibrary, IMediaSharepoint, ISiteCollection } from 'src/modules/sharepoint/sharepoint.interface'
import { Repository } from 'typeorm'

// implement là một từ khóa của TypeScript, nó giúp chúng ta thực thi một interface hoặc một abstract class từ nơi khác
// @Injectable(): Đây là một decorator của NestJS, dùng để đánh dấu một lớp nơi khác có thể sử dụng trong ứng dụng.
// @InjectRepository(): Đây là một decorator của TypeORM, dùng để sử dụng repository cụ thể trong ứng dụng.
@Injectable()
class SiteCollectionRepository
  extends BaseRepository<SiteCollectionEntity, Repository<SiteCollectionEntity>>
  implements ISiteCollection
{
  constructor(
    @InjectRepository(SiteCollectionEntity)
    protected readonly repository: Repository<SiteCollectionEntity>
  ) {
    super(repository)
  }
}

class DocumentLibraryRepository
  extends BaseRepository<DocumentLibraryEntity, Repository<DocumentLibraryEntity>>
  implements IDocumentLibrary
{
  constructor(
    @InjectRepository(DocumentLibraryEntity)
    protected readonly repository: Repository<DocumentLibraryEntity>
  ) {
    super(repository)
  }
}

class MediaSharepointRepository
  extends BaseRepository<MediaSharepointEntity, Repository<MediaSharepointEntity>>
  implements IMediaSharepoint
{
  constructor(
    @InjectRepository(MediaSharepointEntity)
    protected readonly repository: Repository<MediaSharepointEntity>
  ) {
    super(repository)
  }
}
export { DocumentLibraryRepository, MediaSharepointRepository, SiteCollectionRepository }
