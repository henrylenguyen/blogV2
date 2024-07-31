import { Client } from '@microsoft/microsoft-graph-client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'

@Injectable()
export class SharepointService {
  private client: Client

  constructor(private configService: ConfigService) {
    this.client = Client.init({
      authProvider: async (done) => {
        const tenantId = this.configService.get('AZURE_TENANT_ID')
        const clientId = this.configService.get('AZURE_CLIENT_ID')
        const clientSecret = this.configService.get('AZURE_CLIENT_SECRET')

        const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
        params.append('client_id', clientId)
        params.append('client_secret', clientSecret)
        params.append('scope', 'https://graph.microsoft.com/.default')

        const response = await fetch(url, {
          method: 'POST',
          body: params
        })

        const json = await response.json()
        console.log('json:', json)
        if (json.access_token) {
          done(null, json.access_token)
        } else {
          done(new Error('Failed to get access token'), null)
        }
      }
    })
  }

  async testConnection() {
    try {
      const response = await this.client.api('/sites/root').get()
      return response
    } catch (error) {
      throw new Error(`Failed to connect to SharePoint: ${error.message}`)
    }
  }

  async getSiteCollections() {
    try {
      return await this.client.api('/sites?search=*').get()
    } catch (error) {
      throw new Error(`Failed to get site collections: ${error.message}`)
    }
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

  async createSiteCollection(data: any) {
    const { displayName, description } = data
    const site = {
      displayName,
      description,
      siteCollection: {
        hostName: 'https://henlladev1812.sharepoint.com'
      },
      webTemplate: 'STS#3'
    }

    try {
      return await this.client.api('/sites').post(site)
    } catch (error) {
      throw new Error(`Failed to create site collection: ${error.message}`)
    }
  }

  async createLibrary(siteId: string, libraryName: string) {
    const library = {
      displayName: libraryName,
      list: {
        template: 'documentLibrary'
      }
    }

    try {
      return await this.client.api(`/sites/${siteId}/lists`).post(library)
    } catch (error) {
      throw new Error(`Failed to create library: ${error.message}`)
    }
  }

  async uploadFile(siteId: string, libraryId: string, fileName: string, fileContent: Buffer) {
    try {
      return await this.client.api(`/sites/${siteId}/drives/${libraryId}/root:/${fileName}:/content`).put(fileContent)
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`)
    }
  }
}
