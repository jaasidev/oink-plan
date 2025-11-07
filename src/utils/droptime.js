export function time(multiplicador) {
  const date = new Date()
  const array = []
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 60 / multiplicador; i++) {
      if (date.getMinutes() >= i * multiplicador) {
        array.unshift({
          hours: String(date.getHours()).padStart(2, '0') - j,
          minutes: String(date.getMinutes() - i * multiplicador).padStart(2, '0'),
          color: 'none',
          disable: false,
          bloque: (date.getMinutes() - i * multiplicador) % 5 == 0 ? true : false
        })
      } else {
        array.unshift({
          hours: String(date.getHours()).padStart(2, '0') - j - 1,
          minutes: String(
            60 + date.getMinutes() - i * multiplicador
          ).padStart(2, '0'),
          color: 'none',
          disable: false,
          bloque: (date.getMinutes() - i * multiplicador) % 5 == 0 ? true : false
        })
      }
    }
  }
  array[array.length - 1].disable = 'disabled'
  console.log(array)
  return {
    lista: array,
    contador: multiplicador,
  }
}

export function addDate(array) {
  if (array.length > 0) {
    array[array.length - 1].disable = false
    const newArray = [...array]
    const date = new Date()
    newArray.shift()
    newArray.push({
      hours: String(date.getHours()).padStart(2, '0'),
      minutes: String(
        date.getMinutes()
      ).padStart(2, '0'),
      color: 'none',
      disable: 'disabled',
      bloque: date.getMinutes() % 5 == 0 ? true : false
    })

    return newArray
  }

  return []
}
