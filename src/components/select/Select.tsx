import type { ReactNode } from 'react'

interface Select {
  readonly children: ReactNode
  readonly ref?: React.Ref<HTMLSelectElement>
  readonly id: string
  readonly className?: string
  readonly require?: boolean
  readonly variant: string
  readonly defaultText: string
}

export function Select({
  children,
  ref,
  id,
  className,
  require,
  variant,
  defaultText,
}: Select) {
  return (
    <select
      id={id}
      required={require}
      defaultValue=''
      ref={ref}
      title='Debe elegir una opción'
      className={`select select-${variant} validator text-base-content ${className}`}
    >
      <option disabled value=''>
        --{defaultText}--
      </option>
      {children}
    </select>
  )
}
