import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { BaseDTO } from 'src/common/base.dto'

class CarouselDTO extends BaseDTO {
  constructor() {
    super()
  }

  @Expose()
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1718134292837-ce1963ed20ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8'
  })
  imageUrl: string
  @Expose()
  isHasVideo?: boolean
  @Expose()
  @ApiProperty({ required: false, example: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' })
  videoUrl?: string
  @Expose()
  isHasAnimation?: boolean
  @Expose()
  @ApiProperty({ required: false, example: 'bounce' })
  animationType?: string
  @Expose()
  @ApiProperty({ required: false, example: 1000 }) // tính bằng ms
  animationDuration?: number
  @Expose()
  @ApiProperty({ required: false, example: 1000 })
  animationDelay?: number
  @Expose()
  isHasText?: boolean
  @Expose()
  @ApiProperty({ required: false, example: 'Hello World' })
  text?: string
  @Expose()
  @ApiProperty({ required: false, example: 'top-left' })
  textPosition?: string
  @Expose()
  @ApiProperty({ required: false, example: 100 }) // tính bằng px
  coordinateX?: number
  @Expose()
  @ApiProperty({ required: false, example: 100 })
  coordinateY?: number
  @Expose()
  @ApiProperty({ required: false, example: '#000000' })
  textColor?: string
  @Expose()
  @ApiProperty({ required: false, example: 16 })
  textFontSize?: number
  @Expose()
  @ApiProperty({ required: false, example: 400 })
  textFontWeight?: number
  @Expose()
  @ApiProperty({ required: false, example: 'normal' })
  textFontStyle?: string
  @Expose()
  @ApiProperty({ required: false, example: 'Arial' })
  textFontFamily?: string
  @Expose()
  isHasLink?: boolean
  @Expose()
  @ApiProperty({ required: false, example: 'https://www.google.com' })
  link?: string
  @Expose()
  @ApiProperty({ required: false, example: new Date() })
  startAt: Date
  @Expose()
  @ApiProperty({ required: false, example: new Date() })
  endAt: Date
  @Expose()
  isActived: boolean
}
export default CarouselDTO
