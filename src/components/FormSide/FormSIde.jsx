import { BrokerList } from '../BrokerList/BrokerList'
import { useTimeStore } from '../../hooks/useTimeStore'
import { time } from '../../utils/droptime'
import { useRef } from 'react'
export function FormSide() {
  const minRef = useRef(null)
  const setTime = useTimeStore((state) => state.setTime)
  const setContador = useTimeStore((state) => state.setContador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)

  const handlSubmit = (event) => {
    event.preventDefault()
    setTime(time(minRef.current.value))
    setContador(minRef.current.value)
    setEstrategias() 
    localStorage.removeItem('prev')
  }
  return (
    <>
      <li className='menu-title px-0 mt-7'>
        <form className='flex flex-col gap-3' onSubmit={handlSubmit}>
          <input
            type='number'
            placeholder='Elige el rango de tiempo'
            min={1}
            max={15}
            className='input input-secondary validator'
            ref={minRef}
            title='Debe introducir un dígito entre 0-5'
            required
          />
          <select
            defaultValue='Elige monedas'
            className='select select-secondary'
            required>
            <option value='Elige monedas' disabled>
              --Elige tu cambio de moneda--
            </option>
            <option>USD/EURO</option>
            <option>EURO/USD</option>
            <option>USD/GBP</option>
            <option>EURO/GBP</option>
            <option>GBP/USD</option>
            <option value=''>GBP/EURO</option>
          </select>
          <button className='btn btn-secondary'>Generar</button>
        </form>
      </li>
      <BrokerList />
    </>
  )
}
