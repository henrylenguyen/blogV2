import * as Joi from 'joi'
import { validURL } from 'src/common/validate'
const carouselValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(255).messages({
    'any.required': 'Tên carousel là trường bắt buộc.',
    'string.min': 'Tên carousel phải có ít nhất {#limit} ký tự.',
    'string.max': 'Tên carousel không được vượt quá {#limit} ký tự.'
  }),
  imageUrl: Joi.string().required().max(255).pattern(validURL).messages({
    'any.required': 'Hình ảnh carousel là trường bắt buộc.',
    'string.max': 'Hình ảnh carousel không được vượt quá {#limit} ký tự.',
    'string.pattern.base': 'Hình ảnh carousel phải là một URL hợp lệ.'
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
  videoUrl: Joi.string().optional().max(255).pattern(validURL).messages({
    'string.max': 'Đường dẫn video không được vượt quá {#limit} ký tự.',
    'string.pattern.base': 'Video carousel phải là một URL hợp lệ.'
  }),
  isHasAnimation: Joi.boolean().optional().messages({
    'boolean.base': 'isHasAnimation phải là kiểu boolean.'
  }),
  animationType: Joi.string().optional().min(3).max(50).messages({
    'string.min': 'Loại hiệu ứng phải có ít nhất {#limit} ký tự.',
    'string.max': 'Loại hiệu ứng không được vượt quá {#limit} ký tự.'
  }),
  animationDuration: Joi.number().optional().min(100).messages({
    'number.min': 'Thời gian hiệu ứng phải lớn hơn hoặc bằng {#limit}ms.'
  }),
  animationDelay: Joi.number().optional().min(100).messages({
    'number.min': 'Thời gian chờ hiệu ứng phải lớn hơn hoặc bằng {#limit}ms.'
  }),
  isHasText: Joi.boolean().optional().messages({
    'boolean.base': 'isHasText phải là kiểu boolean.'
  }),
  text: Joi.string().optional().min(3).messages({
    'string.min': 'Nội dung text phải có ít nhất {#limit} ký tự.'
  }),
  textPosition: Joi.string().optional().min(3).max(50).messages({
    'string.min': 'Vị trí hiển thị text phải có ít nhất {#limit} ký tự.',
    'string.max': 'Vị trí hiển thị text không được vượt quá {#limit} ký tự.'
  }),
  coordinateX: Joi.number().optional().messages({
    'number.base': 'Tọa độ X của text phải là kiểu number.'
  }),
  coordinateY: Joi.number().optional().messages({
    'number.base': 'Tọa độ Y của text phải là kiểu number.'
  }),
  textColor: Joi.string().optional().min(3).max(20).messages({
    'string.min': 'Màu text phải có ít nhất {#limit} ký tự.',
    'string.max': 'Màu text không được vượt quá {#limit} ký tự.'
  }),
  textFontSize: Joi.number().optional().min(12).messages({
    'number.min': 'Kích thước text phải lớn hơn hoặc bằng {#limit}.'
  }),
  textFontWeight: Joi.number().optional().min(100).max(900).messages({
    'number.min': 'Độ đậm của text phải lớn hơn hoặc bằng {#limit}.',
    'number.max': 'Độ đậm của text không được vượt quá {#limit}.'
  }),
  textFontStyle: Joi.string().optional().max(20).messages({
    'string.max': 'Kiểu chữ của text không được vượt quá {#limit} ký tự'
  }),
  textFontFamily: Joi.string().optional().max(50).messages({
    'string.max': 'Font chữ của text không được vượt quá {#limit} ký tự.'
  }),
  isHasLink: Joi.boolean().optional().messages({
    'boolean.base': 'isHasLink phải là kiểu boolean.'
  }),
  link: Joi.string().optional().max(255).pattern(validURL).messages({
    'string.max': 'Đường dẫn link không được vượt quá {#limit} ký tự.',
    'string.pattern.base': 'Link bài viết phải là một URL hợp lệ.'
  })
})

export default carouselValidationSchema
