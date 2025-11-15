import { create } from 'zustand'
import { addDate } from '../utils/droptime'
import { estrategia } from '../utils/estrategias'
export const useTimeStore = create((set) => ({
  time: [],
  contador: 1,
  velas: {
    total: 0,
    high: 0,
    stage: 0,
    low: 0,
  },
  estrategias: [],
  initialice: (value) => {
    set(() => ({ time: value.lista, contador: value.contador }))
    set((state) => ({ estrategias: estrategia(state.time) }))
  },
  update: () => {
    set((state) => ({ time: addDate(state.time) }))
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
  updatEst: () => {
    set((state) => ({ estrategias: estrategia(state.time) }))
  },
  updateLocal: () => {
    set(() => ({ time: JSON.parse(localStorage.getItem('prev')) }))
    set((state) => ({ estrategias: estrategia(state.time) }))
  }
}))
