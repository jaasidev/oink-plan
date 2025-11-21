import { create } from 'zustand'
import { estrategia } from '../utils/estrategias'
export const useTimeStore = create((set) => ({
  time: [],
  contador: 0,
  velas: {
    total: 0,
    high: 0,
    stage: 0,
    low: 0,
  },
  estrategias: [],
  setTime: (value) => {
    set(() => ({ time: value }))
  },
  setContador: (value) => {
    set(() => ({ contador: value }))
  },
  setVelas: () => {
    set((state) => ({
      velas: {
        total: state.time.filter((value) => value.color != 'none').length,
        high: state.time.filter((value) => value.color == 'high').length,
        stage: state.time.filter((value) => value.color == 'stage').length,
        low: state.time.filter((value) => value.color == 'low').length,
      },
    }))
  },
  setEstrategias: () => {
    set((state) => ({ estrategias: estrategia(state.time) }))
  }
}))
