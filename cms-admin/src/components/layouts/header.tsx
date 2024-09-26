interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className='bg-blue-600'>
      <h1>Header</h1>
    </header>
  )
}

export default Header
