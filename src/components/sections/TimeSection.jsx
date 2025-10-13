import { ButtonTime } from '../buttons/ButtonTime'
import { useDrop } from '../../hooks/useDrop'
export function TimeSection() {
  const time = useDrop()

  return (
    <div className='px-6'>
      <h2 className='text-center font-bold text-2xl mb-3 mt-12'>
        Selector de tiempo
      </h2>
      <div className='rounded-2xl flex overflow-y-auto gap-1 px-2 py-3 shadow shadow-pink-500'>
        {time.map((value, index) => {
          return (
            <ButtonTime key={index} index={index}>
              {value.time}
            </ButtonTime>
          )
        })}
      </div>
    </div>
  )
}
