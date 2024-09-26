// src/types/react-i18next.d.ts
import 'react-i18next'

// Tạo kiểu dữ liệu cho các key bản dịch của bạn
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'vi'
    resources: {
      vi: typeof import('./i18n/vi.json')
      en: typeof import('./i18n/en.json')
    }
  }
}
