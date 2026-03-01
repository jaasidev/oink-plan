import { ThemeSwitch } from "../controllers/ThemeSwitch";

export function Header() {
  return (
    <header className='flex lg:justify-end justify-between border-b border-gray-200 bg-base-200  dark:border-gray-800 items-center px-4 lg:py-7 py-4'>
      <label
        htmlFor='my-drawer-2'
        className='btn btn-link text-slate-900 dark:text-white  lg:hidden '
        aria-label='Abrir menu lateral'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M4 6l16 0' />
          <path d='M4 12l16 0' />
          <path d='M4 18l16 0' />
        </svg>
      </label>
      <div className="flex items-center">
        <button className="me-3 cursor-pointer p-0.5 border-0 outline-0" onClick={() => document.getElementById('my_modal_1').showModal()}>

          <svg aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
            <path d="M19 22v.01" />
            <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
          </svg>

        </button>
        <ThemeSwitch />
      </div>


    </header>
  )
}
