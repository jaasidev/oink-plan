import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { estrategia } from '../utils/estrategias'
import { addDate, initTime } from '../utils/droptime'
import type { Tiempo, EstrategiaBasica, Bloque } from '../schemas/estrategia'

interface StoreProps {
  time: Tiempo[]
  contador: Bloque
  estrategias: EstrategiaBasica[]
  setTime: (value: Tiempo[]) => void
  setContador: (value: Bloque) => void
  setEstrategias: () => void
  resetEstrategias: () => void
  updateTime: () => void
  resetTime: () => void
  setInitTime: () => void
}

export const useTimeStore = create<StoreProps>()(
  persist(
    (set) => ({
      time: [],
      contador: 1,
      estrategias: [],
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
        set((state) => ({
          estrategias: estrategia(state.time, state.contador),
        }))
      },
      resetEstrategias: () => {
        set(() => ({ estrategias: [] }))
      },
    }),
    {
      name: 'previous-time',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ time: state.time, contador: state.contador }),
      onRehydrateStorage: (state) => {
        console.log('hydration starts')

        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            console.log('hydration finished')
          }
        }
      },
    },
  ),
)
