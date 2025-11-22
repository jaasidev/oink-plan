import { useTimeStore } from './useTimeStore'
import { useEffect } from 'react'
import { addDate } from '../utils/droptime'
export function useDrop() {
  const time = useTimeStore((state) => state.time)
  const setTime = useTimeStore((state) => state.setTime)
  const contador = useTimeStore((state) => state.contador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)

  useEffect(() => {
    let resta = 0
    if (new Date().getSeconds() != 0) {
      resta = new Date().getSeconds() * 1000

    }
    const intervalId = contador != 0 ? setInterval(() => {
      setTime(addDate(time))
      setEstrategias()
    }, contador * 60000 - resta) : ''

    return () => {
      clearInterval(intervalId)
      clearInterval(resta)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, contador])
  
 

  return time
}
