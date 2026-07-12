import { ApuestasEstados } from '../schemas/enums'
import type { ColorType, Tiempo } from '../schemas/estrategia'

const colorCycle: Record<ColorType, ColorType> = {
  [ApuestasEstados.NONE]: ApuestasEstados.HIGH,
  [ApuestasEstados.HIGH]: ApuestasEstados.LOW,
  [ApuestasEstados.LOW]: ApuestasEstados.STAGE,
  [ApuestasEstados.STAGE]: ApuestasEstados.NONE,
}

export function changeColor(array: Tiempo[], index: number): Tiempo[] {
  const newArray = [...array]
  newArray[index] = {
    ...newArray[index],
    color: colorCycle[newArray[index].color],
  }
  return newArray
}
