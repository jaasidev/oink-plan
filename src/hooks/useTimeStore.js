import { create } from 'zustand'
import { estrategia } from '../utils/estrategias'
export const useTimeStore = create((set) => ({
  time: [],
  contador: 1,
  estrategias: [],
  setTime: (value) => {
    set(({ time: value }))
  },
  setContador: (value) => {
    set(({ contador: value }))
  },
  setEstrategias: () => {
    set((state) => ({ estrategias: estrategia(state.time, state.contador) }))
  }
}))
