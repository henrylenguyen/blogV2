import { ColumnModel } from '@/components/layouts/table/types'

// ColumnModel.ts
export const columns: ColumnModel[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    filterable: true
  },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    filterable: true,
    filterType: 'range' // Thêm loại bộ lọc phạm vi
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    filterable: true
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
    filterable: true,
    filterType: 'date' // Bộ lọc theo ngày
  },
  {
    key: 'action',
    label: '',
    render: (row) => (
      <div className='flex space-x-2'>
        <button className='rounded bg-blue-500 px-2 py-1 text-white'>Edit</button>
        <button className='rounded bg-red-500 px-2 py-1 text-white'>Delete</button>
      </div>
    ),
    hideable: false
  }
]
