export function ApuestaBadge({prediccion}){
    const badge= prediccion=='high'?'badge-success':prediccion=='low'?'badge-error':'badge-info'
    const texto= prediccion=='high'?'Verde':prediccion=='low'?'Roja':'Ninguna'
    return(
        <div className="flex items-center gap-3">
            <span className="w-min">Apuesta:</span>
            <div className={`badge badge-outline ${badge}`}>{texto}</div>
        </div>
    )
}