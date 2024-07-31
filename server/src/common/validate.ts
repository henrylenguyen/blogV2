import * as Joi from 'joi'

export const validURL = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i'
)
export const validPagination = Joi.object({
  page: Joi.number().integer().min(1).required().messages({
    'any.required': 'Trang là trường bắt buộc.',
    'number.min': 'Trang phải lớn hơn hoặc bằng {#limit}.', // {#limit} sẽ được thay thế bằng giá trị 1
    'number.integer': 'Trang phải là kiểu số nguyên.'
  }),
  limit: Joi.number().integer().min(1).max(100).required().messages({
    'any.required': 'Số lượng bản ghi trên mỗi trang là trường bắt buộc.',
    'number.min': 'Số lượng bản ghi trên mỗi trang phải lớn hơn hoặc bằng {#limit}.', // {#limit} sẽ được thay thế bằng giá trị 1
    'number.max': 'Số lượng bản ghi trên mỗi trang không được vượt quá {#limit}.', // {#limit} sẽ được thay thế bằng giá trị 100
    'number.integer': 'Số lượng bản ghi trên mỗi trang phải là kiểu số nguyên.'
  })
})
