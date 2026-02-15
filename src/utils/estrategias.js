import { calcularBalance, procesarGales, procesarGalesAnt } from './helpers'
export function estrategia(time, contador) {
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
          index + 5 < length - 1 && balance != '',
          index + 5,
          balance,
          c
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
          index + 5 < length - 1 && balance != '',
          index + 5,
          balance,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: balance,
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
          if (time[index + 2].color != 'none') {
            c = procesarGalesAnt(time, index + 3, time[index + 2].color, c)
          }

          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          bloque + 3 < length - 1,
          bloque + 3,
          time[bloque + 2].color,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres,
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
          balance !== '' && ultimo < length - 1,
          ultimo,
          balance,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: balance,
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
          balance !== '' && ultimo < length - 1,
          ultimo,
          balance,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: balance,
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
            time[index].color !== 'none'
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
          prediccion !== 'none',
          index + 4,
          prediccion,
          c,
          1, 2
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: prediccion,
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
          index + 7 <= length - 1 && seguimientoBalance != '',
          index + 7,
          seguimientoBalance,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: seguimientoBalance,
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
          if (time[index].color != 'none') {
            c = procesarGalesAnt(time, index + 1, time[index].color, c)
          }
          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          time[ultimo].color != 'none' && ultimo + 1 < length - 1,
          ultimo + 1,
          time[ultimo].color,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: time[ultimo].color,
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
          if (time[index].color !== 'none') {
            c = procesarGalesAnt(time, index + 4, time[index].color, c)
          }
          index += 10
        }



        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          index + 4 < length - 1 && time[index].color !== 'none',
          index + 4,
          time[index].color,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: time[index].color,
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
          if (time[index + 3].color != 'none') {
            c = procesarGalesAnt(time, index + 4, time[index + 3].color, c)
          }
          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          bloque + 4 <= length - 1 && time[bloque + 3].color != 'none',
          bloque + 4,
          time[bloque + 3].color,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: time[bloque + 3].color,
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
          balance !== '' &&
          ultimo + 4 <= length - 1,
          ultimo + 4,
          balance,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: balance,
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
            time[index].color != 'none'
          ) {
            c = procesarGalesAnt(time, index + 2, time[index].color, c)
          }
          index += 5
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          ultimo + 3 <= length - 1 &&
          time[ultimo].color == time[ultimo + 1].color &&
          time[ultimo].color != 'none',
          ultimo + 2,
          time[ultimo].color,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: time[ultimo].color,
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
          prediccion: '',
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
          c = procesarGalesAnt(time, index + 4, 'low', c)
          index += 10
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          index + 4 < length - 1,
          index + 4,
          'low',
          c
        )
        c = confiabilidad

        return { uno, dos, tres, confiabilidad: c, prediccion: 'low' }
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
          c = procesarGalesAnt(time, index - 1, 'high', c)
          index += 10
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          index - 1 < length - 1,
          index - 1,
          'high',
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: 'high',
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
          time[instancia].minutes % 10 == 0 ? instancia : instancia + 5
        const last = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5
        let index = first

        while (index < last) {
          if (time[index + 6].color != 'none') {
            c = procesarGalesAnt(time, index + 7, time[index + 6].color, c)
          }
          index += 10
        }

        const { uno, dos, tres, confiabilidad } = procesarGales(
          time,
          last + 6 < length - 1 && time[last + 6]?.color != 'none',
          last + 7,
          time[last + 6]?.color,
          c
        )
        c = confiabilidad

        return {
          uno, dos, tres, confiabilidad: c, prediccion: time[last + 6]?.color ? time[last + 6].color : 'none',
        }
      },
    },
  ].filter((value) => value.minutos.includes(contador))
}
