import NavbarAdmin from '@/components/layouts/navbarAdmin'
import { Outlet } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ILayoutAdminProps {}

const LayoutAdmin: React.FunctionComponent<ILayoutAdminProps> = ({ children }) => {
  return (
    <div className='relative container w-full min-h-screen mx-auto flex bg-neutral-800 text-white'>
      <NavbarAdmin />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
