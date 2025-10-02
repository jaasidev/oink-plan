import { BrokerList } from '../BrokerList/BrokerList'
import { FormSide } from '../FormSide/FormSIde'

export function SideBar() {
  return (
    <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
      <li className='menu-title border-b'>
        <a className=' text-5xl text-pink-600 flex gap-1 items-center' href='#'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M15 11v.01' />
            <path d='M5.173 8.378a3 3 0 1 1 4.656 -1.377' />
            <path d='M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z' />
          </svg>
          Oink
          <span className='dark:text-white text-slate-900 text-4xl self-end'>
            Plan
          </span>
        </a>
      </li>
      <FormSide/>
    </ul>
  )
}
