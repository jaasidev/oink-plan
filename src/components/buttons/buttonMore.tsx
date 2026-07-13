interface ButtonMoreProps {
  readonly action: () => void
  readonly extender: boolean
}
export function ButtonMore({ action, extender }: ButtonMoreProps) {
  const texto = extender ? 'mas' : 'menos'
  return (
    <button
      className='btn btn-outline rounded-full border-secondary font-semibold'
      onClick={action}
    >
      Ver {texto}
    </button>
  )
}
