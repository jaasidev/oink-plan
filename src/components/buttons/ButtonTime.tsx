import { useTimeStore } from '../../context/useTimeStore'
import { changeColor } from '../../utils/colors'
import type { ColorType } from '../../types/estrategia'

interface ButtonTimeProps {
  index: number
  hours: string
  minutes: string
  bloque: boolean
  color: ColorType
}
export function ButtonTime({
  index,
  hours,
  minutes,
  bloque,
  color,
}: ButtonTimeProps) {
  const time = useTimeStore((state) => state.time)
  const setTime = useTimeStore((state) => state.setTime)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)
  const updateVelas = useTimeStore((state) => state.updateVelas)

  const handleClick = () => {
    setTime(changeColor(time, index))
    sessionStorage.setItem('prev', JSON.stringify(time))
    setEstrategias()
    updateVelas()
  }
  const borde = bloque ? 'border border-pink-500' : ''
  const bg =
    color == 'high'
      ? 'btn-success'
      : color == 'stage'
        ? 'btn-warning'
        : color == 'low'
          ? 'btn-error'
          : ''
  return (
    <button className={`btn  w-15 ${bg} ${borde}`} onClick={handleClick}>
      {hours}:{minutes}
    </button>
  )
}
