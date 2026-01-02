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
    setTime(time(parseInt(minRef.current.value)))
    setContador(parseInt(minRef.current.value))
    setEstrategias()
    sessionStorage.removeItem('prev')
    sessionStorage.setItem('contador', minRef.current.value)
  }
  return (
    <>
      <li className='menu-title px-0 mt-7'>
        <form className='flex flex-col gap-3' onSubmit={handlSubmit}>
          <select
            id='time'
            required
            defaultValue='Elige el rango de tiempo'
            ref={minRef}
            title='Debe elegir una opción'
            className='select select-secondary validator text-base-content'
          >
            <option value='Elige el rango de tiempo' disabled>
              --Elige el rango de tiempo--
            </option>
            <option value='01'>1 Minuto</option>
            <option value='05'>5 Minutos</option>
            <option value='10'>10 Minutos</option>
            <option value='15'>15 Minutos</option>
          </select>
          <select
            defaultValue='Elige monedas'
            className='select select-secondary text-base-content'
            required
          >
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
