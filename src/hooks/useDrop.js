import { useTimeStore } from "./useTimeStore"
import { useEffect } from "react"
export function useDrop() {
    const time = useTimeStore(state => state.time)
    const update = useTimeStore(state => state.update)
    const contador = useTimeStore(state => state.contador)
    useEffect(() => {
        const intervalId = setInterval(() => {
            update()
        }, contador * 60000)

        return () => clearInterval(intervalId)
    }, [time, update, contador])

    return time
}