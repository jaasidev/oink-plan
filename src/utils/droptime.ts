import type { ColorType, Tiempo } from "../types/estrategia"
const date = new Date()
function isBloque(value: number, contador: number): boolean {
  if (contador === 1) return value % 5 === 0
  if (contador === 5) return value % 6 === 0
  if (contador === 15) return value % 4 === 0

  return false
}

function formatDateString(date: number): string {
  return String(date).padStart(2, '0')
}

const objetoBase = (hour: number, minutes: number, vela: number, contador: number): Tiempo => {
  return {
    hours: formatDateString(hour),
    minutes: formatDateString(minutes),
    bloque: isBloque(vela, contador),
    color: 'none'
  }
}

const objetoTime = (horaBase: number, horaDos: number, minutes: number, vela: number, contador: number): Tiempo => {
  if (horaBase >= 0) return objetoBase(horaBase, minutes, vela, contador)

  return objetoBase(horaDos, minutes, vela, contador)
}

export function time(multiplicador: number): Tiempo[] {

  const array: Tiempo[] = []
  let vela = 1
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 60 / multiplicador; i++) {
      if (date.getMinutes() >= i * multiplicador) {
        array.unshift(
          objetoTime(date.getHours() - j, date.getHours() - j + 24, date.getMinutes() - i * multiplicador, vela, multiplicador)
        )
      } else {
        array.unshift(
          objetoTime(date.getHours() - j - 1, date.getHours() + 23 - j, 60 + date.getMinutes() - i * multiplicador, vela, multiplicador)
        )
      }
      if (vela === 5 && multiplicador === 1) vela = 0
      if (vela === 6 && multiplicador === 5) vela = 0
      if (vela === 4 && multiplicador === 15) vela = 0
      vela++
    }
  }
  return array
}

export function addDate(array:Tiempo[], multiplicador:number):Tiempo[] {
  if (array.length > 0) {
    const newArray = [...array]
    const lastBloque:number = newArray.findLastIndex((value:Tiempo) => value.bloque)
    newArray.push(
      objetoBase(date.getHours(), date.getMinutes(), newArray.length - lastBloque, multiplicador)
    )
    newArray.shift()
    sessionStorage.setItem('prev', JSON.stringify(newArray))

    return newArray
  }

  return []
}

const colorCycle: Record<ColorType, ColorType> = {
  none: 'high',
  high: 'low',
  low: 'stage',
  stage: 'none',
}

export function changeColor(array:Tiempo[], index:number):Tiempo[] {
  const newArray = [...array]
  newArray[index] = {
    ...newArray[index],
    color: colorCycle[newArray[index].color],
  }
  return newArray
}