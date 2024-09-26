import { TableContainer } from '@/components/layouts/table'
import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className=' w-full'>
      <h1>Dashboard</h1>
      <TableContainer/>
    </div>
  )
}

export default Dashboard
