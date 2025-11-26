import { ThemeSwitch } from "../controllers/ThemeSwitch";

export function Header() {
  return (
    <header className='flex lg:justify-end justify-between border-b border-gray-200 bg-base-200  dark:border-gray-800 items-center p-4'>
      <label
        htmlFor='my-drawer-2'
        className='btn btn-link text-slate-900 dark:text-white  lg:hidden'
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
      <ThemeSwitch/>
    </header>
  )
}
