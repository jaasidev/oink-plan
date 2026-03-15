import { create } from 'zustand'
import { estrategia } from '../utils/estrategias'
import type { Tiempo, EstrategiaBasica } from '../types/estrategia'

interface StoreProps {
  time: Tiempo[]
  contador: number
  estrategias: EstrategiaBasica[]
  setTime:(value:Tiempo[])=>void
  setContador:(value:number)=>void
  setEstrategias:()=>void
  resetEstrategias:()=>void
}

export const useTimeStore = create<StoreProps>((set) => ({
  time: [],
  contador: 1,
  estrategias: [],
  setTime: (value: Tiempo[]) => {
    set(({ time: value }))
  },
  setContador: (value: number) => {
    set(({ contador: value }))
  },
  setEstrategias: () => {
    set((state) => ({ estrategias: estrategia(state.time, state.contador) }))
  },
  resetEstrategias: () => {
    set(() => ({ estrategias: [] }))
  }
}))
