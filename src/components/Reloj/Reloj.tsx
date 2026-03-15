import { useTime } from '../../hooks/useTime'

interface DaisyCountdown extends React.CSSProperties {
  '--value': string
}

export function Reloj({ counter }: { counter: string }) {
  const { hours, minutes, seconds } = useTime()
  return (
    <div className='flex justify-center items-center lg:text-8xl text-6xl mt-10'>
      <span className='countdown font-mono'>
        <span
          style={
            {
              '--value': `${hours}`,
              '--digits': 2,
            } as DaisyCountdown
          }
          aria-live='polite'
          aria-label={counter}
        >
          {hours}
        </span>
        :
        <span
          style={
            {
              '--value': `${minutes}`,
              '--digits': 2,
            } as DaisyCountdown
          }
          aria-live='polite'
          aria-label={counter}
        >
          {minutes}
        </span>
        :
        <span
          style={
            {
              '--value': `${seconds}`,
              '--digits': 2,
            } as DaisyCountdown
          }
          aria-live='polite'
          aria-label={counter}
        >
          {seconds}
        </span>
      </span>
    </div>
  )
}
