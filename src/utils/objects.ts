import { formatDateString } from './helpers'
import type { Tiempo } from '../types/estrategia'
function isBloque(value: number, contador: number): boolean {
  if (contador === 1) return value % 5 === 0
  if (contador === 5) return value % 6 === 0
  if (contador === 15) return value % 4 === 0

  return false
}

export const objetoBase = (
  hour: number,
  minutes: number,
  vela: number,
  contador: number,
): Tiempo => {
  return {
    hours: formatDateString(hour),
    minutes: formatDateString(minutes),
    bloque: isBloque(vela, contador),
    color: 'none',
  }
}

export const objetoTime = (
  horaBase: number,
  horaDos: number,
  minutes: number,
  vela: number,
  contador: number,
): Tiempo => {
  if (horaBase >= 0) return objetoBase(horaBase, minutes, vela, contador)

  return objetoBase(horaDos, minutes, vela, contador)
}
