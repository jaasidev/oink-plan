import { useTimeStore } from '../context/useTimeStore'
import { useEffect, useState } from 'react'
import { formatEstrategias } from '../utils/format'
import type { EstrategiaBasica } from '../types/estrategia'

interface UseEstrategiaProps {
  lista: EstrategiaBasica[]
  todos: boolean
  handleClick: () => void
  total: number
}
export const useEstrategia = (): UseEstrategiaProps => {
  const estrategias = useTimeStore((state) => state.estrategias)
  const [todos, setTodos] = useState(estrategias.length > 6)

  useEffect(() => {
    if (todos === false) setTodos(estrategias.length > 6)
  }, [estrategias])

  const handleClick = () => {
    setTodos(!todos)
  }

  return {
    lista: formatEstrategias(estrategias, todos),
    todos,
    handleClick,
    total: estrategias.length,
  }
}
