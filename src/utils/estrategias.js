
export function estrategia(time) {
  const instancia = time.findIndex((value) => value.bloque == true)
  const ultimo = time.findLastIndex((value) => value.bloque == true)
  const { length } = time
  return [
    {
      title: 'MHI (Minoría)',
      description:
        'En un cuadrante, considera el color minoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 80,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'MHI (Mayoría)',
      description:
        'En un cuadrante, considera el color mayoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Los 3 Mosqueteros',
      description:
        'Considera el color de la vela 3. Apuesta al mismo color en la vela 4. Gale 1 en la vela 5 y Gale 2 en la vela 6, siguiendo el mismo color.',
      estrategia: () => {
        let confiabilidad = 0

        let uno = 0, dos = 0,
          tres = 0
        if (time.length > 0) {

          let index = instancia
          const bloque = ultimo + 3 < length - 1 ? ultimo : ultimo - 5
          console.log(time[bloque].minutes)
          while (index < bloque) {
            if (time[index + 2].color != 'none') {
              if (time[index + 2].color == time[index + 3].color) {
                confiabilidad + 5 < 99 ? confiabilidad += 5 : confiabilidad = 99
              } else if (time[index + 2].color == time[index + 4].color) {
                confiabilidad + 3 < 99 ? confiabilidad += 3 : confiabilidad = 99
              } else if (time[index + 2].color == time[index + 5].color) {
                confiabilidad + 1 < 99 ? confiabilidad += 1 : confiabilidad = 99
              }
            }
            index += 5
          }

          if (bloque + 3 > length - 1) {
            uno = 0
            dos = 0
            tres = 0
          } else if (time[bloque + 2].color != 'none') {
            uno = 100
            if (time[bloque + 2].color == time[bloque + 3].color) {
              confiabilidad + 5 < 99 ? confiabilidad += 5 : confiabilidad = 99
              uno = 0
            } else if (time[bloque + 3].color !== 'none') {
              uno = 0
              dos = 100
              if (time[bloque + 2].color == time[bloque + 4].color) {
                confiabilidad + 3 < 99 ? confiabilidad += 3 : confiabilidad = 99
                dos = 0
              } else if (time[bloque + 4].color != 'none') {
                dos = 0
                tres = 100
                if (time[bloque + 2].color == time[bloque + 5].color) {
                  confiabilidad + 1 < 99 ? confiabilidad += 1 : confiabilidad = 99
                  tres = 0
                }
                else if (time[bloque + 5].color != 'none') {
                  tres = 0
                }
              }
            }

          } else {
            uno = 0
            dos = 0
            tres = 0
          }
        }
        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad
        }
      },
    },
    {
      title: 'Millon Mayoría',
      description:
        'Considera el color mayoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      estrategia: () => {
        let confiabilidad = 0, uno = 0, dos = 0, tres = 0

        let index = instancia


        while (index < ultimo - 5) {
          let trozo = time.slice(index, index + 5)
          const alto = trozo.filter(value => value.color === 'high').length
          const bajo = trozo.filter(value => value.color === 'low').length
          const balance = alto > bajo ? 'high' : alto == bajo ? '' : 'low'

          if (time[index + 5].color == balance) {
            confiabilidad + 5 < 99 ? confiabilidad += 5 : confiabilidad = 99
          } else if (time[index + 5].color != 'none' && time[index + 6].color == balance) {
            confiabilidad + 3 < 99 ? confiabilidad += 3 : confiabilidad = 99
          } else if (time[index + 5].color != 'none' && time[index + 6].color != 'none' && time[index + 7].color == balance) {
            confiabilidad + 1 < 99 ? confiabilidad += 1 : confiabilidad = 99
          }

          index += 5

        }

        const pending = time.slice(ultimo - 5, ultimo)
        const pendingAlto = pending.filter(value => value.color === 'high').length
        const pendingBajo = pending.filter(value => value.color === 'low').length
        const balance = pendingAlto > pendingBajo ? 'high' : pendingAlto == pendingBajo ? '' : 'low'

        if (balance !== '') {
          uno = 100

          if (time[ultimo].color != 'none') {
            if (balance == time[ultimo].color) {
              confiabilidad + 5 < 99 ? confiabilidad += 5 : confiabilidad = 99
              uno = 0
            } else {
              uno = 0
              dos = 100
              if ((time[ultimo + 1].color != 'none')) {
                if (balance == time[ultimo + 1].color) {
                  confiabilidad + 3 < 99 ? confiabilidad += 3 : confiabilidad = 99
                  dos = 0
                } else {
                  dos = 0
                  tres = 100
                  if (time[ultimo + 2].color != 'none') {
                    if (balance == time[ultimo + 2].color) {
                      confiabilidad + 1 < 99 ? confiabilidad += 1 : confiabilidad = 99
                      tres = 0
                    } else {
                      tres = 0
                    }
                  }
                }
              }

            }
          }

        }


        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad
        }
      },
    },
    {
      title: 'Millon Minoría',
      description:
        'Considera el color minoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      estrategia: () => {


        let confiabilidad = 0, uno = 0, dos = 0, tres = 0

        let index = instancia


        while (index < ultimo - 5) {
          let trozo = time.slice(index, index + 5)
          const alto = trozo.filter(value => value.color === 'high').length
          const bajo = trozo.filter(value => value.color === 'low').length
          const balance = alto < bajo ? 'high' : alto == bajo ? '' : 'low'

          if (time[index + 5].color == balance) {
            confiabilidad + 5 < 99 ? confiabilidad += 5 : confiabilidad = 99
          } else if (time[index + 5].color != 'none' && time[index + 6].color == balance) {
            confiabilidad + 3 < 99 ? confiabilidad += 3 : confiabilidad = 99
          } else if (time[index + 5].color != 'none' && time[index + 6].color != 'none' && time[index + 7].color == balance) {
            confiabilidad + 1 < 99 ? confiabilidad += 1 : confiabilidad = 99
          }

          index += 5

        }

        const pending = time.slice(ultimo - 5, ultimo)
        const pendingAlto = pending.filter(value => value.color === 'high').length
        const pendingBajo = pending.filter(value => value.color === 'low').length
        const balance = pendingAlto < pendingBajo ? 'high' : pendingAlto == pendingBajo ? '' : 'low'

        if (balance !== '') {
          uno = 100

          if (time[ultimo].color != 'none') {
            if (balance == time[ultimo].color) {
              confiabilidad + 5 < 99 ? confiabilidad += 5 : confiabilidad = 99
              uno = 0
            } else {
              uno = 0
              dos = 100
              if ((time[ultimo + 1].color != 'none')) {
                if (balance == time[ultimo + 1].color) {
                  confiabilidad + 3 < 99 ? confiabilidad += 3 : confiabilidad = 99
                  dos = 0
                } else {
                  dos = 0
                  tres = 100
                  if (time[ultimo + 2].color != 'none') {
                    if (balance == time[ultimo + 2].color) {
                      confiabilidad + 1 < 99 ? confiabilidad += 1 : confiabilidad = 99
                      tres = 0
                    } else {
                      tres = 0
                    }
                  }
                }
              }

            }
          }

        }


        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad
        }
      },
    },
    {
      title: 'Patrón Impar',
      description:
        'Si las velas 1 y 3 son del mismo color, apuesta a ese color en la vela 5. Gale 1 en la vela 7 y Gale 2 en la vela 9, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Mejor de 3Multi-Bloque',
      description:
        'Considera la mayoría de las velas 3, 4 y 5. Apuesta a ese color en la vela 3 del SIGUIENTE cuadrante. Gales en la vela 3 de los cuadrantes subsiguientes.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Padrón 23',
      description:
        'Considera el color de la vela 1. Apuesta al mismo color en la vela 2. Gale 1 en la vela 3 y Gale 2 en la vela 4, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Torres Gemelas',
      description:
        'Considera el color de la vela 1. Apuesta al mismo color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: '3 Vecinos',
      description:
        'Considera el color de la vela 4. Apuesta al mismo color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: '3x1',
      description:
        'Considera el color minoritario de las velas 1, 2 y 3. Apuesta a ese color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Mejor de 5',
      description:
        'Considera el color mayoritario de las 5 velas del cuadrante. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Mejor de 5 (Opuesto)',
      description:
        'Considera el color mayoritario de las 5 velas. Apuesta al color OPUESTO en la vela 6. Gales en las velas 7 y 8, siguiendo el color opuesto.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: '2 Iguales y Continuación',
      description:
        'Si las velas 1 y 2 son del mismo color, apuesta a ese mismo color en la vela 3. Gales en las velas 4 y 5, siguiendo el mismo color.',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
    {
      title: 'Confluencia Triple',
      description:
        'Genera una señal en la vela 5 solo si las estrategias "Torres Gemelas", "3 Vecinos" y "3x1" predicen el mismo color. Una estrategia de alta confluencia..',
      estrategia: () => {


        return {
          uno: 0,
          dos: 0,
          tres: 0,
          confiabilidad: 10
        }
      },
    },
  ]

}