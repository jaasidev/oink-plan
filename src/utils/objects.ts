import { formatDateString } from './helpers'
import type { Bloque, Tiempo } from '../schemas/estrategia'
import { ApuestasEstados } from '../schemas/enums'
import { limiteVela } from './droptime'

function isBloque(value: number, contador: Bloque): boolean {
  return value % limiteVela[contador] === 0
}

export const objetoBase = (
  hour: number,
  minutes: number,
  vela: number,
  contador: Bloque,
): Tiempo => {
  return {
    hours: formatDateString(hour),
    minutes: formatDateString(minutes),
    bloque: isBloque(vela, contador),
    color: ApuestasEstados.NONE,
  }
}
