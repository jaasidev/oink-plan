import { useState } from 'react'
import { useTimeStore } from '../../hooks/useTimeStore'
export function ButtonTime({ index, disabled, hours, minutes }) {
  const time = useTimeStore((state) => state.time)
  const updatEst = useTimeStore(state => state.updatEst)
  const setVelas = useTimeStore((state) => state.setVelas)
  const [bg, setBg] = useState('')
  const handleClick = () => {
    if (time[index].color == 'none') {
      time[index].color = 'hight'
      setBg('btn-success')
    } else if (time[index].color == 'hight') {
      time[index].color = 'stage'
      setBg('btn-warning')
    } else if (time[index].color == 'stage') {
      time[index].color = 'low'
      setBg('btn-error')
    } else {
      time[index].color = 'none'
      setBg('')
    }
    setVelas()
    updatEst()
  }
  const borde = minutes % 5 == 0&& disabled!='disabled' ? 'border border-pink-500' : ''
  return (
    <button
      className={`btn  w-15 ${bg} ${borde}`}
      onClick={handleClick}
      disabled={disabled}>
      {hours}:{minutes}
    </button>
  )
}
