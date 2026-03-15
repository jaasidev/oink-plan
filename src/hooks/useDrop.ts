import { useTimeStore } from './useTimeStore'
import { useEffect } from 'react'
export function useDrop() {
  const time = useTimeStore((state) => state.time)
  const updateTime = useTimeStore((state) => state.updateTime)
  const contador = useTimeStore((state) => state.contador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)

  useEffect(() => {
    let resta =
      new Date().getSeconds() === 0 ? 0 : new Date().getSeconds() * 1000

    let intervalId: ReturnType<typeof setInterval>
    if (contador !== 0) {
      intervalId = setInterval(
        () => {
          updateTime()
          setEstrategias()
        },
        contador * 60000 - resta,
      )
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [contador, time])

  return { time }
}
