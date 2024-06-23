import * as Joi from 'joi'
const carouselValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(255).messages({
    'any.required': 'Tên carousel là trường bắt buộc.',
    'string.min': 'Tên carousel phải có ít nhất {#limit} ký tự.',
    'string.max': 'Tên carousel không được vượt quá {#limit} ký tự.'
  }),
  imageUrl: Joi.string().required().max(255).messages({
    'any.required': 'Hình ảnh carousel là trường bắt buộc.',
    'string.max': 'Hình ảnh carousel không được vượt quá {#limit} ký tự.'
  }),
  createdBy: Joi.string().required().max(255).messages({
    'any.required': 'Người tạo là trường bắt buộc.',
    'string.max': 'Người tạo không được vượt quá {#limit} ký tự.'
  }),
  description: Joi.string().required().min(10).max(255).messages({
    'any.required': 'Mô tả carousel là trường bắt buộc.',
    'string.min': 'Mô tả carousel phải có ít nhất {#limit} ký tự.',
    'string.max': 'Mô tả carousel không được vượt quá {#limit} ký tự.'
  }),
  videoUrl: Joi.string().optional(),
  isHasAnimation: Joi.boolean().optional(),
  animationType: Joi.string().optional(),
  animationDuration: Joi.number().optional(),
  animationDelay: Joi.number().optional(),
  isHasText: Joi.boolean().optional(),
  text: Joi.string().optional(),
  textPosition: Joi.string().optional(),
  coordinateX: Joi.number().optional(),
  coordinateY: Joi.number().optional(),
  textColor: Joi.string().optional(),
  textFontSize: Joi.number().optional(),
  textFontWeight: Joi.number().optional(),
  textFontStyle: Joi.string().optional(),
  textFontFamily: Joi.string().optional(),
  isHasLink: Joi.boolean().optional(),
  link: Joi.string().optional()
})

export default carouselValidationSchema
