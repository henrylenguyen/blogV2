import NavbarAdmin from '@/components/layouts/navbarAdmin'

interface ILayoutAdminProps {
  children: React.ReactNode
}

const LayoutAdmin: React.FunctionComponent<ILayoutAdminProps> = ({ children }) => {
  return (
    <div className='relative container min-h-screen mx-auto flex bg-neutral-800 text-white'>
      <NavbarAdmin />
      <main>{children}</main>
    </div>
  )
}

export default LayoutAdmin
