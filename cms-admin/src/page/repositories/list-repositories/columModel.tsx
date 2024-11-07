import { ColumnModel } from '@/components/layouts/table/types'
import { IDataSiteCollection } from '@/types/repositories'
import { formatDate } from '@/utils/format'

export const columnsSiteCollections: ColumnModel[] = [
  {
    key: 'id',
    label: 'ID',
    columnWidth: '300'
  },
  {
    key: 'name',
    label: 'title',
    sortable: true
  },
  {
    key: 'description',
    label: 'description',
    sortable: true,
    sortType: 'number'
  },
  {
    key: 'createdAt',
    label: 'createdAt',
    render: (row: unknown) => {
      return <div>{formatDate((row as IDataSiteCollection).createdAt)}</div>
    }
  },
  {
    key: 'updatedAt',
    label: 'updatedAt',
    filterOtions: ['relationship', 'single', 'complicated']
  },
  {
    key: 'createdBy',
    label: 'createdBy'
  },
  {
    key: 'updatedBy',
    label: 'updatedBy'
  },
  {
    key: 'action',
    label: '',
    render: (row) => (
      <div className='flex space-x-2'>
        <button className='rounded bg-blue-500 px-2 py-1 text-white'>Edit</button>
        <button className='rounded bg-red-500 px-2 py-1 text-white'>Delete</button>
      </div>
    )
  }
]
