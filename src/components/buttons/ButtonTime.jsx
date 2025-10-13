import { useState } from 'react'
import { useTimeStore } from '../../hooks/useTimeStore'
export function ButtonTime({ children, index }) {
  const time = useTimeStore((state) => state.time)
  const [bg, setBg] = useState('')
  const handleClick = () => {
    if (time[index].color == 'none') {
      time[index].color = 'success'
      setBg('btn-success')
    } else if (time[index].color == 'success') {
      time[index].color = 'stage'
      setBg('btn-warning')
    } else if (time[index].color == 'stage') {
      time[index].color = 'low'
      setBg('btn-error')
    } else {
      time[index].color = 'none'
      setBg('')
    }
  }
  return (
    <button className={`btn  w-15 ${bg}`} onClick={handleClick}>
      {children}
    </button>
  )
}
