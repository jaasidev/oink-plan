import { ButtonTime } from '../buttons/ButtonTime'
import { useDrop } from '../../hooks/useDrop'
export function TimeSection() {
  const time = useDrop()
  return (
    <div className='px-6'>
      <h2 className='text-center font-bold text-2xl mb-3 mt-12'>
        Selector de tiempo
      </h2>
      <div className='flex flex-col lg:flex-row rounded-2xl shadow shadow-pink-500 lg:items-center'>
        <div className=' flex overflow-y-auto gap-1 px-3 py-4 lg:w-3/4 order-2 lg:order-1'>
          {time.map((value, index) => {
            return (
              <ButtonTime key={index} index={index}>
                {value.time}
              </ButtonTime>
            )
          })}
        </div>
        <div className='order-1 w-1/4 lg:order-2 lg:pl-6 bg-base-200 lg:rounded-br-2xl lg:rounded-tr-2xl py-4'>
          <ul>
            <li className='py-1'>Arriba: {0}</li>
            <li className='py-1'>Mantienen:{0}</li>
            <li className='py-1'>Bajo:{0}</li>
            <li className='py-1'>Total de Velas Marcadas: {0}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
