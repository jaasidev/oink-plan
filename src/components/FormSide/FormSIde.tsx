import { BrokerList } from '../BrokerList/BrokerList'
import { Select } from '../select/Select'
import { Button } from '../buttons/button'
import { useSubmitForm } from '../../hooks/useSubmitForm'
export function FormSide() {
  const { handleDelete, handleSubmit, minRef, monedaRef } = useSubmitForm()
  return (
    <>
      <li className='menu-title px-0 mt-7'>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <Select
            id='time'
            ref={minRef}
            require
            variant='secondary'
            defaultText='Selecciona un tiempo'
          >
            <option value='01'>1 Minuto</option>
            <option value='05'>5 Minutos</option>
            <option value='15'>15 Minutos</option>
          </Select>
          <Select
            id='moneda'
            ref={monedaRef}
            require
            variant='secundary'
            defaultText='Selecciona una moneda'
          >
            <option>USD/EURO</option>
            <option>EURO/USD</option>
            <option>USD/GBP</option>
            <option>EURO/GBP</option>
            <option>GBP/USD</option>
            <option>GBP/EURO</option>
          </Select>
          <Button variant='secondary' className='' type='submit'>
            <svg
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='19'
              height='19'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
              <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
            </svg>
            Generar
          </Button>
        </form>
        <Button action={handleDelete} variant='error'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='19'
            height='19'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M4 7l16 0' />
            <path d='M10 11l0 6' />
            <path d='M14 11l0 6' />
            <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
            <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
          </svg>
          Limpiar
        </Button>
      </li>
      <BrokerList />
    </>
  )
}
