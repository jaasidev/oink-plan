export const estrategias = [
  {
    title: 'MHI (Minoría)',
    description:
      'En un cuadrante, considera el color minoritario de las velas 3, 4 y 5. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
    estrategia: () => {
      return {
        uno: 80,
        dos: 0,
        tres: 0,
        efectividad: 10
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
        efectividad: 10
      }
    },
  },
  {
    title: 'Los 3 Mosqueteros',
    description:
      'Considera el color de la vela 3. Apuesta al mismo color en la vela 4. Gale 1 en la vela 5 y Gale 2 en la vela 6, siguiendo el mismo color.',
    estrategia: () => {
      return {
        uno: 0,
        dos: 0,
        tres: 0,
        efectividad: 10
      }
    },
  },
  {
    title: 'Millon Mayoría',
    description:
      'Considera el color mayoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
    estrategia: () => {
      return {
        uno: 0,
        dos: 0,
        tres: 0,
        efectividad: 10
      }
    },
  },
  {
    title: 'Millon Minoría',
    description:
      'Considera el color minoritario de las primeras 5 velas. Apuesta a ese color en la vela 6. Gale 1 en la vela 7 y Gale 2 en la vela 8, siguiendo el mismo color.',
    estrategia: () => {
      return {
        uno: 0,
        dos: 0,
        tres: 0,
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
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
        efectividad: 10
      }
    },
  },
]
