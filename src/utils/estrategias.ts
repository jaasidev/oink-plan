import {
  calcularBalance,
  procesarGales,
  procesarGalesAnt,
  obtenerContrario,
  findLastBloque,
  findFirstBloque,
  obtenerColor,
} from './helpers'
import { ApuestasEstados } from '../schemas/enums'
import type { EstrategiaBasica, Tiempo, Bloque } from '../schemas/estrategia'

export function estrategia(
  time: Tiempo[],
  contador: Bloque,
): EstrategiaBasica[] {
  const instancia = findFirstBloque(time)
  const ultimo = findLastBloque(time)
  const { length } = time
  const colorEn = (ind: number) => obtenerColor(time, ind)
  if (instancia !== null && ultimo !== null) {
    return [
      {
        id: 84721,
        title: 'MHI (Minoría)',
        description:
          'En un cuadrante, considera el color minoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
        minutos: [1, 5],
        estrategia: () => {
          let c = 0
          let index = instancia
          while (index + 9 < ultimo) {
            let trozo = time.slice(index + 2, index + 5)
            const balance = calcularBalance(trozo, true)

            c = procesarGalesAnt(time, index + 5, balance, c)
            index += 10
          }

          let trozo = time.slice(index, index + 5)

          const balance = calcularBalance(trozo, true)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 5 < length - 1 && balance !== ApuestasEstados.NONE,
            index + 5,
            balance,
            c,
          )
          c = confiabilidad

          return { uno, dos, tres, confiabilidad: c, prediccion: balance }
        },
      },
      {
        id: 39156,
        title: 'MHI (Mayoría)',
        description:
          'En un cuadrante, considera el color mayoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
        minutos: [1, 5],
        estrategia: () => {
          let c = 0
          let index = instancia
          while (index + 9 < ultimo) {
            let trozo = time.slice(index + 2, index + 5)

            const balance = calcularBalance(trozo)
            c = procesarGalesAnt(time, index + 5, balance, c)
            index += 10
          }

          let trozo = time.slice(index, index + 5)

          const balance = calcularBalance(trozo)
          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 5 < length - 1 && balance !== ApuestasEstados.NONE,
            index + 5,
            balance,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: balance,
          }
        },
      },
      {
        id: 52483,
        title: 'Los 3 Mosqueteros',
        description:
          'Considera el color de la vela 3. Apuesta al mismo color en la vela 4. Gale 1 en la vela 5 y Gale 2 en la vela 6, siguiendo el mismo color.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia
          const bloque = ultimo + 3 < length - 1 ? ultimo : ultimo - 5
          while (index < bloque) {
            if (colorEn(index + 2) !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index + 3, colorEn(index + 2), c)
            }

            index += 5
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            bloque + 3 < length - 1,
            bloque + 3,
            colorEn(bloque + 2),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(bloque + 2),
          }
        },
      },
      {
        id: 67934,
        title: 'Millon Mayoría',
        description:
          'Considera el color mayoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
        minutos: [1, 5],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index < ultimo - 5) {
            let trozo = time.slice(index, index + 5)
            const balance = calcularBalance(trozo)
            c = procesarGalesAnt(time, index + 5, balance, c)
            index += 5
          }

          const pending = time.slice(ultimo - 5, ultimo)
          const balance = calcularBalance(pending)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            balance !== ApuestasEstados.NONE && ultimo < length - 1,
            ultimo,
            balance,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: balance,
          }
        },
      },
      {
        id: 21578,
        title: 'Millon Minoría',
        description:
          'Considera el color minoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
        minutos: [1, 5],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index < ultimo - 5) {
            let trozo = time.slice(index, index + 5)
            const balance = calcularBalance(trozo, true)
            c = procesarGalesAnt(time, index + 5, balance, c)
            index += 5
          }

          const pending = time.slice(ultimo - 5, ultimo)
          const balance = calcularBalance(pending, true)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            balance !== ApuestasEstados.NONE && ultimo < length - 1,
            ultimo,
            balance,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: balance,
          }
        },
      },
      {
        id: 93647,
        title: 'Patrón Impar',
        description:
          'Si las velas 1 y 3 son del mismo color, apuesta a ese color en la vela 5. Gale 1 en la vela 7 y Gale 2 en la vela 9, siguiendo el mismo color.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index + 9 < ultimo) {
            if (
              colorEn(index) === colorEn(index + 2) &&
              colorEn(index) !== ApuestasEstados.NONE
            ) {
              c = procesarGalesAnt(time, index + 4, colorEn(index), c, 1, 2)
            }
            index += 10
          }

          const prediccion = colorEn(index)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 4 < length - 1 &&
              colorEn(index) === colorEn(index + 2) &&
              prediccion !== ApuestasEstados.NONE,
            index + 4,
            prediccion,
            c,
            1,
            2,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: prediccion,
          }
        },
      },
      {
        id: 48265,
        title: 'Mejor de 3Multi-Bloque',
        description:
          'Considera la mayoría de las velas 3, 4 y 5. Apuesta a ese color en la vela 3 del SIGUIENTE cuadrante. Gales en la vela 3 de los cuadrantes subsiguientes.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index + 20 < ultimo) {
            let trozo = time.slice(index + 2, index + 5)
            const balance = calcularBalance(trozo)
            c = procesarGalesAnt(time, index + 7, balance, c, 4, 8)
            index += 10
          }

          let trozo = time.slice(index, index + 6)
          const seguimientoBalance = calcularBalance(trozo)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 7 <= length - 1 &&
              seguimientoBalance !== ApuestasEstados.NONE,
            index + 7,
            seguimientoBalance,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: seguimientoBalance,
          }
        },
      },
      {
        id: 75319,
        title: 'Padrón 23',
        description:
          'Considera el color de la vela 1. Apuesta al mismo color en la vela 2. Gale 1 en la vela 3 y Gale 2 en la vela 4, siguiendo el mismo color.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index < ultimo) {
            if (colorEn(index) !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index + 1, colorEn(index), c)
            }
            index += 5
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            colorEn(ultimo) !== ApuestasEstados.NONE && ultimo + 1 < length - 1,
            ultimo + 1,
            colorEn(ultimo),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(ultimo),
          }
        },
      },
      {
        id: 16842,
        title: 'Torres Gemelas',
        description:
          'Considera el color de la vela 1. Apuesta al mismo color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
        minutos: [1, 5],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index + 9 < ultimo) {
            if (colorEn(index) !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index + 4, colorEn(index), c)
            }
            index += 10
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 4 < length - 1 && colorEn(index) !== ApuestasEstados.NONE,
            index + 4,
            colorEn(index),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(index),
          }
        },
      },
      {
        id: 59473,
        title: '3 Vecinos',
        description:
          'Considera el color de la vela 4. Apuesta al mismo color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia
          const bloque = ultimo + 4 <= length - 1 ? ultimo : ultimo - 5

          while (index < bloque) {
            if (colorEn(index + 3) != ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index + 4, colorEn(index + 3), c)
            }
            index += 5
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            bloque + 4 <= length - 1 &&
              colorEn(bloque + 3) != ApuestasEstados.NONE,
            bloque + 4,
            colorEn(bloque + 3),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(bloque + 3),
          }
        },
      },
      {
        id: 82156,
        title: '3x1',
        description:
          'Considera el color minoritario de las velas 1, 2 y 3. Apuesta a ese color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index < ultimo) {
            let trozo = time.slice(index, index + 3)
            const balance = calcularBalance(trozo, true)
            c = procesarGalesAnt(time, index + 4, balance, c)
            index += 5
          }

          const pending = time.slice(ultimo, ultimo + 3)
          const balance = calcularBalance(pending, true)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            ultimo + 5 <= length - 1 &&
              balance !== ApuestasEstados.NONE &&
              ultimo + 4 <= length - 1,
            ultimo + 4,
            balance,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: balance,
          }
        },
      },
      {
        id: 34697,
        title: '2 Iguales y Continuación',
        description:
          'Si las velas 1 y 2 son del mismo color, apuesta a ese mismo color en la vela 3. Gales en las velas 4 y 5, siguiendo el mismo color.',
        minutos: [1],
        estrategia: () => {
          let c = 0
          let index = instancia

          while (index < ultimo) {
            if (
              colorEn(index) == colorEn(index + 1) &&
              colorEn(index) != ApuestasEstados.NONE
            ) {
              c = procesarGalesAnt(time, index + 2, colorEn(index), c)
            }
            index += 5
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            ultimo + 3 <= length - 1 &&
              colorEn(ultimo) == colorEn(ultimo + 1) &&
              colorEn(ultimo) != ApuestasEstados.NONE,
            ultimo + 2,
            colorEn(ultimo),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(ultimo),
          }
        },
      },
      {
        id: 46983,
        title: '4 Rojos',
        description:
          'Estrategia basada en la tendencia a que las velas en los minutos terminadas en 4 sea roja',
        minutos: [1],
        estrategia: () => {
          let c = 0

          let index = instancia

          while (index < ultimo) {
            c = procesarGalesAnt(time, index + 4, ApuestasEstados.LOW, c)
            index += 10
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 4 < length - 1,
            index + 4,
            ApuestasEstados.LOW,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: ApuestasEstados.LOW,
          }
        },
      },
      {
        id: 28314,
        title: '9 Verdes',
        description:
          'Estrategia basada en la tendencia que las velas terminadas en numero 9 sean verdes.',
        minutos: [1],
        estrategia: () => {
          let c = 0

          let index = instancia + 10

          while (index + 9 < ultimo) {
            c = procesarGalesAnt(time, index - 1, ApuestasEstados.HIGH, c)
            index += 10
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index - 1 < length - 1,
            index - 1,
            ApuestasEstados.HIGH,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: ApuestasEstados.HIGH,
          }
        },
      },
      {
        id: 874265,
        title: 'Seven Flip',
        description:
          'La vela numero 7 y la vela numero 8 van a tener el mismo color, gale en vela 9 y vela 10',
        minutos: [1],
        estrategia: () => {
          let c = 0

          const first =
            Number(time[instancia].minutes) % 10 === 0
              ? instancia
              : instancia + 5
          const last =
            Number(time[ultimo].minutes) % 10 == 0 ? ultimo : ultimo - 5
          let index = first

          while (index < last) {
            if (colorEn(index + 6) !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index + 7, colorEn(index + 6), c)
            }
            index += 10
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            last + 6 < length - 1 && colorEn(last + 6) !== ApuestasEstados.NONE,
            last + 7,
            colorEn(last + 6),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(last + 6)
              ? colorEn(last + 6)
              : ApuestasEstados.NONE,
          }
        },
      },
      {
        id: 65749,
        title: 'Five Flip',
        description:
          'La vela numero 5 y la vela numero 6 van a tener el mismo color, gale en vela 7 y vela 8',
        minutos: [5],
        estrategia: () => {
          let c = 0

          const first =
            Number(time[instancia].minutes) % 10 === 0
              ? instancia
              : instancia + 5
          const last =
            Number(time[ultimo].minutes) % 10 == 0 ? ultimo : ultimo - 5
          let index = first

          while (index < last) {
            const color = colorEn(index + 4)
            if (color !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index + 5, color, c)
            }
            index += 10
          }

          const color = colorEn(last + 4)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            last + 4 < length - 1 && color !== ApuestasEstados.NONE,
            last + 5,
            color,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: color,
          }
        },
      },
      {
        id: 852364,
        title: 'Turn Over',
        description:
          'El Patrón Turn Over para velas de M15 analiza la 4ª vela de un grupo de 4 velas, y se considerará victoria si la 1ª vela del siguiente bloque es de color opuesto.',
        minutos: [15],
        estrategia: () => {
          let c = 0

          let index = instancia + 4

          while (index < ultimo) {
            const contrario = obtenerContrario(colorEn(index - 1))
            if (contrario !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index, contrario, c)
            }
            index += 4
          }

          const contrario = obtenerContrario(colorEn(ultimo - 1))
          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            ultimo < length - 1,
            ultimo,
            contrario,
            c,
          )
          c = confiabilidad

          return { uno, dos, tres, confiabilidad: c, prediccion: contrario }
        },
      },
      {
        id: 357961,
        title: 'MHI (Minoría)',
        description:
          'La estrategia MHI analiza las 03 últimas velas de un bloque con 04 velas y contabiliza la cantidad de velas alcistas y bajistas. La cantidad MENOR será la referencia de entrada.',
        minutos: [15],
        estrategia: () => {
          let c = 0
          let index = instancia
          while (index + 8 < ultimo) {
            let trozo = time.slice(index + 1, index + 4)
            const balance = calcularBalance(trozo, true)

            c = procesarGalesAnt(time, index + 4, balance, c)
            index += 8
          }

          let trozo = time.slice(index + 1, index + 4)

          const balance = calcularBalance(trozo, true)

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            index + 4 < length - 1 && balance !== ApuestasEstados.NONE,
            index + 4,
            balance,
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: balance,
          }
        },
      },
      {
        id: 145963,
        title: 'Torres Gemelas',
        description:
          'El Patrón Torres Gemelas utiliza como referencia la 1ª Vela de un bloque de 04 velas y se considerará victoria cuando la 4ª vela del mismo bloque sea igual a la vela de referencia.',
        minutos: [15],
        estrategia: () => {
          let c = 0
          let index = instancia + 4
          while (index < ultimo) {
            const actual = colorEn(index)
            const referencia = colorEn(index - 4)
            if (actual === referencia && actual !== ApuestasEstados.NONE) {
              c = procesarGalesAnt(time, index, referencia, c)
            }
            index += 4
          }

          const { uno, dos, tres, confiabilidad } = procesarGales(
            time,
            colorEn(ultimo - 4) !== ApuestasEstados.NONE,
            ultimo,
            colorEn(ultimo - 4),
            c,
          )
          c = confiabilidad

          return {
            uno,
            dos,
            tres,
            confiabilidad: c,
            prediccion: colorEn(ultimo - 4),
          }
        },
      },
    ].filter((value) => value.minutos.includes(contador))
  }
  return []
}
