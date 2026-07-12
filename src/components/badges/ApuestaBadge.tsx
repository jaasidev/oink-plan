import type { ColorType } from '../../schemas/estrategia'
import { ApuestasEstados } from '../../schemas/enums'

interface ApuestaBadgeProps {
  readonly prediccion: ColorType
  readonly active: number
  readonly texto: string
}

export function ApuestaBadge({ prediccion, active, texto }: ApuestaBadgeProps) {
  let bg = 'text-gray-400 badge-dash  dark:text-gray-700'

  if (prediccion === ApuestasEstados.HIGH && active === 100) {
    bg = 'badge-success  badge-soft'
  } else if (prediccion === ApuestasEstados.LOW && active === 100) {
    bg = 'badge-error badge-soft'
  }

  return <div className={`badge  ${bg}`}>{texto}</div>
}
