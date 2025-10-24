import { useState } from 'react'
import { useTimeStore } from '../../hooks/useTimeStore'
export function ButtonTime({ children, index, disabled }) {
  const time = useTimeStore((state) => state.time)
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
  }
  return (
    <button
      className={`btn  w-15 ${bg} ${disabled}`}
      onClick={handleClick}
      disabled={disabled}>
      {children}
    </button>
  )
}
