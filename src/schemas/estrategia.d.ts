export interface Tiempo {
  hours: string
  minutes: string
  bloque: boolean
  color: ColorType
}

export type ColorType = 'none' | 'high' | 'low' | 'stage'

export abstract class EstrategiaBasica {
  id: number
  title: string
  description: string
  minutos: number[]

  abstract estrategia: () => void
}

export interface EstrategiaResultado {
  uno: number
  dos: number
  tres: number
  confiabilidad: number
}

export interface EstrategiaResultadoInfo extends EstrategiaResultado {
  prediccion: ColorType
}

export type Bloque = 1 | 5 | 15
