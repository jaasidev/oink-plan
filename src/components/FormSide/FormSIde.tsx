import { BrokerList } from '../BrokerList/BrokerList'
import { useTimeStore } from '../../hooks/useTimeStore'
import { time } from '../../utils/droptime'
import { useRef } from 'react'
export function FormSide() {
  const minRef = useRef<HTMLSelectElement>(null)
  const monedaRef = useRef<HTMLSelectElement>(null)
  const setTime = useTimeStore((state) => state.setTime)
  const setContador = useTimeStore((state) => state.setContador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)
  const resetEstrategias = useTimeStore((state) => state.resetEstrategias)

  const handlSubmit = (event:React.SubmitEvent) => {
    event.preventDefault()
    if (minRef.current) {
      setTime(time(Number.parseInt(minRef.current.value)))
      setContador(Number.parseInt(minRef.current.value))
    }

    setEstrategias()
    sessionStorage.removeItem('prev')
    if (minRef.current) sessionStorage.setItem('contador', minRef.current.value)
  }

  const handleDelete = () => {
    setTime([])
    setContador(1)
    resetEstrategias()
    if (minRef.current) minRef.current.value = ''

    if (monedaRef.current) monedaRef.current.value = ''

  }
  return (
    <>
      <li className='menu-title px-0 mt-7'>
        <form className='flex flex-col gap-3' onSubmit={handlSubmit}>
          <select
            id='time'
            required
            defaultValue=''
            ref={minRef}
            title='Debe elegir una opción'
            className='select select-secondary validator text-base-content'
          >
            <option disabled value="">
              --Elige el rango de tiempo--
            </option>
            <option value='01'>1 Minuto</option>
            <option value='05'>5 Minutos</option>
            <option value='15'>15 Minutos</option>
          </select>
          <select
            defaultValue=''
            className='select select-secondary text-base-content validator'
            required
            title='Debe elegir una opción'
            id='moneda'
            ref={monedaRef}
          >
            <option value="" disabled>
              --Elige tu cambio de moneda--
            </option>
            <option>USD/EURO</option>
            <option>EURO/USD</option>
            <option>USD/GBP</option>
            <option>EURO/GBP</option>
            <option>GBP/USD</option>
            <option value=''>GBP/EURO</option>
          </select>
          <button className='btn btn-secondary' type='submit'>
            <svg aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
            Generar
          </button>
        </form>
        <button className="btn btn-error text-white mt-3" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>

          Limpiar
        </button>
      </li>
      <BrokerList />
    </>
  )
}
