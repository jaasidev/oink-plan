import type { ColorType } from '../../types/estrategia'

interface ApuestaBadgeProps {
    prediccion: ColorType
    active: number
    texto: string
}

export function ApuestaBadge({ prediccion, active, texto }: ApuestaBadgeProps) {
    const bg = (prediccion === 'high' && active === 100) ? 'badge-success  badge-soft' : (prediccion === 'low' && active === 100) ? 'badge-error badge-soft' : 'text-gray-400 badge-dash  dark:text-gray-700'

    return (
        <div className={`badge  ${bg}`}>{texto}</div>
    )
}