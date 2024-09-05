import { DocumentBuilder } from '@nestjs/swagger'

export const configSwagger = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('The API description')
  .setVersion('1.0')
  .build()
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import path from 'path'

export const getConfig = (configService: ConfigService) => ({
  auth: {
    clientId: configService.get<string>('AZURE_CLIENT_ID'),
    authority: `https://login.microsoftonline.com/${configService.get<string>('AZURE_TENANT_ID')}`,
    clientCertificate: {
      thumbprint: configService.get<string>('AZURE_THUMBPRINT'),
      privateKey: fs.readFileSync(path.join(__dirname, '../../certificates/decrypted_private_key.pem'), 'utf8')
    }
  },
  scopes: ['https://graph.microsoft.com/.default']
})
