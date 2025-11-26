import { ApuestaBadge } from "../badges/ApuestaBadge"

export function CardEstrategia({ name, description, metodo }) {

    const { uno, dos, tres, confiabilidad, prediccion } = metodo

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
                        <progress className="progress progress-primary w-full" value={uno} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{uno}%</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Probabilidad 1 Vela:</legend>
                        <progress className="progress progress-secondary w-full" value={dos} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{dos}%</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Probabilidad 2 Vela:</legend>
                        <progress className="progress progress-accent w-full" value={tres} max="100"></progress>
                        <p className={`justify-end label text-${color}`}>{tres}%</p>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}