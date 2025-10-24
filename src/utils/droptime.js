export function time(multiplicador) {
  const date = new Date()
  const array = []
  for (let i = 0; i < 60 / multiplicador; i++) {
    if (date.getMinutes() >= i * multiplicador) {
      array.unshift({
        time: `${String(date.getHours()).padStart(2, '0')}:${String(
          date.getMinutes() - i * multiplicador
        ).padStart(2, '0')}`,
        color: 'none',
        disable: false,
      })
    } else {
      array.unshift({
        time: `${String(date.getHours()).padStart(2, '0') - 1}:${String(
          60 + date.getMinutes() - i * multiplicador
        ).padStart(2, '0')}`,
        color: 'none',
        disable: false,
      })
    }
  }
  array[array.length - 1].disable = 'disabled'
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
      time: `${String(date.getHours()).padStart(2, '0')}:${String(
        date.getMinutes()
      ).padStart(2, '0')}`,
      color: 'none',
      disable: 'disabled',
    })

    return newArray
  }

  return []
}
