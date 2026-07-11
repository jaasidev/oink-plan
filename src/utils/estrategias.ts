import { calcularBalance, procesarGales, procesarGalesAnt } from './helpers'
import { ApuestasEstados } from '../schemas/enums'
import type { ColorType, Tiempo } from '../types/estrategia'

function obtenerContrario(color?: ColorType): ColorType {
  if (color === ApuestasEstados.HIGH) return ApuestasEstados.LOW
  if (color === ApuestasEstados.LOW) return ApuestasEstados.HIGH
  return ApuestasEstados.NONE
}

export function estrategia(time: Tiempo[], contador: number) {
  const instancia = time.findIndex((value) => value.bloque)
  const ultimo = time.findLastIndex((value) => value.bloque)
  const { length } = time

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
          index + 5 < length - 1 && balance != ApuestasEstados.NONE,
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
          index + 5 < length - 1 && balance != ApuestasEstados.NONE,
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
          if (time[index + 2].color != ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index + 3, time[index + 2].color, c)
          }

          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          bloque + 3 < length - 1,
          bloque + 3,
          time[bloque + 2].color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[bloque + 2].color,
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
            time[index].color == time[index + 2].color &&
            time[index].color !== ApuestasEstados.NONE
          ) {
            c = procesarGalesAnt(time, index + 4, time[index].color, c, 1, 2)
          }
          index += 10
        }

        const prediccion = time[index].color

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          index + 4 < length - 1 &&
            time[index].color == time[index + 2].color &&
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
          index + 7 <= length - 1 && seguimientoBalance != ApuestasEstados.NONE,
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
          if (time[index].color != ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index + 1, time[index].color, c)
          }
          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          time[ultimo].color != ApuestasEstados.NONE && ultimo + 1 < length - 1,
          ultimo + 1,
          time[ultimo].color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[ultimo].color,
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
          if (time[index].color !== ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index + 4, time[index].color, c)
          }
          index += 10
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          index + 4 < length - 1 && time[index].color !== ApuestasEstados.NONE,
          index + 4,
          time[index].color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[index].color,
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
          if (time[index + 3].color != ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index + 4, time[index + 3].color, c)
          }
          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          bloque + 4 <= length - 1 &&
            time[bloque + 3].color != ApuestasEstados.NONE,
          bloque + 4,
          time[bloque + 3].color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[bloque + 3].color,
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
            time[index].color == time[index + 1].color &&
            time[index].color != ApuestasEstados.NONE
          ) {
            c = procesarGalesAnt(time, index + 2, time[index].color, c)
          }
          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          ultimo + 3 <= length - 1 &&
            time[ultimo].color == time[ultimo + 1].color &&
            time[ultimo].color != ApuestasEstados.NONE,
          ultimo + 2,
          time[ultimo].color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[ultimo].color,
        }
      },
    },
    {
      id: 71528,
      title: 'Confluencia Triple',
      description:
        'Genera una señal en la vela 5 solo si las estrategias "Torres Gemelas", "3 Vecinos" y "3x1" predicen el mismo color. Una estrategia de alta confluencia..',
      minutos: [1],
      estrategia: () => {
        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 0,
          prediccion: ApuestasEstados.NONE,
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
      id: 65749,
      title: 'Seven Flip',
      description:
        'La vela numero 7 y la vela numero 8 van a tener el mismo color, gale en vela 9 y vela 10',
      minutos: [1],
      estrategia: () => {
        let c = 0

        const first =
          Number(time[instancia].minutes) % 10 == 0 ? instancia : instancia + 5
        const last =
          Number(time[ultimo].minutes) % 10 == 0 ? ultimo : ultimo - 5
        let index = first

        while (index < last) {
          if (time[index + 6].color != ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index + 7, time[index + 6].color, c)
          }
          index += 10
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          last + 6 < length - 1 &&
            time[last + 6]?.color != ApuestasEstados.NONE,
          last + 7,
          time[last + 6]?.color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[last + 6]?.color
            ? time[last + 6].color
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
          Number(time[instancia].minutes) % 10 == 0 ? instancia : instancia + 5
        const last =
          Number(time[ultimo].minutes) % 10 == 0 ? ultimo : ultimo - 5
        let index = first

        while (index < last) {
          if (time[index + 4].color != ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index + 5, time[index + 4].color, c)
          }
          index += 10
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          last + 4 < length - 1 &&
            time[last + 4]?.color != ApuestasEstados.NONE,
          last + 5,
          time[last + 4]?.color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[last + 4]?.color
            ? time[last + 4].color
            : ApuestasEstados.NONE,
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
          const contrario = obtenerContrario(time[index - 1]?.color)
          if (contrario != ApuestasEstados.NONE) {
            c = procesarGalesAnt(time, index, contrario, c)
          }
          index += 4
        }

        const contrario = obtenerContrario(time[ultimo - 1]?.color)
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
          index + 4 < length - 1 && balance != ApuestasEstados.NONE,
          index + 4,
          balance,
          c,
        )
        c = confiabilidad

        return { uno, dos, tres, confiabilidad: c, prediccion: balance }
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
          if (
            time[index].color === time[index - 4].color &&
            time[index].color != ApuestasEstados.NONE
          ) {
            c = procesarGalesAnt(time, index, time[index - 4].color, c)
          }
          index += 4
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          time[ultimo - 4].color != ApuestasEstados.NONE,
          ultimo,
          time[ultimo - 4].color,
          c,
        )
        c = confiabilidad

        return {
          uno,
          dos,
          tres,
          confiabilidad: c,
          prediccion: time[ultimo - 4].color,
        }
      },
    },
  ].filter((value) => value.minutos.includes(contador))
}
