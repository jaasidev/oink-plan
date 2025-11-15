
import { useTimeStore } from '../../hooks/useTimeStore'
export function ButtonTime({ index, disabled, hours, minutes, bloque, color }) {
  const time = useTimeStore((state) => state.time)
  const updatEst = useTimeStore(state => state.updatEst)
  const setVelas = useTimeStore((state) => state.setVelas)
  const handleClick = () => {
    if (time[index].color == 'none') {
      time[index].color = 'high'
    } else if (time[index].color == 'high') {
      time[index].color = 'low'
    } else if (time[index].color == 'low') {
      time[index].color = 'stage'
    } else {
      time[index].color = 'none'
    }
    setVelas()
    updatEst()
  }
  const borde = bloque && disabled != 'disabled' ? 'border border-pink-500' : ''
  const bg = color == 'high' ? 'btn-success' : color == 'stage' ? 'btn-warning' : color == 'low' ? 'btn-error' : ''
  return (
    <button
      className={`btn  w-15 ${bg} ${borde}`}
      onClick={handleClick}
      disabled={disabled}>
      {hours}:{minutes}
    </button>
  )
}
