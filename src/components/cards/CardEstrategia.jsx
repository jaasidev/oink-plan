import { ApuestaBadge } from "../badges/ApuestaBadge"

export function CardEstrategia({ name, description, velaUno, velaDos, velaTres, confiabilidad, prediccion }) {

    let color

    if (confiabilidad > 75) {
        color = 'success'
    } else if (confiabilidad < 75 && confiabilidad > 50) {
        color = 'warning'
    } else {
        color = 'error'
    }
    return (
        <div className="card w-96 max-w-full bg-base-100 card-lg border-secondary border">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <ApuestaBadge prediccion={prediccion} />

                <div className="mt-5 w-full">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Confiabilidad:</legend>
                        <progress className="progress progress-primary w-full" value={confiabilidad} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{confiabilidad}%</p>
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