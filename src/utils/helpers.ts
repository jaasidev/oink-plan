import { ApuestasEstados } from '../schemas/enums'
import type {
  Tiempo,
  ColorType,
  EstrategiaResultado,
} from '../schemas/estrategia'

const MAX_CONFIABILIDAD = 99
const IMPULSO_GALE_1 = 5
const IMPULSO_GALE_2 = 3
const IMPULSO_GALE_3 = 1
const SALIDA_ACTIVA = 100

export function obtenerColor(
  time: readonly Tiempo[],
  index: number,
): ColorType | undefined {
  if (time[index].color === undefined) return undefined
  return time[index].color
}

export function obtenerContrario(color?: ColorType): ColorType {
  if (color === ApuestasEstados.HIGH) return ApuestasEstados.LOW
  if (color === ApuestasEstados.LOW) return ApuestasEstados.HIGH
  return ApuestasEstados.NONE
}

function incrementarConfiabilidad(
  confiabilidad: number,
  incremento: number,
): number {
  return Math.min(confiabilidad + incremento, MAX_CONFIABILIDAD)
}

export function calcularBalance(
  trozo: readonly Tiempo[],
  invertirRespuesta: boolean = false,
): ColorType {
  if (trozo.length === 0) return ApuestasEstados.NONE
  const valores = trozo.reduce(
    (lista, valor) => {
      switch (valor.color) {
        case ApuestasEstados.HIGH:
          lista.alto++
          break
        case ApuestasEstados.LOW:
          lista.bajo++
          break
        case ApuestasEstados.NONE:
          lista.none++
          break
        case ApuestasEstados.STAGE:
          lista.stage++
          break
      }
      return lista
    },
    { alto: 0, bajo: 0, stage: 0, none: 0 },
  )

  if (valores.alto === valores.bajo) return ApuestasEstados.NONE
  const resultado =
    valores.alto > valores.bajo ? ApuestasEstados.HIGH : ApuestasEstados.LOW

  if (invertirRespuesta) {
    return obtenerContrario(resultado)
  }

  return resultado
}

export function formatDateString(date: number): string {
  return String(date).padStart(2, '0')
}

export function procesarGales(
  time: readonly Tiempo[],
  condicionAdicional: boolean,
  index: number,
  prediccion: ColorType | undefined,
  confiabilidadBase: number,
  modifyUno = 0,
  modifyDos = 0,
): EstrategiaResultado {
  let uno = 0
  let dos = 0
  let tres = 0
  let confiabilidad = confiabilidadBase
  if (prediccion === undefined)
    return { uno: 0, dos: 0, tres: 0, confiabilidad }
  const colorActual = obtenerColor(time, index)

  if (!condicionAdicional || prediccion === ApuestasEstados.NONE) {
    return { uno, dos, tres, confiabilidad }
  }

  if (colorActual === undefined) {
    return { uno, dos, tres, confiabilidad }
  }

  uno = SALIDA_ACTIVA

  if (colorActual === prediccion) {
    return {
      uno: 0,
      dos,
      tres,
      confiabilidad: incrementarConfiabilidad(confiabilidad, IMPULSO_GALE_1),
    }
  }

  if (colorActual === ApuestasEstados.NONE) {
    return { uno, dos, tres, confiabilidad }
  }

  uno = 0
  dos = SALIDA_ACTIVA

  const colorDos = obtenerColor(time, index + 1 + modifyUno)

  if (colorDos === prediccion) {
    return {
      uno,
      dos: 0,
      tres,
      confiabilidad: incrementarConfiabilidad(confiabilidad, IMPULSO_GALE_2),
    }
  }

  if (colorDos === undefined || colorDos === ApuestasEstados.NONE) {
    return { uno, dos, tres, confiabilidad }
  }

  dos = 0
  tres = SALIDA_ACTIVA

  const colorTres = obtenerColor(time, index + 2 + modifyDos)

  if (colorTres === prediccion) {
    return {
      uno,
      dos,
      tres: 0,
      confiabilidad: incrementarConfiabilidad(confiabilidad, IMPULSO_GALE_3),
    }
  }

  if (colorTres !== undefined && colorTres !== ApuestasEstados.NONE) {
    tres = 0
  }

  return { uno, dos, tres, confiabilidad }
}

export function procesarGalesAnt(
  time: readonly Tiempo[],
  index: number,
  prediccion: ColorType | undefined,
  confiabilidadBase: number,
  modifyUno = 0,
  modifyDos = 0,
): number {
  if (prediccion === undefined) return confiabilidadBase
  if (prediccion === ApuestasEstados.NONE) {
    return confiabilidadBase
  }

  const colorActual = obtenerColor(time, index)
  if (colorActual === undefined) {
    return confiabilidadBase
  }

  if (colorActual === prediccion) {
    return incrementarConfiabilidad(confiabilidadBase, IMPULSO_GALE_1)
  }

  if (colorActual === ApuestasEstados.NONE) {
    return confiabilidadBase
  }

  const colorDos = obtenerColor(time, index + 1 + modifyUno)
  if (colorDos === prediccion) {
    return incrementarConfiabilidad(confiabilidadBase, IMPULSO_GALE_2)
  }

  if (colorDos === undefined || colorDos === ApuestasEstados.NONE) {
    return confiabilidadBase
  }

  const colorTres = obtenerColor(time, index + 2 + modifyDos)
  if (colorTres === prediccion) {
    return incrementarConfiabilidad(confiabilidadBase, IMPULSO_GALE_3)
  }

  return confiabilidadBase
}

export function findLastBloque(lista: readonly Tiempo[]): null | number {
  const lastBloque = lista.findLastIndex((value: Tiempo) => value.bloque)
  if (lastBloque === -1) return null
  return lastBloque
}

export function findFirstBloque(lista: readonly Tiempo[]): null | number {
  const firstBloque = lista.findIndex((value: Tiempo) => value.bloque)
  if (firstBloque === -1) return null
  return firstBloque
}
