import { useTimeStore } from '../../context/useTimeStore'
import { ApuestasEstados } from '../../schemas/enums'

export function Velas() {
  const time = useTimeStore((state) => state.time)

  const velas = time.reduce(
    (acc, value) => {
      if (value.color !== ApuestasEstados.NONE) acc.total += 1

      switch (value.color) {
        case ApuestasEstados.HIGH:
          acc.high += 1
          break
        case ApuestasEstados.STAGE:
          acc.stage += 1
          break
        case ApuestasEstados.LOW:
          acc.low += 1
          break
      }

      return acc
    },
    { total: 0, high: 0, stage: 0, low: 0 },
  )
  return (
    <div className='order-1 lg:w-1/4 lg:order-2 lg:pl-6 bg-base-300 lg:rounded-br-2xl lg:rounded-tl-none py-4 rounded-t-2xl'>
      <ul className='flex items-center gap-3 px-2 lg:block flex-wrap'>
        <li className='py-1 leyend'>Arriba: {velas.high}</li>
        <li className='py-1 leyend'>Mantienen:{velas.stage}</li>
        <li className='py-1 leyend'>Bajo:{velas.low}</li>
        <li className='py-1 font-bold'>
          Total de Velas Marcadas: {velas.total}
        </li>
      </ul>
    </div>
  )
}
