import { useRef } from 'react'
import { useTimeStore } from '../context/useTimeStore'
import type { Bloque } from '../schemas/estrategia'

export function useSubmitForm() {
  const minRef = useRef<HTMLSelectElement>(null)
  const monedaRef = useRef<HTMLSelectElement>(null)
  const setInitTime = useTimeStore((state) => state.setInitTime)
  const setContador = useTimeStore((state) => state.setContador)
  const setEstrategias = useTimeStore((state) => state.setEstrategias)
  const resetEstrategias = useTimeStore((state) => state.resetEstrategias)
  const resetVelas = useTimeStore((state) => state.resetVelas)
  const resetTime = useTimeStore((state) => state.resetTime)

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault()
    if (minRef.current) {
      setContador(Number.parseInt(minRef.current.value) as Bloque)
      setInitTime()
      resetVelas()
    }

    setEstrategias()
    sessionStorage.removeItem('prev')
    if (minRef.current) sessionStorage.setItem('contador', minRef.current.value)
  }

  const handleDelete = () => {
    resetTime()
    setContador(1)
    resetEstrategias()
    resetVelas()
    if (minRef.current) minRef.current.value = ''

    if (monedaRef.current) monedaRef.current.value = ''
  }

  return { minRef, monedaRef, handleSubmit, handleDelete }
}
