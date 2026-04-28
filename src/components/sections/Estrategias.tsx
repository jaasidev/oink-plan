import { CardEstrategia } from '../cards/CardEstrategia'
import { useEstrategia } from '../../hooks/useEstrategia'
import { ButtonMore } from '../buttons/buttonMore'

export function Estrategias() {
  const { lista, handleClick, todos, total } = useEstrategia()

  return (
    <>
      <h2 className='text-center mt-10 mb-4 text-2xl font-bold'>Estrategias</h2>
      <section className='grid grid-layout p-6 pt-2 gap-7 justify-items-center'>
        {lista.map((value) => {
          return <CardEstrategia id={value.id} key={value.id} />
        })}
      </section>
      {total > 6 && (
        <div className='flex justify-center items-center pb-4'>
          <ButtonMore action={handleClick} extender={todos} />
        </div>
      )}
    </>
  )
}
