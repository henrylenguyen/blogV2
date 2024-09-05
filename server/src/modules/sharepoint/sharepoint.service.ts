import { ConfidentialClientApplication } from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { status } from 'src/common/base.enum'
import { getConfig } from 'src/config'
import { IDocumentLibrary, IMediaSharepoint, ISiteCollection } from 'src/modules/sharepoint/sharepoint.interface'

@Injectable()
export class SharepointService {
  private client: Client
  private accessToken: string
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
    const clientSecret = this.configService.get('AZURE_CLIENT_SECRET')
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_secret', clientSecret)
    params.append('client_id', clientId)
    params.append('scope', resource + '/.default')

    const result = await this.cca.acquireTokenByClientCredential({
      scopes: [resource + '/.default']
    })

    if (result.accessToken) {
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

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    })
    console.log('response', response)
    // Kiểm tra xem phản hồi có nội dung trước khi phân tích cú pháp JSON
    const text = await response.text()
    console.log('text:', text)
    if (text) {
      return JSON.parse(text)
    } else {
      return null
    }
  }

  async testConnection() {
    try {
      const response = await this.client.api('/sites').get()
      return response
    } catch (error) {
      throw new Error(`Failed to connect to SharePoint: ${error.message}`)
    }
  }

  async getSiteCollections() {
    try {
      return await this.siteCollectionRepository.findAll()
    } catch (error) {
      throw new Error(`Failed to get site collections: ${error.message}`)
    }
  }

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
        const data = result.d.Create
        return await this.siteCollectionRepository.create({
          siteId: data.SiteId,
          name,
          status: status.ACTIVE,
          createdBy: 'admin',
          siteCollectionUrl: data.SiteUrl,
          description
        })
      } else {
        throw new Error('Failed to create site collection')
      }
    }
  }

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
  async createLibrary(siteId: string, { description, name }: any) {
    const library = {
      displayName: name,
      description,
      list: {
        template: 'documentLibrary'
      }
    }

    return await this.client.api(`/sites/${siteId}/lists`).post(JSON.stringify(library))
  }

  async updateLibrary(siteName: string, libraryName: string, data: any) {
    const { description, name } = data
    const url = `${this.configService.get<string>('AZURE_SITE_ENDPOINT')}/${siteName}/_api/web/lists/GetByTitle('${libraryName}')`
    const library = {
      __metadata: { type: 'SP.List' },
      Description: description,
      Title: name
    }
    return this.makeRequest(url, 'POST', library, { 'X-HTTP-Method': 'MERGE', 'If-Match': '*' })
  }
  async deleteLibrary(siteName: string, libraryName: string) {
    const url = `${this.configService.get<string>('AZURE_SITE_ENDPOINT')}/${siteName}/_api/web/lists/GetByTitle('${libraryName}')`
    return this.makeRequest(url, 'POST', null, { 'X-HTTP-Method': 'DELETE', 'If-Match': '*' })
  }
  async getDocumentLibraries(siteId: string) {
    try {
      return await this.client.api(`/sites/${siteId}/drives`).get()
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

  async uploadFile(siteId: string, libraryId: string, fileName: string, fileContent: Buffer) {
    return await this.client.api(`/sites/${siteId}/drives/${libraryId}/root:/${fileName}:/content`).put(fileContent)
  }
}
