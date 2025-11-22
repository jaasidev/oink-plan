
import { useTimeStore } from '../../hooks/useTimeStore'
import { changeColor } from '../../utils/droptime'
export function ButtonTime({ index, hours, minutes, bloque, color }) {
  const time = useTimeStore((state) => state.time)
  const setTime=useTimeStore((state)=>state.setTime)
  const setVelas = useTimeStore((state) => state.setVelas)
  const setEstrategias= useTimeStore((state)=>state.setEstrategias)
  const handleClick = () => {
    setTime(changeColor(time,index))
    setVelas()
    setEstrategias()
    localStorage.setItem('prev', JSON.stringify(time))
  }
  const borde = bloque  ? 'border border-pink-500' : ''
  const bg = color == 'high' ? 'btn-success' : color == 'stage' ? 'btn-warning' : color == 'low' ? 'btn-error' : ''
  return (
    <button
      className={`btn  w-15 ${bg} ${borde}`}
      onClick={handleClick}
    >
      {hours}:{minutes}
    </button>
  )
}
