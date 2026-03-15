import type { Tiempo } from '../types/estrategia'
import { objetoTime, objetoBase } from './objects'

export function initTime(multiplicador: number): Tiempo[] {
  const date = new Date()
  const array: Tiempo[] = []
  let vela = 1
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 60 / multiplicador; i++) {
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
        array.unshift(
          objetoTime(
            date.getHours() - j - 1,
            date.getHours() + 23 - j,
            60 + date.getMinutes() - i * multiplicador,
            vela,
            multiplicador,
          ),
        )
      }
      if (vela === 5 && multiplicador === 1) vela = 0
      if (vela === 6 && multiplicador === 5) vela = 0
      if (vela === 4 && multiplicador === 15) vela = 0
      vela++
    }
  }
  console.log(array)
  return array
}

export function addDate(array: Tiempo[], multiplicador: number): Tiempo[] {
  if (array.length > 0) {
    const nuevaFecha = new Date()
    const newArray = [...array]
    const lastBloque: number = newArray.findLastIndex(
      (value: Tiempo) => value.bloque,
    )
    newArray.push(
      objetoBase(
        nuevaFecha.getHours(),
        nuevaFecha.getMinutes(),
        newArray.length - lastBloque,
        multiplicador,
      ),
    )
    newArray.shift()
    sessionStorage.setItem('prev', JSON.stringify(newArray))
    console.log(newArray)
    return newArray
  }

  return []
}
