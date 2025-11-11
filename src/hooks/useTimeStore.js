import { create } from 'zustand'
import { time, addDate } from '../utils/droptime'
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
    set(() => ({ time: time(value).lista, contador: time(value).contador }))
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
  }
}))
