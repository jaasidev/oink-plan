import { useTime } from '../../hooks/useTime'

export function Reloj({ counter }) {
  const { hours, minutes, seconds } = useTime()
  return (
    <div className='flex justify-center items-center lg:text-8xl text-6xl mt-7'>
      <span className='countdown font-mono'>
        <span
          style={{ '--value': `${hours}` }}
          aria-live='polite'
          aria-label={counter}
        >
          {hours}
        </span>
        :
        <span
          style={{ '--value': `${minutes}` }}
          aria-live='polite'
          aria-label={counter}
        >
          {minutes}
        </span>
        :
        <span
          style={{ '--value': `${seconds}` }}
          aria-live='polite'
          aria-label={counter}
        >
          {seconds}
        </span>
      </span>
    </div>
  )
}
