import BaseModels from 'src/common/base.model'

export class SiteCollection extends BaseModels {
  siteCollectionUrl?: string
  siteSPOId?: string
  constructor({
    id,
    name,
    siteCollectionUrl,
    siteSPOId,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    description,
    status
  }) {
    super({
      id,
      name,
      status,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
      version,
      description
    })
    if (siteCollectionUrl) this.siteCollectionUrl = siteCollectionUrl
    if (siteSPOId) this.siteSPOId = siteSPOId
  }
}

export class DocumentLibrary extends BaseModels {
  siteCollectionId?: string
  siteSPOId?: string
  documentLibraryUrl?: string
  documentSPOId?: string

  constructor({
    id,
    name,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    description,
    status,
    documentLibraryUrl,
    siteCollectionId,
    siteSPOId,
    documentSPOId
  }) {
    super({
      id,
      name,
      status,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
      version,
      description
    })
    if (siteCollectionId) this.siteCollectionId = siteCollectionId
    if (documentLibraryUrl) this.documentLibraryUrl = documentLibraryUrl
    if (siteSPOId) this.siteSPOId = siteSPOId
    if (documentSPOId) this.documentSPOId = documentSPOId
  }
}

export class MediaSharepoint extends BaseModels {
  mediaUrl: string
  type?: string
  size?: number
  imagePath?: string
  mediaExtension?: string
  totalVideoDuration?: number
  documentSPOId: string
  documentLibraryId: string
  fileSPOId?: string
  constructor({
    id,
    name,
    mediaUrl,
    type,
    size,
    imagePath,
    mediaExtension,
    totalVideoDuration,
    documentSPOId,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    description,
    status,
    documentLibraryId,
    fileSPOId
  }) {
    super({
      id,
      name,
      status,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
      version,
      description
    })
    this.mediaUrl = mediaUrl
    this.type = type
    this.size = size
    this.imagePath = imagePath
    this.mediaExtension = mediaExtension
    this.totalVideoDuration = totalVideoDuration
    this.documentSPOId = documentSPOId
    this.documentLibraryId = documentLibraryId
    this.fileSPOId = fileSPOId
  }
}
