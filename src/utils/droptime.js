const date = new Date()
function isBloque(value) {
  return value % 5 == 0
}

function formatDateString(date) {
  return String(date).padStart(2, '0')
}

const objetoBase = (hour, minutes, vela) => {
  return {
    hours: formatDateString(hour),
    minutes: formatDateString(minutes),
    bloque: isBloque(vela),
    color: 'none'
  }
}

const objetoTime = (horaBase, horaDos, minutes, vela) => {
  if (horaBase >= 0) return objetoBase(horaBase, minutes, vela)

  return objetoBase(horaDos, minutes, vela)
}

export function time(multiplicador) {

  const array = []
  let vela = 1
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 60 / multiplicador; i++) {
      if (date.getMinutes() >= i * multiplicador) {
        array.unshift(
          objetoTime(date.getHours() - j, date.getHours() - j + 24, date.getMinutes() - i * multiplicador, vela)
        )
      } else {
        array.unshift(
          objetoTime(date.getHours() - j - 1, date.getHours() + 23 - j, 60 + date.getMinutes() - i * multiplicador, vela)
        )
      }
      if (vela === 5) vela = 0
      vela++
    }
  }
  return array
}

export function addDate(array, multiplicador) {
  if (array.length > 0) {
    const newArray = [...array]
    const lastBloque = newArray.findLastIndex((value) => value.bloque == true)
    newArray.push(
      objetoBase(date.getHours(), date.getMinutes(), newArray.length - lastBloque)
    )
    newArray.shift()
    sessionStorage.setItem('prev', JSON.stringify(newArray))

    return newArray
  }

  return []
}

const colorCycle = {
  none: 'high',
  high: 'low',
  low: 'stage',
  stage: 'none',
}

export function changeColor(array, index) {
  const newArray = [...array]
  newArray[index] = {
    ...newArray[index],
    color: colorCycle[newArray[index].color] || 'none',
  }
  return newArray
}