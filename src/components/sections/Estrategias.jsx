import { CardEstrategia } from '../cards/CardEstrategia'

export function Estrategias() {
  return (
    <>
      <h2 className='text-center mt-10 mb-4 text-2xl font-bold'>Estrategias</h2>
      <section className='grid grid-layout px-6'>
        <CardEstrategia
          name='Title'
          description='Lorem inpooi ehflj oifjoi ffsngl daoighald ladsng ljadgladsjgl kndasljgadsl gjlads'
          velaTres={10}
          velaUno={8}
          velaDos={45}
        />
      </section>
    </>
  )
}
