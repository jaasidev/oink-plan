import type { Tiempo, ColorType, EstrategiaResultado } from "../types/estrategia"

export function calcularBalance(trozo: Tiempo[], invertir: boolean = false): ColorType {
  const alto = trozo.filter((v) => v.color === 'high').length
  const bajo = trozo.filter((v) => v.color === 'low').length
  if (alto === bajo) return 'none'
  const resultado = alto > bajo ? 'high' : 'low'
  return invertir ? (resultado === 'high' ? 'low' : 'high') : resultado
}

export function formatDateString(date: number): string {
  return String(date).padStart(2, '0')
}

export function procesarGales(
  time: Tiempo[],
  condicionAdicional: any,
  index: number,
  prediccion: ColorType,
  confiabilidad: number,
  modifyUno = 0,
  modifyDos = 0
): EstrategiaResultado {
  let uno = 0,
    dos = 0,
    tres = 0

  if (time[index]?.color && condicionAdicional && prediccion != 'none') {
    uno = 100
    if (time[index].color === prediccion) {
      uno = 0
      confiabilidad = Math.min(confiabilidad + 5, 99)
    } else if (time[index].color !== 'none') {
      uno = 0
      dos = 100
      if (time[index + 1 + modifyUno]?.color === prediccion) {
        dos = 0
        confiabilidad = Math.min(confiabilidad + 3, 99)
      } else if (time[index + 1 + modifyUno]?.color !== 'none') {
        dos = 0
        tres = 100
        if (time[index + 2 + modifyDos]?.color === prediccion) {
          tres = 0
          confiabilidad = Math.min(confiabilidad + 1, 99)
        } else if (time[index + 2 + modifyDos]?.color !== 'none') {
          tres = 0
        }
      }
    }
  }

  return { uno, dos, tres, confiabilidad }
}

export function procesarGalesAnt(time: Tiempo[], index: number, prediccion: ColorType, confiabilidad: number, modifyUno = 0, modifyDos = 0): number {
  if (prediccion != 'none') {
    if (time[index].color === prediccion) {
      confiabilidad = Math.min(confiabilidad + 5, 99)
    } else if (
      time[index].color != 'none' &&
      time[index + 1 + modifyUno]?.color === prediccion
    ) {
      confiabilidad = Math.min(confiabilidad + 3, 99)
    } else if (
      time[index].color != 'none' &&
      time[index + 1 + modifyUno]?.color !== 'none' &&
      time[index + 2 + modifyDos]?.color === prediccion
    ) {
      confiabilidad = Math.min(confiabilidad + 1, 99)
    }
  }

  return confiabilidad
}
