export interface ColumnModel {
  key: string
  label: string
  render?: (data: any) => React.ReactNode
  sortable?: boolean
  sortOptions?: string[] // Các loại sắp xếp khả dụng cho cột này
  filterable?: boolean
  filterType?: 'range' | 'date' | 'multiSelect'
  isSortDate?: boolean // Biến xác định nếu cột này là ngày tháng
  resizable?: boolean
  hideable?: boolean
}
