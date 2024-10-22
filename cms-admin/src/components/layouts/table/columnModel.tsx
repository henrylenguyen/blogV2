import { ColumnModel } from '@/components/layouts/table/types'

export const columns: ColumnModel[] = [
  {
    key: '',
    label: 'First Name',
    searchable: true
  },
  {
    key: 'lastName',
    label: 'Last Name',
    sortable: true,
  },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    sortType: 'number'
  },
  {
    key: 'visits',
    label: 'visits',
  },
  {
    key: 'status',
    label: 'Status',
    filterOtions: ['relationship', 'single', 'complicated']
  },
  {
    key: 'progress',
    label: 'Profile Progress'
  },
  {
    key: 'action',
    label: '',
    render: (row) => (
      <div className='flex space-x-2'>
        <button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button>
        <button className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
      </div>
    ),
    hideable: false
  }
]
