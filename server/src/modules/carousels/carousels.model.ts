import BaseModels from 'src/common/base.model'

class Carousels extends BaseModels {
  imageUrl?: string
  videoUrl?: string
  animationType?: string // Loại hiệu ứng
  animationDuration?: number // Thời gian hiệu ứng
  animationDelay?: number // Thời gian chờ hiệu ứng
  text?: string // Nội dung text
  textPosition?: string // Vị trí hiển thị text
  coordinateX?: number // Tọa độ X của text
  coordinateY?: number // Tọa độ Y của text
  textColor?: string // Màu text
  textFontSize?: number // Kích thước text
  textFontWeight?: number // Độ đậm của text
  textFontStyle?: string // Kiểu chữ của text
  textFontFamily?: string // Font chữ của text
  link?: string // Đường dẫn link
  startAt?: Date
  endAt?: Date
  isActived?: boolean
  constructor({
    id,
    name,
    imageUrl,
    status,
    videoUrl,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    animationType,
    animationDuration,
    animationDelay,
    text,
    textPosition,
    textColor,
    textFontSize,
    textFontWeight,
    textFontStyle,
    textFontFamily,
    link,
    coordinateX,
    coordinateY,
    description,
    startAt,
    endAt,
    isActived
  }) {
    super({
      id,
      name,
      status,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
      version,
      description
    })
    if (imageUrl) this.imageUrl = imageUrl
    if (videoUrl) this.videoUrl = videoUrl
    if (animationType) this.animationType = animationType
    if (animationDuration) this.animationDuration = animationDuration
    if (animationDelay) this.animationDelay = animationDelay
    if (text) this.text = text
    if (textPosition) this.textPosition = textPosition
    if (textColor) this.textColor = textColor
    if (textFontSize) this.textFontSize = textFontSize
    if (textFontWeight) this.textFontWeight = textFontWeight
    if (textFontStyle) this.textFontStyle = textFontStyle
    if (textFontFamily) this.textFontFamily = textFontFamily
    if (link) this.link = link
    if (coordinateX) this.coordinateX = coordinateX
    if (coordinateY) this.coordinateY = coordinateY
    if (startAt) this.startAt = startAt
    if (endAt) this.endAt = endAt
    if (isActived) this.isActived = isActived
  }
}
export default Carousels
