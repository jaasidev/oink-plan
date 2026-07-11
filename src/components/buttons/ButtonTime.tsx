import { useTimeStore } from '../../context/useTimeStore'
import { changeColor } from '../../utils/colors'
import { ApuestasEstados } from '../../schemas/enums'
import type { ColorType } from '../../types/estrategia'

interface ButtonTimeProps {
  readonly index: number
  readonly hours: string
  readonly minutes: string
  readonly bloque: boolean
  readonly color: ColorType
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
  let bg = ''

  if (color == ApuestasEstados.HIGH) {
    bg = 'btn-success'
  } else if (color == ApuestasEstados.STAGE) {
    bg = 'btn-warning'
  } else if (color == ApuestasEstados.LOW) {
    bg = 'btn-error'
  }
  return (
    <button className={`btn  w-15 ${bg} ${borde}`} onClick={handleClick}>
      {hours}:{minutes}
    </button>
  )
}
