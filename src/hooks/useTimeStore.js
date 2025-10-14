import { create } from 'zustand'
import { time, addDate } from '../utils/droptime'
export const useTimeStore = create((set) => ({
  time: [],
  contador: 1,
  resta: 0,
  initialice: (value) => {
    set(() => ({ time: time(value).lista, contador: time(value).contador }))
  },
  update: () => {
    set((state) => ({ time: addDate(state.time) }))
  },
  restar: (value) => {
    set(() => ({ resta: value }))
  },
}))
