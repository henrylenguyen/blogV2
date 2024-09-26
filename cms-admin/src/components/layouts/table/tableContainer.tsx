'use client'
import dataMock from '@/components/layouts/table/dataMock'
import { columns } from './columnModel'
import Table from './table'

const TableContainer: React.FC = () => {
  return (
    <div className='p-4'>
      <Table data={dataMock} columns={columns} />
    </div>
  )
}

export default TableContainer
