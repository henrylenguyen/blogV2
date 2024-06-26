import { BaseEntities } from 'src/common/base.entities'
import { Column, Entity } from 'typeorm'

@Entity('carousels')
class CarouselEntiy extends BaseEntities {
  constructor() {
    super()
  }
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string
  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: false, unique: true })
  imageUrl: string
  @Column({ name: 'description', type: 'varchar', length: 255, nullable: false })
  description: string
  @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
  status: boolean
  @Column({ name: 'is_has_video', type: 'boolean', nullable: true })
  isHasVideo?: boolean
  @Column({ name: 'video_url', type: 'varchar', length: 255, nullable: true, unique: true })
  videoUrl?: string
  @Column({ name: 'is_has_animation', type: 'boolean', nullable: true })
  isHasAnimation?: boolean // Có hiệu ứng không
  @Column({ name: 'animation_type', type: 'varchar', length: 50, nullable: true })
  animationType?: string // Loại hiệu ứng
  @Column({ name: 'animation_duration', type: 'int', nullable: true })
  animationDuration?: number // Thời gian hiệu ứng
  @Column({ name: 'animation_delay', type: 'int', nullable: true })
  animationDelay?: number // Thời gian chờ hiệu ứng
  @Column({ name: 'is_has_text', type: 'boolean', nullable: true })
  isHasText?: boolean // Có text không
  @Column({ name: 'text', type: 'text', nullable: true })
  text?: string // Nội dung text
  @Column({ name: 'text_position', type: 'varchar', length: 50, nullable: true })
  textPosition?: string // Vị trí hiển thị text
  @Column({ name: 'coordinate_x', type: 'int', nullable: true })
  coordinateX?: number // Tọa độ X của text
  @Column({ name: 'coordinate_y', type: 'int', nullable: true })
  coordinateY?: number // Tọa độ Y của text
  @Column({ name: 'text_color', type: 'varchar', length: 20, nullable: true })
  textColor?: string // Màu text
  @Column({ name: 'text_font_size', type: 'tinyint', nullable: true })
  textFontSize?: number // Kích thước
  @Column({ name: 'text_font_weight', type: 'int', nullable: true })
  textFontWeight?: number // Độ đậm của text
  @Column({ name: 'text_font_style', type: 'varchar', length: 20, nullable: true })
  textFontStyle?: string // Kiểu chữ của text
  @Column({ name: 'text_font_family', type: 'varchar', length: 50, nullable: true })
  textFontFamily?: string // Font chữ của text
  @Column({ name: 'is_has_link', type: 'boolean', nullable: true })
  isHasLink?: boolean // Có link không
  @Column({ name: 'link', type: 'varchar', length: 255, nullable: true, unique: true })
  link?: string // Đường dẫn link
}

export default CarouselEntiy
