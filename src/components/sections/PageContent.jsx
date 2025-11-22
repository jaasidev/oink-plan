import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Reloj } from '../Reloj/Reloj'
import { Estrategias } from './Estrategias'
import { TimeSection } from './TimeSection'
import { useDrop } from '../../hooks/useDrop'
import { Hero } from '../Hero/Hero'

export function PageContent() {
  const time = useDrop()
  

  return (
    <>
      <main className='h-screen w-full flex flex-col'>
        <Header />

        <div className='grow overflow-y-auto' >
          {time?.length > 0 ? (
            <>
              <Reloj />
              <TimeSection />
              <Estrategias />
            </>
          ) : (
            <>
              <Hero />
            </>
          )}
        </div>
        <Footer counter='Reloj' />
      </main>
    </>
  )
}
