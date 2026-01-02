import { PageContent } from './components/sections/PageContent'
import { SideBar } from './components/sections/SideBar'
import { useTimeStore } from './hooks/useTimeStore'
import { useEffect } from 'react'

function App() {
  const setTime = useTimeStore((state) => state.setTime)
  const setContador = useTimeStore((state) => state.setContador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)

  useEffect(() => {
    const prev = sessionStorage.getItem('prev')
    if (prev) {
      setTime(JSON.parse(prev))
      setContador(parseInt(sessionStorage.getItem('contador')))
      setEstrategias()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className='drawer lg:drawer-open'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col items-center justify-center'>
          <PageContent />
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <SideBar />
        </div>
      </div>
    </>
  )
}

export default App
