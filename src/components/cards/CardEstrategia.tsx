import { ApuestaBadge } from '../badges/ApuestaBadge'
import { useTimeStore } from '../../context/useTimeStore'

interface CardEstrategiaProps {
  readonly id: number
}

export function CardEstrategia({ id }: CardEstrategiaProps) {
  const estrategia = useTimeStore((state) =>
    state.estrategias.find((el) => el.id === id),
  )

  if (!estrategia) return null

  const resultados = estrategia.estrategia()
  if (resultados.prediccion === undefined) return null
  return (
    <div className='card w-full bg-base-100 card-lg border-secondary border'>
      <div className='card-body'>
        <h2 className='card-title'>{estrategia?.title}</h2>
        <div className='flex gap-2 items-center mt-2'>
          <ApuestaBadge
            active={resultados.uno}
            prediccion={resultados.prediccion}
            texto='Apertura'
          />
          <ApuestaBadge
            active={resultados.dos}
            prediccion={resultados.prediccion}
            texto='1 Gale'
          />
          <ApuestaBadge
            active={resultados.tres}
            prediccion={resultados.prediccion}
            texto='2 Gale'
          />
        </div>
        <p>{estrategia.description}</p>

        <div className='mt-3'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold'>Confiabilidad:</h3>
            <span>{resultados.confiabilidad}%</span>
          </div>
          <progress
            className='progress progress-primary w-ful'
            value={resultados.confiabilidad}
            max='100'
          ></progress>
        </div>
      </div>
    </div>
  )
}
