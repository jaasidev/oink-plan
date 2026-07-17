import { ButtonTime } from '../buttons/ButtonTime'
import { useDrop } from '../../hooks/useDrop'
import { Velas } from './Velas'
export function TimeSection() {
  const { time } = useDrop()
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
        <Velas />
      </div>
    </div>
  )
}
