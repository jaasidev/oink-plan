export function formatEstrategias(lista, corte) {
    let nuevaLista
    if (corte) {
        nuevaLista = lista.slice(0, 6)
    } else {
        nuevaLista = [...lista]
    }

    return nuevaLista.sort((a, b) => b.estrategia(time).confiabilidad - a.estrategia(time).confiabilidad)

}