import { CardEstrategia } from '../cards/CardEstrategia'
import { useTimeStore } from '../../hooks/useTimeStore'

export function Estrategias() {
  const estrategias = useTimeStore(state => state.estrategias)
  const time = useTimeStore(state => state.time)

  return (
    <>
      <h2 className='text-center mt-10 mb-4 text-2xl font-bold'>Estrategias</h2>
      <section className='grid grid-layout p-6 pt-2 gap-7 justify-items-center'>
        {
          estrategias.sort((a, b) => b.estrategia(time).confiabilidad - a.estrategia(time).confiabilidad).map((value, index) => {
            return (
              <CardEstrategia description={value.description} name={value.title} key={index} velaUno={value.estrategia(time).uno} velaDos={value.estrategia(time).dos} velaTres={value.estrategia(time).tres} confiabilidad={value.estrategia(time).confiabilidad} prediccion={value.estrategia(time).prediccion} />
            )
          })
        }
      </section>
    </>
  )
}
