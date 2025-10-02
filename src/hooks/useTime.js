import { useEffect, useState } from 'react'

export function useTime() {
  const [tiempo, setTiempo] = useState(new Date())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempo(new Date())
    }, 1000)

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId)
  }, [])
  return {
    hours: tiempo.getHours(),
    minutes: tiempo.getMinutes(),
    seconds: tiempo.getSeconds(),
  }
}
