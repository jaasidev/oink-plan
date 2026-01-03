export function estrategia(time, contador) {
  const instancia = time.findIndex((value) => value.bloque == true)
  const ultimo = time.findLastIndex((value) => value.bloque == true)
  const { length } = time
  return [
    {
      title: 'MHI (Minoría)',
      description:
        'En un cuadrante, considera el color minoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let confiabilidad = 0

        let uno = 0,
          dos = 0,
          tres = 0
        let index = time.findIndex(
          (value) => value.bloque == true && value.minutes % 10 == 0
        )
        while (index + 9 < ultimo) {
          let trozo = time.slice(index + 2, index + 5)

          const alto = trozo.filter((value) => value.color == 'high').length
          const bajo = trozo.filter((value) => value.color == 'low').length
          const balance = alto < bajo ? 'low' : alto == bajo ? '' : 'high'

          if (time[index + 5].color == balance) {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6] == balance
          ) {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6].color != 'none' &&
            time[index + 7] == balance
          ) {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }
          index += 10
        }

        const seguimiento = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5

        let trozo = time.slice(seguimiento, seguimiento + 5)
        const pendingAlto = trozo.filter(
          (value) => value.color == 'high'
        ).length
        const pendingBajo = trozo.filter((value) => value.color == 'low').length
        const balance =
          pendingAlto > pendingBajo
            ? 'low'
            : pendingAlto == pendingBajo
            ? ''
            : 'high'
        if (seguimiento + 5 < length - 1) {
          if (balance != '') {
            uno = 100
            if (time[seguimiento + 5].color == balance) {
              uno = 0
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[seguimiento + 5].color != 'none') {
              uno = 0
              dos = 100
              if (time[seguimiento + 6].color == balance) {
                dos = 0
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              }
            } else if (time[seguimiento + 6].color != 'none') {
              dos = 0
              tres = 100
              if (time[seguimiento + 7]?.color == balance) {
                tres = 0
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
              } else if (time[seguimiento + 7]?.color != 'none') {
                tres = 0
              }
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: balance,
        }
      },
    },
    {
      title: 'MHI (Mayoría)',
      description:
        'En un cuadrante, considera el color mayoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let confiabilidad = 0

        let uno = 0,
          dos = 0,
          tres = 0
        let index = time.findIndex(
          (value) => value.bloque == true && value.minutes % 10 == 0
        )
        while (index + 9 < ultimo) {
          let trozo = time.slice(index + 2, index + 5)

          const alto = trozo.filter((value) => value.color == 'high').length
          const bajo = trozo.filter((value) => value.color == 'low').length
          const balance = alto < bajo ? 'high' : alto == bajo ? '' : 'low'
          if (time[index + 5].color == balance) {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6] == balance
          ) {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (
            time[index + 6].color != 'none' &&
            time[index + 7] == balance
          ) {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }
          index += 10
        }

        const seguimiento = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5

        let trozo = time.slice(seguimiento, seguimiento + 5)
        const pendingAlto = trozo.filter(
          (value) => value.color == 'high'
        ).length
        const pendingBajo = trozo.filter((value) => value.color == 'low').length
        const balance =
          pendingAlto < pendingBajo
            ? 'low'
            : pendingAlto == pendingBajo
            ? ''
            : 'high'
        if (seguimiento + 5 < length - 1) {
          if (balance != '') {
            uno = 100
            if (time[seguimiento + 5].color == balance) {
              uno = 0
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[seguimiento + 5].color != 'none') {
              uno = 0
              dos = 100
              if (time[seguimiento + 6].color == balance) {
                dos = 0
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              }
            } else if (time[seguimiento + 6].color != 'none') {
              dos = 0
              tres = 100
              if (time[seguimiento + 7]?.color == balance) {
                tres = 0
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
              } else if (time[seguimiento + 7]?.color != 'none') {
                tres = 0
              }
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: balance,
        }
      },
    },
    {
      title: 'Los 3 Mosqueteros',
      description:
        'Considera el color de la vela 3. Apuesta al mismo color en la vela 4. Gale 1 en la vela 5 y Gale 2 en la vela 6, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let confiabilidad = 0

        let uno = 0,
          dos = 0,
          tres = 0
        let index = instancia
        const bloque = ultimo + 3 < length - 1 ? ultimo : ultimo - 5
        if (time.length > 0) {
          while (index < bloque) {
            if (time[index + 2].color != 'none') {
              if (time[index + 2].color == time[index + 3].color) {
                confiabilidad + 5 < 99
                  ? (confiabilidad += 5)
                  : (confiabilidad = 99)
              } else if (time[index + 2].color == time[index + 4].color) {
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              } else if (time[index + 2].color == time[index + 5].color) {
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
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
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
              uno = 0
            } else if (time[bloque + 3].color !== 'none') {
              uno = 0
              dos = 100
              if (time[bloque + 2].color == time[bloque + 4]?.color) {
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
                dos = 0
              } else if (time[bloque + 4]?.color != 'none') {
                dos = 0
                tres = 100
                if (time[bloque + 2].color == time[bloque + 5]?.color) {
                  confiabilidad + 1 < 99
                    ? (confiabilidad += 1)
                    : (confiabilidad = 99)
                  tres = 0
                } else if (time[bloque + 5]?.color != 'none') {
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
          confiabilidad: confiabilidad,
          prediccion: time[bloque + 2].color,
        }
      },
    },
    {
      title: 'Millon Mayoría',
      description:
        'Considera el color mayoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let confiabilidad = 0,
          uno = 0,
          dos = 0,
          tres = 0

        let index = instancia

        while (index < ultimo - 5) {
          let trozo = time.slice(index, index + 5)
          const alto = trozo.filter((value) => value.color === 'high').length
          const bajo = trozo.filter((value) => value.color === 'low').length
          const balance = alto > bajo ? 'high' : alto == bajo ? '' : 'low'

          if (time[index + 5].color == balance) {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6].color == balance
          ) {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6].color != 'none' &&
            time[index + 7].color == balance
          ) {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }

          index += 5
        }

        const pending = time.slice(ultimo - 5, ultimo)
        const pendingAlto = pending.filter(
          (value) => value.color === 'high'
        ).length
        const pendingBajo = pending.filter(
          (value) => value.color === 'low'
        ).length
        const balance =
          pendingAlto > pendingBajo
            ? 'high'
            : pendingAlto == pendingBajo
            ? ''
            : 'low'

        if (balance !== '') {
          uno = 100

          if (time[ultimo].color != 'none') {
            if (balance == time[ultimo].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
              uno = 0
            } else {
              uno = 0
              dos = 100
              if (time[ultimo + 1]?.color != 'none') {
                if (balance == time[ultimo + 1]?.color) {
                  confiabilidad + 3 < 99
                    ? (confiabilidad += 3)
                    : (confiabilidad = 99)
                  dos = 0
                } else {
                  dos = 0
                  tres = 100
                  if (time[ultimo + 2]?.color != 'none') {
                    if (balance == time[ultimo + 2]?.color) {
                      confiabilidad + 1 < 99
                        ? (confiabilidad += 1)
                        : (confiabilidad = 99)
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
          confiabilidad: confiabilidad,
          prediccion: balance,
        }
      },
    },
    {
      title: 'Millon Minoría',
      description:
        'Considera el color minoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let confiabilidad = 0,
          uno = 0,
          dos = 0,
          tres = 0

        let index = instancia

        while (index < ultimo - 5) {
          let trozo = time.slice(index, index + 5)
          const alto = trozo.filter((value) => value.color === 'high').length
          const bajo = trozo.filter((value) => value.color === 'low').length
          const balance = alto < bajo ? 'high' : alto == bajo ? '' : 'low'

          if (time[index + 5].color == balance) {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6].color == balance
          ) {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (
            time[index + 5].color != 'none' &&
            time[index + 6].color != 'none' &&
            time[index + 7].color == balance
          ) {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }

          index += 5
        }

        const pending = time.slice(ultimo - 5, ultimo)
        const pendingAlto = pending.filter(
          (value) => value.color === 'high'
        ).length
        const pendingBajo = pending.filter(
          (value) => value.color === 'low'
        ).length
        const balance =
          pendingAlto < pendingBajo
            ? 'high'
            : pendingAlto == pendingBajo
            ? ''
            : 'low'

        if (balance !== '') {
          uno = 100

          if (time[ultimo].color != 'none') {
            if (balance == time[ultimo].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
              uno = 0
            } else {
              uno = 0
              dos = 100
              if (time[ultimo + 1]?.color != 'none') {
                if (balance == time[ultimo + 1]?.color) {
                  confiabilidad + 3 < 99
                    ? (confiabilidad += 3)
                    : (confiabilidad = 99)
                  dos = 0
                } else {
                  dos = 0
                  tres = 100
                  if (time[ultimo + 2]?.color != 'none') {
                    if (balance == time[ultimo + 2]?.color) {
                      confiabilidad + 1 < 99
                        ? (confiabilidad += 1)
                        : (confiabilidad = 99)
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
          confiabilidad: confiabilidad,
          prediccion: balance,
        }
      },
    },
    {
      title: 'Patrón Impar',
      description:
        'Si las velas 1 y 3 son del mismo color, apuesta a ese color en la vela 5. Gale 1 en la vela 7 y Gale 2 en la vela 9, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0
        let index = time.findIndex(
          (value) => value.bloque == true && value.minutes % 10 == 0
        )

        while (index + 9 < ultimo) {
          if (
            time[index].color == time[index + 2].color &&
            time[index].color !== 'none'
          ) {
            if (time[index].color == time[index + 4].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (
              time[index + 4].color != 'none' &&
              time[index].color == time[index + 6].color
            ) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (
              time[index + 4].color != 'none' &&
              time[index + 6].color != 'none' &&
              time[index].color == time[index + 8].color
            ) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }

          index += 10
        }

        const seguimiento = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5

        if (seguimiento + 4 < length - 1) {
          if (
            time[seguimiento].color == time[seguimiento + 2].color &&
            time[seguimiento].color !== 'none'
          ) {
            uno = 100
            if (time[seguimiento].color == time[seguimiento + 4].color) {
              uno = 0
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[seguimiento + 4].color != 'none') {
              uno = 0
              dos = 100
              if (time[seguimiento].color == time[seguimiento + 6]?.color) {
                dos = 0
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              }
            } else if (time[seguimiento + 6]?.color != 'none') {
              dos = 0
              tres = 100
              if (time[seguimiento].color == time[seguimiento + 8]?.color) {
                tres = 0
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
              }
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: time[seguimiento].color,
        }
      },
    },
    {
      title: 'Mejor de 3Multi-Bloque',
      description:
        'Considera la mayoría de las velas 3, 4 y 5. Apuesta a ese color en la vela 3 del SIGUIENTE cuadrante. Gales en la vela 3 de los cuadrantes subsiguientes.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0
        let index = time.findIndex(
          (value) => value.bloque == true && value.minutes % 10 == 0
        )

        while (index + 20 < ultimo) {
          let trozo = time.slice(index + 2, index + 5)

          const alto = trozo.filter((value) => value.color == 'high').length
          const bajo = trozo.filter((value) => value.color == 'low').length
          const balance = alto > bajo ? 'high' : alto == bajo ? '' : 'low'

          if (balance == time[index + 7].color) {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (
            balance == time[index + 12].color &&
            time[index + 7].color != 'none'
          ) {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (
            balance == time[index + 17].color &&
            time[index + 13].color !== 'none'
          ) {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }
          index += 10
        }

        let trozo = time.slice(index, index + 6)
        const seguimientoAlto = trozo.filter(
          (value) => value.color == 'high'
        ).length
        const seguimientoBajo = trozo.filter(
          (value) => value.color == 'low'
        ).length
        const seguimientoBalance =
          seguimientoAlto > seguimientoBajo
            ? 'high'
            : seguimientoAlto == seguimientoBajo
            ? ''
            : 'low'

        if (index + 7 <= length - 1 && seguimientoBalance != '') {
          uno = 100

          if (time[index + 7].color == seguimientoBalance) {
            uno = 0
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (time[index + 7].color != 'none') {
            uno = 0

            if (index + 12 <= length - 1) {
              dos = 100

              if (time[index + 12]?.color == seguimientoBalance) {
                dos = 0
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              } else if (time[index + 12]?.color != 'none') {
                dos = 0
                if (index + 17 <= length - 1) {
                  tres = 100

                  if (time[index + 17]?.color == seguimientoBalance) {
                    tres = 0
                    confiabilidad + 1 < 99
                      ? (confiabilidad += 1)
                      : (confiabilidad = 99)
                  } else if (time[index + 17]?.color != 'none') {
                    tres = 0
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
          confiabilidad: confiabilidad,
          prediccion: seguimientoBalance,
        }
      },
    },
    {
      title: 'Padrón 23',
      description:
        'Considera el color de la vela 1. Apuesta al mismo color en la vela 2. Gale 1 en la vela 3 y Gale 2 en la vela 4, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0
        let index = instancia

        while (index < ultimo) {
          if (time[index].color != 'none' && time[index + 1].color != 'none') {
            if (time[index].color == time[index + 1].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (
              time[index + 1].color != 'none' &&
              time[index].color == time[index + 2].color
            ) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (
              time[index + 1].color != 'none' &&
              time[index + 2].color != 'none' &&
              time[index].color == time[index + 3].color
            ) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }

          index += 5
        }

        if (time[ultimo].color != 'none' && ultimo + 1 < length - 1) {
          uno = 100

          if (time[ultimo].color == time[ultimo + 1].color) {
            uno = 0
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (time[ultimo + 1].color != 'none') {
            uno = 0
            dos = 100
            if (time[ultimo].color == time[ultimo + 2]?.color) {
              dos = 0
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            }
          } else if (time[ultimo + 2]?.color != 'none') {
            dos = 0
            tres = 100
            if (time[ultimo].color == time[ultimo + 3]?.color) {
              tres = 0
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          } else if (
            time[ultimo + 3]?.color != 'none' &&
            time[ultimo + 3]?.color != time[ultimo].color
          ) {
            uno = 0
            dos = 0
            tres = 0
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: time[ultimo].color,
        }
      },
    },
    {
      title: 'Torres Gemelas',
      description:
        'Considera el color de la vela 1. Apuesta al mismo color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0
        let index = time.findIndex(
          (value) => value.bloque == true && value.minutes % 10 == 0
        )

        while (index + 9 < ultimo) {
          if (time[index].color !== 'none') {
            if (time[index].color == time[index + 4].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (
              time[index + 4].color != 'none' &&
              time[index].color == time[index + 5].color
            ) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (
              time[index + 4].color != 'none' &&
              time[index + 5].color != 'none' &&
              time[index].color == time[index + 6].color
            ) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }

          index += 10
        }

        const seguimiento = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5

        if (seguimiento + 4 < length - 1) {
          if (time[seguimiento].color !== 'none') {
            uno = 100
            if (time[seguimiento].color == time[seguimiento + 4].color) {
              uno = 0
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[seguimiento + 4].color != 'none') {
              uno = 0
              dos = 100
              if (time[seguimiento].color == time[seguimiento + 5]?.color) {
                dos = 0
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              }
            } else if (time[seguimiento + 5]?.color != 'none') {
              dos = 0
              tres = 100
              if (time[seguimiento].color == time[seguimiento + 6]?.color) {
                tres = 0
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
              }
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: time[seguimiento].color,
        }
      },
    },
    {
      title: '3 Vecinos',
      description:
        'Considera el color de la vela 4. Apuesta al mismo color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let confiabilidad = 0

        let uno = 0,
          dos = 0,
          tres = 0
        let index = instancia
        const bloque = ultimo + 4 <= length - 1 ? ultimo : ultimo - 5

        while (index < bloque) {
          if (time[index + 3].color != 'none') {
            if (time[index + 3].color == time[index + 4].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[index + 3].color == time[index + 5].color) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (time[index + 3].color == time[index + 6].color) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }
          index += 5
        }

        if (bloque + 4 > length - 1) {
          uno = 0
          dos = 0
          tres = 0
        } else if (time[bloque + 3].color != 'none') {
          uno = 100
          if (time[bloque + 3].color == time[bloque + 4].color) {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
            uno = 0
          } else if (time[bloque + 4].color !== 'none') {
            uno = 0
            dos = 100
            if (time[bloque + 3].color == time[bloque + 5]?.color) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
              dos = 0
            } else if (time[bloque + 5]?.color != 'none') {
              dos = 0
              tres = 100
              if (time[bloque + 3].color == time[bloque + 6]?.color) {
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
                tres = 0
              } else if (time[bloque + 6]?.color != 'none') {
                tres = 0
              }
            }
          }
        } else {
          uno = 0
          dos = 0
          tres = 0
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: time[bloque + 3].color,
        }
      },
    },
    {
      title: '3x1',
      description:
        'Considera el color minoritario de las velas 1, 2 y 3. Apuesta a ese color en la vela 5. Gale 1 en la vela 6 y Gale 2 en la vela 7, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0

        let index = instancia

        while (index < ultimo) {
          let trozo = time.slice(index, index + 3)
          const alto = trozo.filter((value) => value.color == 'high').length
          const bajo = trozo.filter((value) => value.color == 'low').length
          const balance = alto > bajo ? 'low' : alto == bajo ? '' : 'high'

          if (balance != '') {
            if (time[index + 4].color == balance) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (
              time[index + 4].color != 'none' &&
              time[index + 5].color == balance
            ) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (
              time[index + 4].color != 'none' &&
              time[index + 5].color != 'none' &&
              time[index + 6].color == balance
            ) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }

          index += 5
        }

        const pending = time.slice(ultimo, ultimo + 3)
        const pendingAlto = pending.filter(
          (value) => value.color === 'high'
        ).length
        const pendingBajo = pending.filter(
          (value) => value.color === 'low'
        ).length
        const balance =
          pendingAlto < pendingBajo
            ? 'high'
            : pendingAlto == pendingBajo
            ? ''
            : 'low'
        if (ultimo + 5 <= length - 1) {
          if (balance !== '' && ultimo + 4 <= length - 1) {
            uno = 100

            if (time[ultimo].color != 'none') {
              if (balance == time[ultimo + 4].color) {
                confiabilidad + 5 < 99
                  ? (confiabilidad += 5)
                  : (confiabilidad = 99)
                uno = 0
              } else {
                uno = 0
                dos = 100
                if (time[ultimo + 4].color != 'none') {
                  if (balance == time[ultimo + 5].color) {
                    confiabilidad + 3 < 99
                      ? (confiabilidad += 3)
                      : (confiabilidad = 99)
                    dos = 0
                  } else {
                    dos = 0
                    tres = 100
                    if (time[ultimo + 5].color != 'none') {
                      if (balance == time[ultimo + 6]?.color) {
                        confiabilidad + 1 < 99
                          ? (confiabilidad += 1)
                          : (confiabilidad = 99)
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
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: balance,
        }
      },
    },
    {
      title: '2 Iguales y Continuación',
      description:
        'Si las velas 1 y 2 son del mismo color, apuesta a ese mismo color en la vela 3. Gales en las velas 4 y 5, siguiendo el mismo color.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0

        let index = instancia

        while (index < ultimo) {
          if (
            time[index].color == time[index + 1].color &&
            time[index].color != 'none'
          ) {
            if (time[index].color == time[index + 2].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[index].color == time[index + 3].color) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (time[index].color == time[index + 4].color) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }

          index += 5
        }

        if (ultimo + 3 <= length - 1) {
          if (
            time[ultimo].color == time[ultimo + 1].color &&
            time[ultimo].color != 'none'
          ) {
            uno = 100

            if (time[ultimo].color == time[ultimo + 2].color) {
              uno = 0
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[ultimo + 2].color != 'none') {
              dos = 100
              uno = 0
              if (time[ultimo].color == time[ultimo + 3].color) {
                confiabilidad + 3 < 99
                  ? (confiabilidad += 3)
                  : (confiabilidad = 99)
              }
            } else if (time[ultimo + 3].color != 'none') {
              dos = 0
              tres = 100
              if (time[ultimo].color == time[ultimo + 4]?.color) {
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
              }
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: time[ultimo].color,
        }
      },
    },
    {
      title: 'Confluencia Triple',
      description:
        'Genera una señal en la vela 5 solo si las estrategias "Torres Gemelas", "3 Vecinos" y "3x1" predicen el mismo color. Una estrategia de alta confluencia..',
      minutos: 1,
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
      title: '4 Rojos',
      description:
        'Estrategia basada en la tendencia a que las velas en los minutos terminadas en 4 sea roja',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0

        const first =
          time[instancia].minutes % 10 == 0 ? instancia : instancia + 5
        const last = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5
        let index = first
        while (index < last) {
          if (time[index + 8].color == 'low') {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (time[index + 5].color == 'low') {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (time[index + 6].color == 'low') {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }
          index += 10
        }

        if (last + 4 < length - 1) {
          uno = 100
          if (time[last + 4].color == 'low') {
            uno = 0
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (time[last + 4].color != 'none') {
            uno = 0
            dos = 100
            if (time[last + 5]?.color == 'low') {
              dos = 0
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (time[last + 5]?.color != 'none') {
              dos = 0
              tres = 100
              if (time[last + 6].color == 'low') {
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
                tres = 0
              } else if (time[last + 6]?.color != 'none') {
                tres = 0
              }
            }
          }
        }
        return { uno, dos, tres, confiabilidad, prediccion: 'low' }
      },
    },
    {
      title: '9 Verdes',
      description:
        'Estrategia basada en la tendencia que las velas terminadas en numero 9 sean verdes.',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0

        const first =
          time[instancia].minutes % 10 == 0 ? instancia : instancia + 10
        const last = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5
        let index = first
        while (index < last - 10) {
          if (time[index - 1]?.color == 'high') {
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (time[index].color == 'high') {
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (time[index + 1]?.color == 'high') {
            confiabilidad + 1 < 99 ? (confiabilidad += 1) : (confiabilidad = 99)
          }
          index += 10
        }

        uno = 100
        if (time[last - 1].color == 'high') {
          uno = 0
          confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
        } else if (time[last - 1].color != 'none') {
          uno = 0
          dos = 100
          if (time[last].color == 'high') {
            dos = 0
            confiabilidad + 3 < 99 ? (confiabilidad += 3) : (confiabilidad = 99)
          } else if (time[last].color != 'none') {
            dos = 0
            tres = 100
            if (time[last + 1]?.color == 'high') {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
              tres = 0
            } else if (time[last + 1]?.color != 'none') {
              tres = 0
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: 'high',
        }
      },
    },
    {
      title: 'Seven Flip',
      description:
        'La vela numero 7 y la vela numero 8 van a tener el mismo color, gale en vela 9 y vela 10',
      minutos: 1,
      estrategia: () => {
        let uno = 0,
          dos = 0,
          tres = 0,
          confiabilidad = 0

        const first =
          time[instancia].minutes % 10 == 0 ? instancia : instancia + 5
        const last = time[ultimo].minutes % 10 == 0 ? ultimo : ultimo - 5
        let index = first
        while (index < last) {
          if (time[index + 6].color != 'none') {
            if (time[index + 6].color == time[index + 7].color) {
              confiabilidad + 5 < 99
                ? (confiabilidad += 5)
                : (confiabilidad = 99)
            } else if (time[index + 6].color == time[index + 8].color) {
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (time[index + 6].color == time[index + 9].color) {
              confiabilidad + 1 < 99
                ? (confiabilidad += 1)
                : (confiabilidad = 99)
            }
          }
          index += 10
        }

        if (last + 6 < length - 1 && time[last + 6]?.color != 'none') {
          uno = 100
          if (time[last + 6].color == time[index + 7]?.color) {
            uno = 0
            confiabilidad + 5 < 99 ? (confiabilidad += 5) : (confiabilidad = 99)
          } else if (time[last + 8].color != 'none') {
            uno = 0
            dos = 100
            if (time[last + 6].color == time[index + 8]?.color) {
              dos = 0
              confiabilidad + 3 < 99
                ? (confiabilidad += 3)
                : (confiabilidad = 99)
            } else if (
              time[last + 9]?.color != 'none' &&
              last + 10 > length - 1
            ) {
              dos = 0
              tres = 100
              if (time[last + 6].color == time[index + 9]?.color) {
                confiabilidad + 1 < 99
                  ? (confiabilidad += 1)
                  : (confiabilidad = 99)
                tres = 0
              } else if (time[last + 9]?.color != 'none') {
                tres = 0
              }
            }
          }
        }

        return {
          uno: uno,
          dos: dos,
          tres: tres,
          confiabilidad: confiabilidad,
          prediccion: time[last + 6]?.color ? time[last + 6].color : 'none',
        }
      },
    },
  ].filter((value) => value.minutos === contador)
}
