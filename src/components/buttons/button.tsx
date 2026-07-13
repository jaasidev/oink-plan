import type { ReactNode } from 'react'

interface Button {
  readonly children: ReactNode
  readonly variant: string
  readonly className?: string
  readonly action?: (evento?: any) => void
  readonly type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, variant, className, action, type }: Button) {
  return (
    <button
      type={type}
      onClick={action}
      className={`btn btn-${variant} text-white mt-3 ${className ?? ''}`}
    >
      {children}
    </button>
  )
}
