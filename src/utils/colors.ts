import type { ColorType, Tiempo } from '../types/estrategia'
const colorCycle: Record<ColorType, ColorType> = {
  none: 'high',
  high: 'low',
  low: 'stage',
  stage: 'none',
}

export function changeColor(array: Tiempo[], index: number): Tiempo[] {
  const newArray = [...array]
  newArray[index] = {
    ...newArray[index],
    color: colorCycle[newArray[index].color],
  }
  return newArray
}
