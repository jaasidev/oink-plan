import type { EstrategiaBasica } from "../types/estrategia"
export function formatEstrategias(lista: EstrategiaBasica[], corte: boolean): EstrategiaBasica[] {
    let nuevaLista
    if (corte) {
        nuevaLista = lista.slice(0, 6)
    } else {
        nuevaLista = [...lista]
    }

    return nuevaLista

}