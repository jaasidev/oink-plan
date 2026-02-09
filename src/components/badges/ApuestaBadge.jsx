export function ApuestaBadge({ prediccion, active, texto }) {
    const bg = (prediccion === 'high' && active === 100) ? 'badge-success  badge-soft' : (prediccion === 'low' && active === 100) ? 'badge-error badge-soft' : 'text-gray-400 badge-dash  dark:text-gray-700'

    return (
        <div className={`badge  ${bg}`}>{texto}</div>
    )
}