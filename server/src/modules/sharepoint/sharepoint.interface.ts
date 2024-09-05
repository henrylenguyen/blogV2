import { BaseInterfaceRepository } from 'src/common/base.interface'
import { DocumentLibrary, MediaSharepoint, SiteCollection } from 'src/modules/sharepoint/sharepoint.model'

export interface ISiteCollection extends BaseInterfaceRepository<SiteCollection> {}

export interface IDocumentLibrary extends BaseInterfaceRepository<DocumentLibrary> {}

export interface IMediaSharepoint extends BaseInterfaceRepository<MediaSharepoint> {}
