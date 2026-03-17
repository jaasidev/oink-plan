import { useTimeStore } from './useTimeStore'
import { useEffect, useEffectEvent } from 'react'
export function useDrop() {
  const time = useTimeStore((state) => state.time)
  const updateTime = useTimeStore((state) => state.updateTime)
  const contador = useTimeStore((state) => state.contador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)

  const onUpdate = useEffectEvent(() => {
    updateTime()
    setEstrategias()
    sessionStorage.setItem('prev', JSON.stringify(time))
  })

  useEffect(() => {
    if (contador === 0) return
    let resta =
      new Date().getSeconds() === 0 ? 0 : new Date().getSeconds() * 1000

    let intervalId = setInterval(
      () => {
        onUpdate()
      },
      contador * 60000 - resta,
    )

    return () => {
      clearInterval(intervalId)
    }
  }, [contador, time])

  return { time }
}
