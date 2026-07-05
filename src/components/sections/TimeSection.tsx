import { ButtonTime } from '../buttons/ButtonTime'
import { useDrop } from '../../hooks/useDrop'
import { useTimeStore } from '../../context/useTimeStore'
export function TimeSection() {
  const { time } = useDrop()
  const velas = useTimeStore((state) => state.velas)
  return (
    <div className='px-6'>
      <h2 className='text-center font-bold text-2xl mb-3 mt-12'>
        Selector de tiempo
      </h2>
      <div className='flex flex-col lg:flex-row rounded-2xl lg:items-center bg-base-200 shadow-sm'>
        <div className=' flex overflow-y-auto gap-1 px-3 py-4 lg:w-3/4 order-2 lg:order-1 '>
          {time.map((value, index) => {
            return (
              <ButtonTime
                key={index}
                index={index}
                hours={value.hours}
                minutes={value.minutes}
                bloque={value.bloque}
                color={value.color}
              />
            )
          })}
        </div>
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
      </div>
    </div>
  )
}
