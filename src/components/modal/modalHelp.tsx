import { createPortal } from "react-dom"
export function ModalHelp() {
    return createPortal(
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Preguntas Frecuentes</h3>
                <div className="py-4">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 outline-0">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-semibold">¿Qué es Trading?</div>
                        <div className="collapse-content text-sm">Es la acción de comprar y vender activos financieros (acciones, criptomonedas, divisas, etc.) con el objetivo de obtener un beneficio económico a corto, mediano o largo plazo. Básicamente, es "comerciar" con estos instrumentos.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 outline-0">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">¿Qué es una Vela?</div>
                        <div className="collapse-content text-sm">Es una representación gráfica del precio de un activo durante un período de tiempo específico. Muestra cuatro datos clave: el precio de apertura, el de cierre, el máximo y el mínimo de ese período. Su forma y color indican si el precio subió o bajó.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 outline-0">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">¿Qué es una Apertura?</div>
                        <div className="collapse-content text-sm">Es una estrategia de gestión de capital que consiste en aumentar el tamaño de la próxima inversión después de una pérdida, con el objetivo de recuperar lo perdido y obtener una pequeña ganancia cuando finalmente se acierte. Es una estrategia de alto riesgo.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 outline-0">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">¿Qué es un Gale?</div>
                        <div className="collapse-content text-sm">Es el precio al que un activo financiero comienza a cotizar en un nuevo período (por ejemplo, al inicio de un día de trading o al comienzo de una nueva vela en un gráfico). Es el primer precio al que se ejecuta una transacción en ese lapso.</div>
                    </div>

                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Cerrar</button>
                    </form>
                </div>
            </div>
        </dialog>,
        document.body
    )
}