import { create } from 'zustand'
import { estrategia } from '../utils/estrategias'
import { addDate, initTime } from '../utils/droptime'
import { ApuestasEstados } from '../schemas/enums'
import type { Tiempo, EstrategiaBasica, Bloque } from '../schemas/estrategia'

interface Velas {
  total: number
  high: number
  stage: number
  low: number
}

interface StoreProps {
  time: Tiempo[]
  contador: Bloque
  estrategias: EstrategiaBasica[]
  velas: Velas
  setTime: (value: Tiempo[]) => void
  setContador: (value: Bloque) => void
  setEstrategias: () => void
  resetEstrategias: () => void
  updateVelas: () => void
  resetVelas: () => void
  updateTime: () => void
  resetTime: () => void
  setInitTime: () => void
}

export const useTimeStore = create<StoreProps>((set) => ({
  time: [],
  contador: 1,
  estrategias: [],
  velas: {
    total: 0,
    high: 0,
    stage: 0,
    low: 0,
  },
  setTime: (value) => {
    set({ time: value })
  },
  setInitTime: () => {
    set((state) => ({ time: initTime(state.contador) }))
  },
  updateTime: () => {
    set((state) => ({ time: addDate(state.time, state.contador) }))
  },
  resetTime: () => {
    set({ time: [] })
  },
  setContador: (value: Bloque) => {
    set({ contador: value })
  },
  setEstrategias: () => {
    set((state) => ({ estrategias: estrategia(state.time, state.contador) }))
  },
  resetEstrategias: () => {
    set(() => ({ estrategias: [] }))
  },
  updateVelas: () => {
    set((state) => ({
      velas: state.time.reduce(
        (acc, value) => {
          if (value.color !== ApuestasEstados.NONE) acc.total += 1

          switch (value.color) {
            case ApuestasEstados.HIGH:
              acc.high += 1
              break
            case ApuestasEstados.STAGE:
              acc.stage += 1
              break
            case ApuestasEstados.LOW:
              acc.low += 1
              break
          }

          return acc
        },
        { total: 0, high: 0, stage: 0, low: 0 },
      ),
    }))
  },
  resetVelas: () => {
    set({ velas: { total: 0, high: 0, low: 0, stage: 0 } })
  },
}))
