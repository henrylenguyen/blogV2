import en from './messages/en.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}
