import { BaseEntities } from 'src/common/base.entities'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity('SiteCollection')
class SiteCollectionEntity extends BaseEntities {
  constructor() {
    super()
  }
  description: string
  @Column({ name: 'site_collection_url', type: 'varchar', length: 255, nullable: true, unique: true })
  siteCollectionUrl?: string
  
  @Column({ name: 'site_id', type: 'varchar', length: 255, nullable: true, unique: true })
  siteId: string
  
  @OneToMany(() => DocumentLibraryEntity, (documentLibrary) => documentLibrary.siteCollection)
  documentLibraries: DocumentLibraryEntity[] // Mối quan hệ 1-N với DocumentLibraryEntity

}
@Entity('DocumentLibrary')
class DocumentLibraryEntity extends BaseEntities {
  constructor() {
    super()
  }

  @Column({ name: 'site_id', type: 'varchar', nullable: false }) // Định nghĩa cột khóa ngoại
  siteId: string

  @ManyToOne(() => SiteCollectionEntity, (siteCollection) => siteCollection.documentLibraries)
  @JoinColumn({ name: 'site_id' }) // Chỉ định cột khóa ngoại trong bảng DocumentLibrary
  siteCollection: SiteCollectionEntity // Mối quan hệ N-1 với SiteCollectionEntity

  @OneToMany(() => MediaSharepointEntity, (mediaSharepoint) => mediaSharepoint.documentLibrary)
  mediaSharepoints: MediaSharepointEntity[] // Mối quan hệ 1-N với MediaSharepointEntity

  @Column({ name: 'document_library_url', type: 'varchar', length: 255, nullable: true, unique: true })
  documentLibraryUrl?: string
}
@Entity('MediaSharepoint')
class MediaSharepointEntity extends BaseEntities {
  constructor() {
    super()
  }
  description: string
  link?: string
  @Column({ name: 'media_url', type: 'varchar', length: 255, nullable: false, unique: true })
  mediaUrl: string
  @Column({ name: 'media_type', type: 'varchar', length: 50, nullable: true }) // Loại file
  type?: string
  @Column({ name: 'media_size', type: 'int', nullable: true })
  size?: number
  @Column({ name: 'media_slug', type: 'varchar', length: 255, nullable: false, unique: true })
  mediaSlug: string
  @Column({ name: 'media_thumbnail', type: 'varchar', length: 255, nullable: true })
  mediaThumbnail?: string
  @Column({ name: 'media_extension', type: 'varchar', length: 10, nullable: true }) // Đuôi file
  mediaExtension?: string
  @Column({ name: 'media_video_duration', type: 'int', nullable: true })
  totalVideoDuration?: number // Tổng thời lượng video

  @Column({ name: 'document_library_id', type: 'varchar', nullable: false }) // Định nghĩa cột khóa ngoại
  documentLibraryID: string

  @ManyToOne(() => DocumentLibraryEntity, (documentLibrary) => documentLibrary.mediaSharepoints)
  @JoinColumn({ name: 'document_library_id' }) // Chỉ định cột khóa ngoại trong bảng MediaSharepoint
  documentLibrary: DocumentLibraryEntity // Mối quan hệ N-1 với DocumentLibraryEntity
}

export { DocumentLibraryEntity, MediaSharepointEntity, SiteCollectionEntity }
