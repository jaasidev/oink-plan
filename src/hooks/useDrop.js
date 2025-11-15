import { useTimeStore } from './useTimeStore'
import { useEffect } from 'react'
export function useDrop() {
  const time = useTimeStore((state) => state.time)
  const update = useTimeStore((state) => state.update)
  const contador = useTimeStore((state) => state.contador)
  
  useEffect(() => {
    let resta = 0
    if (new Date().getSeconds() != 0) {
      resta = new Date().getSeconds() * 1000
    }
    const intervalId = setInterval(() => {
      update()
    }, contador * 60000 - resta)

    return () => {
      clearInterval(intervalId)
      clearInterval(resta)
    }
  }, [time, update, contador])



  return time
}
