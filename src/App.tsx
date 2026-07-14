import { ModalHelp } from './components/modal/modalHelp'
import { PageContent } from './components/sections/PageContent'
import { SideBar } from './components/sections/SideBar'
import { useTimeStore } from './context/useTimeStore'
import { useEffect } from 'react'
import type { Bloque } from './schemas/estrategia'
import { ModalAcciones } from './components/modal/ModalAcciones'

function App() {
  const setTime = useTimeStore((state) => state.setTime)
  const setContador = useTimeStore((state) => state.setContador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)
  const updateVelas = useTimeStore((state) => state.updateVelas)

  useEffect(() => {
    const previousTime = sessionStorage.getItem('prev')
    const previousContador = sessionStorage.getItem('contador')
    if (previousContador && previousTime) {
      setTime(JSON.parse(previousTime))
      setContador(Number.parseInt(previousContador) as Bloque)
      setEstrategias()
      updateVelas()
    }
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
      <ModalHelp />
      <ModalAcciones />
    </>
  )
}

export default App
