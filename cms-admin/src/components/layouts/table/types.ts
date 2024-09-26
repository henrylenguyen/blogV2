/**
 * ColumnModel: Mô hình cột
 * @key: là key duy nhất để xác định cột
 * @label: là header của cột
 * @render: là hàm render dữ liệu của cột
 * @sortable: có thể sắp xếp cột này hay không
 * @sortType: các loại sắp xếp khả dụng cho cột này, bao gồm: 'text', 'date', 'number'
 * @filterOtions: các tùy chọn bộ lọc cho cột này
 * @searchable: có thể tìm kiếm cột này hay không
 */

export interface ColumnModel {
  key: string
  label: string
  render?: (data: unknown) => React.ReactNode
  sortable?: boolean // Có thể sắp xếp cột này hay không
  sortType?: 'text' | 'date' | 'number' // Các loại sắp xếp khả dụng cho cột này
  filterOtions?: string[] // Các tùy chọn bộ lọc cho cột này
  searchable?: boolean // Có thể tìm kiếm cột này hay không
}

export interface UserData {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}
