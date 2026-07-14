import type { ReactNode } from 'react'

interface Button {
  readonly children: ReactNode
  readonly className?: string
  readonly action?: (evento?: any) => void
  readonly type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, className, action, type }: Button) {
  return (
    <button
      type={type}
      onClick={action}
      className={`btn text-white ${className ?? ''} `}
    >
      {children}
    </button>
  )
}
