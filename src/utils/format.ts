import type { EstrategiaBasica } from '../types/estrategia'
export function formatEstrategias(
  lista: EstrategiaBasica[],
  corte: boolean,
): EstrategiaBasica[] {
  return corte ? lista.slice(0, 6) : lista
}
