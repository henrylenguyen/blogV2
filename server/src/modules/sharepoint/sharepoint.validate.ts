import * as Joi from 'joi'
const sharepointValidate = (name: string) =>
  Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(30)
      .messages({
        'any.required': `Tên ${name} là trường bắt buộc.`,
        'string.min': `Tên ${name} phải có ít nhất {#limit} ký tự.`,
        'string.max': `Tên ${name} không được vượt quá {#limit} ký tự.`
      }),
    description: Joi.string()
      .required()
      .min(3)
      .max(30)
      .messages({
        'any.required': `Mô tả ${name} là trường bắt buộc.`,
        'string.min': `Mô tả ${name} phải có ít nhất {#limit} ký tự.`,
        'string.max': `Mô tả ${name} không được vượt quá {#limit} ký tự.`
      })
  })

const sharepointCreateDocumentLibrary = Joi.object({
  siteSPOId: Joi.string().required().messages({
    'any.required': 'site id là trường bắt buộc.',
    'string.base': 'site id phải là chuỗi.'
  }),
  siteCollectionId: Joi.string().required().messages({
    'any.required': 'site collection id là trường bắt buộc.',
    'string.base': 'site collection id phải là chuỗi.'
  }),
  name: Joi.string().required().min(3).max(30).messages({
    'any.required': `Tên document library là trường bắt buộc.`,
    'string.min': `Tên document library phải có ít nhất {#limit} ký tự.`,
    'string.max': `Tên document library không được vượt quá {#limit} ký tự.`
  }),
  description: Joi.string().required().min(3).max(30).messages({
    'any.required': `Mô tả document library là trường bắt buộc.`,
    'string.min': `Mô tả document library phải có ít nhất {#limit} ký tự.`,
    'string.max': `Mô tả document library không được vượt quá {#limit} ký tự.`
  })
})
const sharepointDeleteSiteCollectionValidate = () =>
  Joi.object({
    siteSPOId: Joi.string().required().messages({
      'any.required': 'site id là trường bắt buộc.',
      'string.base': 'site id phải là chuỗi.'
    })
  })

export { sharepointCreateDocumentLibrary, sharepointDeleteSiteCollectionValidate, sharepointValidate }
