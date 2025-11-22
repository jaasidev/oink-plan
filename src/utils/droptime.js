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
          bloque: (date.getMinutes() - i * multiplicador) % 5 == 0 ? true : false
        })
      } else {
        array.unshift({
          hours: (String(date.getHours() - j - 1).padStart(2, '0')) >= 0 ? String(date.getHours() - j - 1).padStart(2, '0') : String(date.getHours() + 24 - j - 1).padStart(2, '0'),
          minutes: String(
            60 + date.getMinutes() - i * multiplicador
          ).padStart(2, '0'),
          color: 'none',
          bloque: (date.getMinutes() - i * multiplicador) % 5 == 0 ? true : false
        })
      }
    }
  }
  return array
}

export function addDate(array) {
  if (array.length > 0) {
    const newArray = [...array]
    const date = new Date()
    newArray.push({
      hours: String(date.getHours()).padStart(2, '0'),
      minutes: String(
        date.getMinutes()
      ).padStart(2, '0'),
      color: 'none',
      disable: 'disabled',
      bloque: date.getMinutes() % 5 == 0 ? true : false
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