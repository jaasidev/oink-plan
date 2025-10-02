export function CardEstrategia({ name, description, velaUno, velaDos, velaTres }) {
    const efectividad = (velaUno + velaDos + velaTres) / 3
    let color

    if (efectividad > 75) {
        color = 'success'
    } else if (efectividad < 75 && efectividad > 50) {
        color = 'warning'
    } else {
        color = 'error'
    }
    return (
        <div className="card w-96 bg-base-100 card-lg shadow-sm shadow-pink-500">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>

                <div className="mt-5 w-full">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Probabilidad General:</legend>
                        <progress className={`progress w-full progress-${color}`} value={efectividad} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{efectividad}%</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Probabilidad Apertura:</legend>
                        <progress className="progress progress-primary w-full" value={velaUno} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{velaUno}%</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Probabilidad 1 Vela:</legend>
                        <progress className="progress progress-secondary w-full" value={velaDos} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{velaDos}%</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Probabilidad 2 Vela:</legend>
                        <progress className="progress progress-accent w-full" value={velaTres} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{velaTres}%</p>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}