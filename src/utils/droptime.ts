import type { Tiempo, Bloque } from '../schemas/estrategia'
import { objetoBase } from './objects'
import { findLastBloque } from './helpers'

export const limiteVela: Record<Bloque, number> = {
  1: 5,
  5: 6,
  15: 4,
}

export function initTime(multiplicador: Bloque): Tiempo[] {
  const date = new Date()
  const array: Tiempo[] = []
  let vela = 1
  const bloquesPorHora = 60 / multiplicador

  for (let horaOffset = 5; horaOffset >= 0; horaOffset--) {
    for (
      let bloqueOffset = bloquesPorHora - 1;
      bloqueOffset >= 0;
      bloqueOffset--
    ) {
      const desplazamientoMinutos =
        horaOffset * 60 + bloqueOffset * multiplicador
      const fecha = new Date(date.getTime() - desplazamientoMinutos * 60000)

      array.push(
        objetoBase(fecha.getHours(), fecha.getMinutes(), vela, multiplicador),
      )

      vela = avanzarVela(vela, multiplicador)
    }
  }

  return array
}

export function addDate(array: Tiempo[], multiplicador: Bloque): Tiempo[] {
  const hora = new Date()
  if (array.length === 0) return []

  const newArray = [...array]
  const lastBloque = findLastBloque(newArray)

  if (lastBloque === null) return newArray

  newArray.push(
    objetoBase(
      hora.getHours(),
      hora.getMinutes(),
      newArray.length - lastBloque,
      multiplicador,
    ),
  )
  newArray.shift()

  return newArray
}

function avanzarVela(velaActual: number, multiplicador: Bloque): number {
  return velaActual === limiteVela[multiplicador] ? 1 : velaActual + 1
}
