import { ThemeSwitch } from "../controllers/ThemeSwitch";
import { GitHub } from "../../assets/githubLogo";

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
      <a href="https://github.com/jaasidev/oink-plan" className="me-3 rounded-full p-0.5 dark:hover:bg-base-100 transition-all hover:bg-gray-200 ">
        <GitHub width='22'
          height='22' className='github' />

      </a>


      <ThemeSwitch />
    </header>
  )
}
