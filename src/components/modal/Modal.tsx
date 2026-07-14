import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
interface Modal {
  id: string
  children: ReactNode
}
export function Modal({ id, children }: Modal) {
  return createPortal(
    <dialog id={id} className='modal'>
      <div className='modal-box'>{children}</div>
    </dialog>,
    document.body,
  )
}
