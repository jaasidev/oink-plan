import { ApuestasEstados } from '../schemas/enums'
import type {
  Tiempo,
  ColorType,
  EstrategiaResultado,
} from '../schemas/estrategia'

export function calcularBalance(
  trozo: Tiempo[],
  invertir: boolean = false,
): ColorType {
  const alto = trozo.filter((v) => v.color === ApuestasEstados.HIGH).length
  const bajo = trozo.filter((v) => v.color === ApuestasEstados.LOW).length
  if (alto === bajo) return ApuestasEstados.NONE
  const resultado = alto > bajo ? ApuestasEstados.HIGH : ApuestasEstados.LOW
  if (!invertir) return resultado
  return resultado === ApuestasEstados.HIGH
    ? ApuestasEstados.LOW
    : ApuestasEstados.HIGH
}

export function formatDateString(date: number): string {
  return String(date).padStart(2, '0')
}

export function procesarGales(
  time: Tiempo[],
  condicionAdicional: boolean,
  index: number,
  prediccion: ColorType,
  confiabilidad: number,
  modifyUno = 0,
  modifyDos = 0,
): EstrategiaResultado {
  let uno = 0,
    dos = 0,
    tres = 0

  if (
    time[index]?.color &&
    condicionAdicional &&
    prediccion !== ApuestasEstados.NONE
  ) {
    uno = 100
    if (time[index].color === prediccion) {
      uno = 0
      confiabilidad = Math.min(confiabilidad + 5, 99)
    } else if (time[index].color !== ApuestasEstados.NONE) {
      uno = 0
      dos = 100
      if (time[index + 1 + modifyUno]?.color === prediccion) {
        dos = 0
        confiabilidad = Math.min(confiabilidad + 3, 99)
      } else if (time[index + 1 + modifyUno]?.color !== ApuestasEstados.NONE) {
        dos = 0
        tres = 100
        if (time[index + 2 + modifyDos]?.color === prediccion) {
          tres = 0
          confiabilidad = Math.min(confiabilidad + 1, 99)
        } else if (
          time[index + 2 + modifyDos]?.color !== ApuestasEstados.NONE
        ) {
          tres = 0
        }
      }
    }
  }

  return { uno, dos, tres, confiabilidad }
}

export function procesarGalesAnt(
  time: Tiempo[],
  index: number,
  prediccion: ColorType,
  confiabilidad: number,
  modifyUno = 0,
  modifyDos = 0,
): number {
  if (prediccion !== ApuestasEstados.NONE) {
    if (time[index].color === prediccion) {
      confiabilidad = Math.min(confiabilidad + 5, 99)
    } else if (
      time[index].color !== ApuestasEstados.NONE &&
      time[index + 1 + modifyUno]?.color === prediccion
    ) {
      confiabilidad = Math.min(confiabilidad + 3, 99)
    } else if (
      time[index].color !== ApuestasEstados.NONE &&
      time[index + 1 + modifyUno]?.color !== ApuestasEstados.NONE &&
      time[index + 2 + modifyDos]?.color === prediccion
    ) {
      confiabilidad = Math.min(confiabilidad + 1, 99)
    }
  }

  return confiabilidad
}

export function findLastBloque(lista: Tiempo[]): null | number {
  const lastBloque = lista.findLastIndex((value: Tiempo) => value.bloque)
  if (lastBloque === -1) return null
  return lastBloque
}
