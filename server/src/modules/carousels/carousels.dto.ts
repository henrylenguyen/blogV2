import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { BaseDTO } from 'src/common/base.dto'

class CarouselDTO extends BaseDTO {
  constructor() {
    super()
  }
  @Expose()
  @ApiProperty()
  name: string
  @Expose()
  @ApiProperty()
  description: string
  @Expose()
  @ApiProperty()
  imageUrl: string
  @Expose()
  order: number
  @Expose()
  status: boolean
  @Expose()
  isHasVideo?: boolean
  @Expose()
  @ApiProperty({ required: false })
  videoUrl?: string
  @Expose()
  @ApiProperty({ required: false })
  isHasAnimation?: boolean
  @Expose()
  @ApiProperty({ required: false })
  animationType?: string
  @Expose()
  @ApiProperty({ required: false })
  animationDuration?: number
  @Expose()
  @ApiProperty({ required: false })
  animationDelay?: number
  @Expose()
  @ApiProperty({ required: false })
  isHasText?: boolean
  @Expose()
  @ApiProperty({ required: false })
  text?: string
  @Expose()
  @ApiProperty({ required: false })
  textPosition?: string
  @Expose()
  @ApiProperty({ required: false })
  coordinateX?: number
  @Expose()
  @ApiProperty({ required: false })
  coordinateY?: number
  @Expose()
  @ApiProperty({ required: false })
  textColor?: string
  @Expose()
  @ApiProperty({ required: false })
  textFontSize?: number
  @Expose()
  @ApiProperty({ required: false })
  textFontWeight?: number
  @Expose()
  @ApiProperty({ required: false })
  textFontStyle?: string
  @Expose()
  @ApiProperty({ required: false })
  textFontFamily?: string
  @Expose()
  @ApiProperty({ required: false })
  isHasLink?: boolean
  @Expose()
  @ApiProperty({ required: false })
  link?: string
}
export default CarouselDTO
