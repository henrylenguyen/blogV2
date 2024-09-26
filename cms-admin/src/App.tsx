import useRouteElement from '@/router'

function App() {
  const element = useRouteElement()
  return <div className='w-full'>{element}</div>
}

export default App
