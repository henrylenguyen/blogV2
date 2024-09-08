import { ConfidentialClientApplication } from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { status } from 'src/common/base.enum'
import { getConfig } from 'src/config'
import {
  SharepointCreateDocumentLibraryDTO,
  SharepointDeleteDocumentLibraryDTO,
  SharepointGetImageDTO,
  SharepointUpdateDocumentLibraryDTO,
  SharepointUploadFileDTO
} from 'src/modules/sharepoint/sharepoint.dto'
import { IDocumentLibrary, IMediaSharepoint, ISiteCollection } from 'src/modules/sharepoint/sharepoint.interface'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class SharepointService {
  private client: Client
  private accessToken: string
  private accessTokenAdmin: string
  private cca: ConfidentialClientApplication

  constructor(
    @Inject('ISiteCollectionRepository')
    private readonly siteCollectionRepository: ISiteCollection,
    @Inject('IDocumentLibraryRepository')
    private readonly documentLibraryRepository: IDocumentLibrary,
    @Inject('IMediaSharepointRepository')
    private readonly mediaSharepointRepository: IMediaSharepoint,
    private configService: ConfigService
  ) {
    const config = getConfig(configService)
    this.cca = new ConfidentialClientApplication(config)

    this.client = Client.init({
      authProvider: async (done) => {
        const result = await this.cca.acquireTokenByClientCredential({
          scopes: config.scopes
        })
        if (result.accessToken) {
          done(null, result.accessToken)
        } else {
          done(new Error('Failed to get access token'), null)
        }
      }
    })
    this.authenticate()
  }

  private async authenticate() {
    const clientId = this.configService.get('AZURE_CLIENT_ID')
    const resource = this.configService.get('AZURE_RESOURCE')
    const resourceAdmin = this.configService.get('AZURE_ADMIN_RESOURCE')
    const clientSecret = this.configService.get('AZURE_CLIENT_SECRET')
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_secret', clientSecret)
    params.append('client_id', clientId)
    params.append('scope', resource + '/.default')

    const result = await this.cca.acquireTokenByClientCredential({
      scopes: [resource + '/.default']
    })
    const resultAdmin = await this.cca.acquireTokenByClientCredential({
      scopes: [resourceAdmin + '/.default']
    })

    if (result.accessToken && resultAdmin.accessToken) {
      this.accessTokenAdmin = resultAdmin.accessToken
      this.accessToken = result.accessToken
    } else {
      throw new Error('Failed to get access token')
    }
  }
  // -------------------TẠO MỘT PHƯƠNG THỨC MỚI ĐỂ GỌI API SHAREPOINT---------------------------
  private async makeRequest(url: string, method: string, body: any = null, config: any = {}) {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      ...config
    }

    let response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    })

    // Check if the response has an error indicating the token is expired
    const text = await response.text()
    console.log('text:', text)

    if (text) {
      const responseData = JSON.parse(text)
      if (responseData.error_description && responseData.error_description.includes('The token is expired')) {
        console.log('Token expired. Refreshing token...')

        // Refresh the token
        await this.authenticate()

        // Update the headers with the new token
        headers.Authorization = `Bearer ${this.accessToken}`

        // Retry the request with the new token
        response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null
        })

        const retryText = await response.text()
        return retryText ? JSON.parse(retryText) : null
      }

      return responseData
    } else {
      return null
    }
  }

  // --------------TẠO MỘT PHƯƠNG THỨC ĐỂ GỌI API PATCH SHAREPOINT ADMIN---------------------------
  private async makePatchRequest(url: string, body: any, customHeaders: Record<string, string> = {}) {
    const headers = {
      Authorization: `Bearer ${this.accessTokenAdmin}`,
      Accept: 'application/json',
      'Accept-Language': 'en,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,ar;q=0.5',
      'Content-Type': 'application/json',
      'OData-Version': '4.0',
      Referer: 'https://henlladev1812-admin.sharepoint.com', // thêm đúng Referer
      ...customHeaders // các header bổ sung từ cURL
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })

    const text = await response.text()
    console.log('Response text patch:', text)

    if (text) {
      return JSON.parse(text)
    } else {
      return null
    }
  }

  private async enableSharing(siteId: string) {
    const url = `${this.configService.get('AZURE_DOMAIN_ADMIN_MANAGER_ENDPOINT')}/sites('${siteId}')`
    const body = {
      SharingCapability: 2 // anyone
    }

    const customHeaders = {
      OriginalCorrelationId: '1d1f4ea1-707e-3000-a9ec-f7fffcf4516c',
      SDKVersion: 'SPFx/TenantAdmin/6e1c1298-7b8e-4a08-a24f-769aafae45c5'
      // thêm các header từ cURL
    }

    const response = await this.makePatchRequest(url, body, customHeaders)

    try {
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
  // ------------------CÁC PHƯƠNG THỨC SHAREPOINT---------------------------
  async testConnection() {
    try {
      const response = await this.client.api('/sites').get()
      return response
    } catch (error) {
      throw new Error(`Failed to connect to SharePoint: ${error.message}`)
    }
  }

  // -----------------Lấy tất cả các site collection---------------------------
  async getSiteCollections() {
    try {
      return await this.siteCollectionRepository.findAll()
    } catch (error) {
      throw new Error(`Failed to get site collections: ${error.message}`)
    }
  }

  // -------------------Tạo một site collection mới---------------------------
  async createSiteCollection(data: any) {
    const { name, description } = data
    const response = await this.siteCollectionRepository.exists('name', name)
    if (response) {
      return false
    } else {
      const url = `${this.configService.get('AZURE_API_SITE_MANAGER_ENDPOINT')}/create`
      const site = {
        request: {
          Title: name,
          Url: `${this.configService.get<string>('AZURE_SITE_ENDPOINT')}/${name}`,
          Lcid: 1033, // English
          ShareByEmailEnabled: false,
          Classification: 'Low Business Impact',
          Description: description,
          WebTemplate: this.configService.get('AZURE_WEB_TEMPLATE'),
          SiteDesignId: this.configService.get('AZURE_SITE_DESIGN_ID'),
          Owner: this.configService.get('AZURE_OWNER'),
          WebTemplateExtensionId: '00000000-0000-0000-0000-000000000000'
        }
      }

      const res: Promise<{
        d: {
          Create: {
            __metadata: {
              type: string
            }
            SiteId: string
            SiteStatus: number
            SiteUrl: string
          }
        }
      }> = this.makeRequest(url, 'POST', site)

      const result = await res
      if (result && result.d.Create.SiteStatus === 2) {
        const dataResponse = result.d.Create

        // Bước 2: Bật chia sẻ cho site collection mới tạo
        const res = await this.enableSharing(dataResponse.SiteId)
        try {
          if (res?.IsComplete) {
            const dataResponse = result.d.Create
            return await this.siteCollectionRepository.create({
              siteId: dataResponse.SiteId,
              name,
              status: status.ACTIVE,
              createdBy: 'admin',
              siteCollectionUrl: dataResponse.SiteUrl,
              description
            })
          } else {
            throw new Error('Failed to enable sharing on the site')
          }
        } catch (error) {
          throw new Error(error)
        }
      } else {
        throw new Error('Failed to create site collection')
      }
    }
  }

  // -------------------Xóa site collection---------------------------
  async deleteSiteCollection({ siteId }: any) {
    const url = `${this.configService.get<string>('AZURE_API_SITE_MANAGER_ENDPOINT')}/delete`
    const site = {
      siteId
    }

    const res = await this.makeRequest(url, 'POST', site)
    if (res && res.d) {
      return await this.siteCollectionRepository.deleteByCondition('siteId', siteId)
    } else if (res && res.error) {
      return res
    } else {
      throw new Error('Failed to delete site collection')
    }
  }
  // -------------------Tạo một document library mới---------------------------
  async createLibrary(data: SharepointCreateDocumentLibraryDTO) {
    const { siteId, siteCollectionId, name, description } = data
    const library = {
      displayName: name,
      description,
      list: {
        template: 'documentLibrary'
      }
    }

    // Tạo Document Library và lấy thông tin ban đầu
    const res = await this.client.api(`/sites/${siteId}/lists`).post(JSON.stringify(library))

    try {
      if (res) {
        // Gọi Graph API để lấy ID mã hóa (driveId)
        const driveRes = await this.client.api(`/sites/${siteId}/drives`).get()

        // Tìm `driveId` tương ứng với Document Library
        const drive = driveRes.value.find((d) => d.name === name)
        const driveId = drive ? drive.id : null

        // Tạo bản ghi Document Library trong cơ sở dữ liệu
        return await this.documentLibraryRepository.create({
          siteCollectionId,
          siteId,
          name,
          description,
          documentLibraryUrl: res.webUrl,
          status: status.ACTIVE,
          createdBy: 'admin',
          documentLibraryID: driveId
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // -------------------Cập nhật document library---------------------------
  async updateLibrary(data: SharepointUpdateDocumentLibraryDTO) {
    const { description, libraryOldName, libraryNewName, siteName, libraryId } = data
    const findLibraryOldName = await this.documentLibraryRepository.findOneByCondition({
      name: libraryOldName
    })
    if (findLibraryOldName) {
      const findLibrary = await this.documentLibraryRepository.findOneByCondition({
        name: libraryNewName
      })
      if (!findLibrary) {
        const url = `${this.configService.get<string>('AZURE_SITE_ENDPOINT')}/${siteName}/_api/web/lists/GetByTitle('${libraryOldName}')`
        const library = {
          __metadata: { type: 'SP.List' },
          Description: description,
          Title: libraryNewName
        }
        const res = await this.makeRequest(url, 'POST', library, { 'X-HTTP-Method': 'MERGE', 'If-Match': '*' })

        try {
          if (res === null) {
            return await this.documentLibraryRepository.update(libraryId, {
              name: libraryNewName,
              description,
              updatedBy: 'admin',
              documentLibraryUrl: `${this.configService.get<string>('AZURE_SITE_ENDPOINT')}/${siteName}/${libraryNewName}`
            })
          } else {
            return res
          }
        } catch (error) {
          throw new Error(error)
        }
      } else {
        return false
      }
    } else {
      return null
    }
  }
  // -------------------Xóa document library---------------------------
  async deleteLibrary(data: SharepointDeleteDocumentLibraryDTO) {
    const { libraryName, siteName, siteId } = data
    const url = `${this.configService.get<string>('AZURE_SITE_ENDPOINT')}/${siteName}/_api/web/lists/GetByTitle('${libraryName}')`
    const res = await this.makeRequest(url, 'POST', null, { 'X-HTTP-Method': 'DELETE', 'If-Match': '*' })

    try {
      if (res?.error) {
        return res.error
      } else {
        return await this.documentLibraryRepository.deleteByCondition('siteCollectionId', siteId)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  // -------------------Xóa mềm document library---------------------------

  async softDeleteLibrary(libraryId: string) {
    const res = await this.documentLibraryRepository.softDelete(libraryId)
    if (res) {
      await this.documentLibraryRepository.update(libraryId, {
        status: status.INACTIVE,
        deletedBy: 'admin'
      })
      return true
    }
    return false
  }
  // -------------------Khôi phục document library---------------------------
  async recoverLibrary(libraryId: string) {
    const res = await this.documentLibraryRepository.recoverDelete(libraryId)
    if (res) {
      await this.documentLibraryRepository.update(libraryId, {
        status: status.ACTIVE,
        updatedBy: 'admin',
        deletedAt: null,
        deletedBy: null
      })
      return true
    }
    return false
  }
  // ------Lấy tất cả document library đã bị xóa mềm---------------------------
  async getDeletedLibraries(siteId: string) {
    return await this.documentLibraryRepository.findAllSoftDeleted({
      siteId
    })
  }
  // -----------------Lấy tất cả các document library---------------------------
  async getDocumentLibraries(siteId: string) {
    try {
      return await this.client.api(`/sites/${siteId}/drives`).get()
      // return await this.documentLibraryRepository.findByCondition({
      //   siteId
      // })
    } catch (error) {
      throw new Error(`Failed to get document libraries: ${error.message}`)
    }
  }

  async getFilesInLibrary(siteId: string, libraryId: string) {
    try {
      return await this.client.api(`/sites/${siteId}/drives/${libraryId}/root/children`).get()
    } catch (error) {
      throw new Error(`Failed to get files in library: ${error.message}`)
    }
  }

  async uploadFile(data: SharepointUploadFileDTO, file: any) {
    const { siteId, libraryId, description, isForceUpdate } = data
    const { originalname, buffer, mimetype, size } = file
    const extension = originalname.split('.').pop()
    const existData = await this.mediaSharepointRepository.findOneByCondition({
      name: originalname.split('.').shift()
    })

    if (existData) {
      if (isForceUpdate) {
        return await this.mediaSharepointRepository.update(existData.id, {
          documentLibraryID: libraryId,
          name: originalname.split('.').shift(), // Tên file
          updatedBy: 'admin',
          status: status.ACTIVE,
          size,
          type: mimetype,
          mediaUrl: existData.mediaUrl,
          mediaExtension: extension,
          mediaSlug: existData.mediaSlug,
          description
        })
      } else {
        const newName = `${originalname.split('.').shift()}_${uuidv4()}.${extension}`
        const res = await this.client.api(`/sites/${siteId}/drives/${libraryId}/root:/${newName}:/content`).put(buffer)
        const shareLinkResponse = await this.client
          .api(`/sites/${siteId}/drives/${libraryId}/items/${res.id}/createLink`)
          .post({
            type: 'view', // hoặc 'edit' nếu bạn muốn cấp quyền chỉnh sửa
            scope: 'anonymous' // Tạo liên kết công khai
          })
        console.log('shareLinkResponse:', shareLinkResponse)

        // Lấy liên kết công khai từ kết quả trả về
        const publicUrl = shareLinkResponse.link.webUrl
        console.log('publicUrl:', publicUrl)
        try {
          if (res) {
            return await this.mediaSharepointRepository.create({
              documentLibraryID: libraryId,
              name: newName.split('.').shift(), // Tên file
              createdBy: 'admin',
              status: status.ACTIVE,
              size,
              type: mimetype,
              mediaUrl: res.webUrl,
              mediaExtension: extension,
              mediaSlug: newName.split('.').shift(),
              description
            })
          }
        } catch (error) {
          throw new Error(error)
        }
      }
    } else {
      const res = await this.client
        .api(`/sites/${siteId}/drives/${libraryId}/root:/${originalname}:/content`)
        .put(buffer)

      try {
        if (res) {
          return await this.mediaSharepointRepository.create({
            documentLibraryID: libraryId,
            name: originalname.split('.').shift(), // Tên file
            createdBy: 'admin',
            status: status.ACTIVE,
            size,
            type: mimetype,
            mediaUrl: res.webUrl,
            mediaExtension: extension,
            mediaSlug: `${uuidv4()}.${extension}`,
            description
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    file.buffer = null // Xóa bộ đệm
  }
  async getImageInLibrary(data: SharepointGetImageDTO) {
    const { fileId, documentLibraryName, siteCollectionName } = data
    try {
      const res = await this.mediaSharepointRepository.findOneByCondition({
        id: fileId
      })
      console.log('res:', res)
      if (res) {
        //  "mediaUrl": "https://henlladev1812.sharepoint.com/sites/name15/Shared%20Documents/H%C3%83%C2%ACnh%2013.jpg",
        const imageName = res.mediaUrl.split('/').pop()
        console.log('imageName:', imageName)

        //`https://yzx43.sharepoint.com/sites/FamilyTree/_api/web/GetFileByServerRelativeUrl('/sites/FamilyTree/Avatars/${imageName}')/$value?binaryStringResponseBody=true`,
        try {
          const url = `${this.configService.get('AZURE_SITE_ENDPOINT')}/${siteCollectionName}/_api/web/GetFileByServerRelativeUrl('/sites/${siteCollectionName}/${documentLibraryName}/${imageName}')/$value?binaryStringResponseBody=true`
          const responseData = await this.makeRequest(url, 'GET', null, {
            'Content-Type': 'image/jpeg',
            Accept: 'image/jpeg'
          })
          // console.log('responseData:', responseData)
        } catch (error) {
          throw new Error(`Failed to get image in library: ${error.message}`)
        }
        return res
      }
    } catch (error) {
      throw new Error(`Failed to get images in library: ${error.message}`)
    }
  }
}
