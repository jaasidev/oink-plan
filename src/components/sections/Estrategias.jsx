import { CardEstrategia } from '../cards/CardEstrategia'
import { useEstrategia } from '../../hooks/useEstrategia'

export function Estrategias() {
  const { lista, time, handleClick, todos } = useEstrategia()

  return (
    <>
      <h2 className='text-center mt-10 mb-4 text-2xl font-bold'>Estrategias</h2>
      <section className='grid grid-layout p-6 pt-2 gap-7 justify-items-center'>
        {
          lista.map((value) => {
            return (
              <CardEstrategia description={value.description} name={value.title} key={value.id} metodo={value.estrategia(time)} />
            )
          })
        }
      </section>
      <div className='flex justify-center items-center pb-4'>
        {todos &&
          (<button className='btn btn-outline rounded-full border-secondary font-semibold' onClick={handleClick}>Ver todos</button>)}
      </div>
    </>
  )
}
