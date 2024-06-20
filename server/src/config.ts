import { DocumentBuilder } from '@nestjs/swagger'

export const configSwagger = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('The API description')
  .setVersion('1.0')
  .build()
