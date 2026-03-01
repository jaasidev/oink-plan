import { GitHub } from "../../assets/githubLogo"
export function Footer() {
  return (
    <footer className="footer footer-horizontal bg-base-200 text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <p className="text-sm"> Hecho con ☕ por Jaasiel Beltrán </p>
      </aside>
      <nav className="grid-flow-col gap-4 place-self-end justify-self-end">
        <a href="https://github.com/jaasidev/oink-plan" className=" rounded-full p-0.5 dark:hover:bg-base-100 transition-all hover:bg-gray-200 ">
          <GitHub width='22'
            height='22' className='github' />

        </a>
      </nav>
    </footer>
  )
}


