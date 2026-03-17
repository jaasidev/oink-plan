import type { ColorType } from '../../types/estrategia'
import { ApuestaBadge } from '../badges/ApuestaBadge'
import { memo } from 'react'

interface CardEstrategiaProps {
  name: string
  description: string
  uno: number
  dos:number
  tres: number
  confiabilidad:number
  prediccion: ColorType
}

export const CardEstrategia = memo(function CardEstrategia({
  name,
  description,
  uno,
  dos,
  tres,
  confiabilidad,
  prediccion
}: CardEstrategiaProps) {

  return (
    <div className='card w-full bg-base-100 card-lg border-secondary border'>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <div className='flex gap-2 items-center mt-2'>
          <ApuestaBadge active={uno} prediccion={prediccion} texto='Apertura' />
          <ApuestaBadge active={dos} prediccion={prediccion} texto='1 Gale' />
          <ApuestaBadge active={tres} prediccion={prediccion} texto='2 Gale' />
        </div>
        <p>{description}</p>

        <div className='mt-3'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold'>Confiabilidad:</h3>
            <span>{confiabilidad}%</span>
          </div>
          <progress
            className='progress progress-primary w-ful'
            value={confiabilidad}
            max='100'
          ></progress>
        </div>
      </div>
    </div>
  )
})
