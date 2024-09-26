import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './i18n/en.json'
import vi from './i18n/vi.json'

// Cấu hình các ngôn ngữ và cài đặt ban đầu
i18n
  .use(initReactI18next) // Kết nối với react-i18next
  .init({
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      }
    },
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không có bản dịch
    interpolation: {
      escapeValue: false // React đã tự động chống XSS
    }
  })

export default i18n
