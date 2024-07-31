import { ApiProperty } from '@nestjs/swagger'

class sharepointDTO {
  constructor() {}
  @ApiProperty({ required: true, example: 'name' })
  name: string
  @ApiProperty({ required: true, example: 'description' })
  description: string
}
export default sharepointDTO
