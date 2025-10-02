import { create } from "zustand"
import { time, addDate } from "../utils/droptime"
export const useTimeStore = create((set) => ({
    time: [],
    contador:1,
    initialice: (value) => {
        set(() => ({ time: time(value).lista, contador: time(value).contador }))
    },
    update: () => {
        set((state) => ({ time: addDate(state.time) }))
    }
}))