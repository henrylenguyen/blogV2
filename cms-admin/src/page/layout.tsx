import NavbarAdmin from '@/components/layouts/navbarAdmin'
import { Outlet } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ILayoutAdminProps {}

const LayoutAdmin: React.FunctionComponent<ILayoutAdminProps> = ({ children }) => {
  return (
    <div className='container relative mx-auto flex min-h-screen w-full bg-neutral-800 text-white'>
      <NavbarAdmin />
      <main className='h-screen w-full overflow-x-hidden p-6'>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
