import type { Tiempo } from '../types/estrategia'
import { objetoTime, objetoBase } from './objects'

export function initTime(multiplicador: number): Tiempo[] {
  const date = new Date()
  const array: Tiempo[] = []
  let vela = 1
  /**Definiendo rango de 6 horas antes de la hora actual */
  for (let j = 0; j < 6; j++) {
    /**Definiendo minutos que tiene una hora */
    for (let i = 0; i < 60 / multiplicador; i++) {
      /**Escenario  1, el minutos se ajusta a la hora actual*/
      if (date.getMinutes() >= i * multiplicador) {
        array.unshift(
          objetoTime(
            date.getHours() - j,
            date.getHours() - j + 24,
            date.getMinutes() - i * multiplicador,
            vela,
            multiplicador,
          ),
        )
      } else {
        /**Escenario 2: el minuto es parte de la hora anterior */
        array.unshift(
          objetoTime(
            date.getHours() - j - 1,
            date.getHours() - j + 23,
            60 + date.getMinutes() - i * multiplicador,
            vela,
            multiplicador,
          ),
        )
      }
      /**Reinciando contadores de velas que definen los bloques cada ciertos lapsos predefinidos */
      if (vela === 5 && multiplicador === 1) vela = 0
      if (vela === 6 && multiplicador === 5) vela = 0
      if (vela === 4 && multiplicador === 15) vela = 0
      vela++
    }
  }
  return array
}

export function addDate(array: Tiempo[], multiplicador: number): Tiempo[] {
  const hora = new Date()
  if (array.length > 0) {
    const newArray = [...array]
    const lastBloque: number = newArray.findLastIndex(
      (value: Tiempo) => value.bloque,
    )
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

  return []
}
