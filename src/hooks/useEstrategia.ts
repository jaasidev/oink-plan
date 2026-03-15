import { useTimeStore } from "./useTimeStore"
import { useEffect, useState } from "react"
import { formatEstrategias } from "../utils/format"
import type { Tiempo, EstrategiaBasica } from "../types/estrategia"

interface UseEstrategiaProps {
    lista: EstrategiaBasica[]
    time: Tiempo[]
    todos: boolean
    handleClick: () => void
}
export const useEstrategia = (): UseEstrategiaProps => {
    const estrategias = useTimeStore(state => state.estrategias)
    const time = useTimeStore(state => state.time)
    const contador = useTimeStore(state => state.contador)
    const [todos, setTodos] = useState(estrategias.length > 6 ? true : false)
    useEffect(() => {
        if (todos == false) {
            setTodos(estrategias.length > 6 ? true : false)
        }
    }, [contador])
    const handleClick = () => {
        setTodos(!todos)
    }

    return {
        lista: formatEstrategias(estrategias, todos),
        time,
        todos,
        handleClick
    }
}