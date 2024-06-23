class Carousels {
  id?: string
  name?: string
  imageUrl?: string
  description?: string
  status?: boolean
  isHasVideo?: boolean
  videoUrl?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
  version?: number
  isHasAnimation?: boolean // Có hiệu ứng không
  animationType?: string // Loại hiệu ứng
  animationDuration?: number // Thời gian hiệu ứng
  animationDelay?: number // Thời gian chờ hiệu ứng
  isHasText?: boolean // Có text không
  text?: string // Nội dung text
  textPosition?: string // Vị trí hiển thị text
  coordinateX?: number // Tọa độ X của text
  coordinateY?: number // Tọa độ Y của text
  textColor?: string // Màu text
  textFontSize?: number // Kích thước text
  textFontWeight?: number // Độ đậm của text
  textFontStyle?: string // Kiểu chữ của text
  textFontFamily?: string // Font chữ của text
  isHasLink?: boolean // Có link không
  link?: string // Đường dẫn link
  constructor({
    id,
    name,
    imageUrl,
    status,
    isHasVideo,
    videoUrl,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    isHasAnimation,
    animationType,
    animationDuration,
    animationDelay,
    isHasText,
    text,
    textPosition,
    textColor,
    textFontSize,
    textFontWeight,
    textFontStyle,
    textFontFamily,
    isHasLink,
    link,
    coordinateX,
    coordinateY,
    description
  }) {
    if (id) this.id = id
    if (name) this.name = name
    if (imageUrl) this.imageUrl = imageUrl
    if (status) this.status = status
    if (isHasVideo) this.isHasVideo = isHasVideo
    if (videoUrl) this.videoUrl = videoUrl
    if (createdAt) this.createdAt = createdAt
    if (updatedAt) this.updatedAt = updatedAt
    if (deletedAt) this.deletedAt = deletedAt
    if (createdBy) this.createdBy = createdBy
    if (updatedBy) this.updatedBy = updatedBy
    if (deletedBy) this.deletedBy = deletedBy
    if (version) this.version = version
    if (isHasAnimation) this.isHasAnimation = isHasAnimation
    if (animationType) this.animationType = animationType
    if (animationDuration) this.animationDuration = animationDuration
    if (animationDelay) this.animationDelay = animationDelay
    if (isHasText) this.isHasText = isHasText
    if (text) this.text = text
    if (textPosition) this.textPosition = textPosition
    if (textColor) this.textColor = textColor
    if (textFontSize) this.textFontSize = textFontSize
    if (textFontWeight) this.textFontWeight = textFontWeight
    if (textFontStyle) this.textFontStyle = textFontStyle
    if (textFontFamily) this.textFontFamily = textFontFamily
    if (isHasLink) this.isHasLink = isHasLink
    if (link) this.link = link
    if (coordinateX) this.coordinateX = coordinateX
    if (coordinateY) this.coordinateY = coordinateY
    if (description) this.description = description
  }
}
export default Carousels
