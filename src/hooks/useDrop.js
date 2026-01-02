import { useTimeStore } from './useTimeStore'
import { useEffect } from 'react'
import { addDate } from '../utils/droptime'
import { useState } from 'react'
export function useDrop() {
  const time = useTimeStore((state) => state.time)
  const setTime = useTimeStore((state) => state.setTime)
  const contador = useTimeStore((state) => state.contador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)
  const [velas, setVelas] = useState({
    total: 0,
    high: 0,
    stage: 0,
    low: 0,
  })

  useEffect(() => {
    let resta = 0
    if (new Date().getSeconds() != 0) {
      resta = new Date().getSeconds() * 1000
    }
    const intervalId =
      contador != 0
        ? setInterval(() => {
            setTime(addDate(time, contador))
            setEstrategias()
          }, contador * 60000 - resta)
        : ''

    return () => {
      clearInterval(intervalId)
      clearInterval(resta)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, contador])

  useEffect(() => {
    setVelas({
      total: time.filter((value) => value.color != 'none').length,
      high: time.filter((value) => value.color == 'high').length,
      stage: time.filter((value) => value.color == 'stage').length,
      low: time.filter((value) => value.color == 'low').length,
    })
  }, [time])

  return { time, velas }
}
