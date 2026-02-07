export function calcularBalance(trozo, invertir = false) {
  const alto = trozo.filter((v) => v.color === 'high').length
  const bajo = trozo.filter((v) => v.color === 'low').length
  if (alto === bajo) return ''
  const resultado = alto > bajo ? 'high' : 'low'
  return invertir ? (resultado === 'high' ? 'low' : 'high') : resultado
}

export function procesarGales(
  time,
  condicionAdicional,
  index,
  prediccion,
  confiabilidad
) {
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
      if (time[index + 1]?.color === prediccion) {
        dos = 0
        confiabilidad = Math.min(confiabilidad + 3, 99)
      } else if (time[index + 1]?.color !== 'none') {
        dos = 0
        tres = 100
        if (time[index + 2]?.color === prediccion) {
          tres = 0
          confiabilidad = Math.min(confiabilidad + 1, 99)
        } else if (time[index + 2]?.color !== 'none') {
          tres = 0
        }
      }
    }
  }

  return { uno, dos, tres, confiabilidad }
}

export function procesarGalesAnt(time, index, prediccion, confiabilidad) {
  if (prediccion != 'none') {
    if (time[index].color == prediccion) {
      confiabilidad = Math.min(confiabilidad + 5, 99)
    } else if (
      time[index].color != 'none' &&
      time[index + 1].color == prediccion
    ) {
      confiabilidad = Math.min(confiabilidad + 3, 99)
    } else if (
      time[index].color != 'none' &&
      time[index + 1].color != 'none' &&
      time[index + 2].color == prediccion
    ) {
      confiabilidad = Math.min(confiabilidad + 1, 99)
    }
  }

  return confiabilidad
}
