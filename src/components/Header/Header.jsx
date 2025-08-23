export function Header() {
  return (
    <header className='flex lg:justify-end justify-between border-b border-gray-200 lg:border-b-0  dark:border-gray-700 items-center p-4'>
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
          stroke-width='1'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path d='M4 6l16 0' />
          <path d='M4 12l16 0' />
          <path d='M4 18l16 0' />
        </svg>
      </label>
      <label className='toggle text-base-content'>
        <input type='checkbox' value='synthwave' className='theme-controller' />

        <svg
          aria-label='sun'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <g
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='2'
            fill='none'
            stroke='currentColor'
          >
            <circle cx='12' cy='12' r='4'></circle>
            <path d='M12 2v2'></path>
            <path d='M12 20v2'></path>
            <path d='m4.93 4.93 1.41 1.41'></path>
            <path d='m17.66 17.66 1.41 1.41'></path>
            <path d='M2 12h2'></path>
            <path d='M20 12h2'></path>
            <path d='m6.34 17.66-1.41 1.41'></path>
            <path d='m19.07 4.93-1.41 1.41'></path>
          </g>
        </svg>

        <svg
          aria-label='moon'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <g
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='2'
            fill='none'
            stroke='currentColor'
          >
            <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
          </g>
        </svg>
      </label>
    </header>
  )
}
