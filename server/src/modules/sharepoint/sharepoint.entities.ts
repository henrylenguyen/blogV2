import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntities } from '../../common/base.entities'

@Entity('SiteCollection')
class SiteCollectionEntity extends BaseEntities {
  constructor() {
    super()
  }
  description: string
  @Column({ name: 'site_collection_url', type: 'varchar', length: 255, nullable: true, unique: true })
  siteCollectionUrl?: string

  @Column({ name: 'site_SPO_Id', type: 'varchar', length: 255, nullable: true, unique: true })
  siteSPOId: string

  @OneToMany(() => DocumentLibraryEntity, (documentLibrary) => documentLibrary.siteCollection)
  documentLibraries: DocumentLibraryEntity[] // Mối quan hệ 1-N với DocumentLibraryEntity
}
@Entity('DocumentLibrary')
class DocumentLibraryEntity extends BaseEntities {
  constructor() {
    super()
  }

  @Column({ name: 'site_collection_id', type: 'varchar', nullable: false })
  siteCollectionId: string

  @Column({ name: 'site_SPO_Id', type: 'varchar', length: 255, nullable: true })
  siteSPOId: string

  @ManyToOne(() => SiteCollectionEntity, (siteCollection) => siteCollection.documentLibraries)
  @JoinColumn({ name: 'site_collection_id' }) // Chỉ định cột khóa ngoại trong bảng DocumentLibrary
  siteCollection: SiteCollectionEntity // Mối quan hệ N-1 với SiteCollectionEntity

  @Column({ name: 'document_library_url', type: 'varchar', length: 255, nullable: true, unique: true })
  documentLibraryUrl?: string

  @OneToMany(() => MediaSharepointEntity, (mediaSharepoint) => mediaSharepoint.documentLibrary)
  mediaSharepoints: MediaSharepointEntity[] // Mối quan hệ 1-N với MediaSharepointEntity

  @Column({ name: 'document_SPO_Id', type: 'varchar', length: 255, nullable: false })
  documentSPOId: string
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
  @Column({ name: 'image_path', type: 'varchar', length: 255, nullable: true })
  imagePath?: string
  @Column({ name: 'media_extension', type: 'varchar', length: 10, nullable: true }) // Đuôi file
  mediaExtension?: string
  @Column({ name: 'media_video_duration', type: 'int', nullable: true })
  totalVideoDuration?: number // Tổng thời lượng video

  @Column({ name: 'document_SPO_Id', type: 'varchar', nullable: false })
  documentSPOId: string
  @Column({ name: 'document_library_id', type: 'varchar', nullable: false }) // Định nghĩa cột khóa ngoại
  documentLibraryId: string

  @Column({ name: 'file_SPO_Id', type: 'varchar', length: 255, nullable: true })
  fileSPOId?: string

  @ManyToOne(() => DocumentLibraryEntity, (documentLibrary) => documentLibrary.mediaSharepoints)
  @JoinColumn({ name: 'document_library_id' }) // Chỉ định cột khóa ngoại trong bảng MediaSharepoint
  documentLibrary: DocumentLibraryEntity // Mối quan hệ N-1 với DocumentLibraryEntity
}

export { DocumentLibraryEntity, MediaSharepointEntity, SiteCollectionEntity }
