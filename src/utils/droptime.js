function isBloque(date, multiplicador, i = 0, condicion) {
  if (multiplicador === 1) return (date - i * multiplicador) % 5 == 0 ? true : false
  else {
    return condicion % 5 == 0 ? true : false
  }
}


export function time(multiplicador) {
  const date = new Date()
  const array = []
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 60 / multiplicador; i++) {
      if (date.getMinutes() >= i * multiplicador) {
        array.unshift({
          hours: (String(date.getHours() - j).padStart(2, '0')) >= 0 ? (String(date.getHours() - j).padStart(2, '0')) : (String(date.getHours() - j + 24).padStart(2, '0')),
          minutes: String(date.getMinutes() - i * multiplicador).padStart(2, '0'),
          color: 'none',
          bloque: isBloque(date.getMinutes(), multiplicador, i, array.length)
        })
      } else {
        array.unshift({
          hours: (String(date.getHours() - j - 1).padStart(2, '0')) >= 0 ? String(date.getHours() - j - 1).padStart(2, '0') : String(date.getHours() + 24 - j - 1).padStart(2, '0'),
          minutes: String(
            60 + date.getMinutes() - i * multiplicador
          ).padStart(2, '0'),
          color: 'none',
          bloque: isBloque(date.getMinutes(), multiplicador, i, array.length)
        })
      }
    }
  }
  return array
}

export function addDate(array, multiplicador) {
  if (array.length > 0) {
    const newArray = [...array]
    const date = new Date()
    const lastBloque = newArray.findLastIndex(value => value.bloque == true)
    newArray.push({
      hours: String(date.getHours()).padStart(2, '0'),
      minutes: String(
        date.getMinutes()
      ).padStart(2, '0'),
      color: 'none',
      disable: 'disabled',
      bloque: isBloque(date.getMinutes(), multiplicador, newArray.length - 1 - lastBloque)
    })
    newArray.shift()
    sessionStorage.setItem('prev', JSON.stringify(newArray))

    return newArray
  }

  return []
}

export function changeColor(array, index) {
  const newArray = [...array]
  if (newArray[index].color == 'none') {
    newArray[index].color = 'high'
  } else if (newArray[index].color == 'high') {
    newArray[index].color = 'low'
  } else if (newArray[index].color == 'low') {
    newArray[index].color = 'stage'
  } else {
    newArray[index].color = 'none'
  }

  return newArray
}