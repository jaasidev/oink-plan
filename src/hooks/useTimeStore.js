import { create } from 'zustand'
import { time, addDate } from '../utils/droptime'
import {estrategias} from '../utils/estrategias'
export const useTimeStore = create((set) => ({
  time: [],
  contador: 1,
  velas: {
    total: 0,
    hight: 0,
    stage: 0,
    low: 0,
  },
  estrategias: estrategias,
  initialice: (value) => {
    set(() => ({ time: time(value).lista, contador: time(value).contador }))
  },
  update: () => {
    set((state) => ({ time: addDate(state.time) }))
  },
  setVelas: () => {
    set((state) => ({
      velas: {
        total: state.time.filter((value) => value.color != 'none').length,
        hight: state.time.filter((value) => value.color == 'hight').length,
        stage: state.time.filter((value) => value.color == 'stage').length,
        low: state.time.filter((value) => value.color == 'low').length,
      },
    }))
  },
}))
