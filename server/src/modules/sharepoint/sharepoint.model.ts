import BaseModels from 'src/common/base.model'

export class SiteCollection extends BaseModels {
  siteCollectionUrl?: string
  siteId?: string
  constructor({
    id,
    name,
    siteCollectionUrl,
    siteId,
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
    if (siteId) this.siteId = siteId
  }
}

export class DocumentLibrary extends BaseModels {
  siteId: string
  documentLibraryUrl?: string
  constructor({
    id,
    name,
    sharepointID,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    description,
    status,
    documentLibraryUrl
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
    this.siteId = sharepointID
    if (documentLibraryUrl) this.documentLibraryUrl = documentLibraryUrl
  }
}

export class MediaSharepoint extends BaseModels {
  mediaUrl: string
  type?: string
  size?: number
  mediaSlug: string
  mediaThumbnail?: string
  mediaExtension?: string
  totalVideoDuration?: number
  documentLibraryID: string
  constructor({
    id,
    name,
    mediaUrl,
    type,
    size,
    mediaSlug,
    mediaThumbnail,
    mediaExtension,
    totalVideoDuration,
    documentLibraryID,
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
    this.mediaUrl = mediaUrl
    this.type = type
    this.size = size
    this.mediaSlug = mediaSlug
    this.mediaThumbnail = mediaThumbnail
    this.mediaExtension = mediaExtension
    this.totalVideoDuration = totalVideoDuration
    this.documentLibraryID = documentLibraryID
  }
}
