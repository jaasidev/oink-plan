import type { EstrategiaBasica } from '../schemas/estrategia'
export function formatEstrategias(
  lista: EstrategiaBasica[],
  corte: boolean,
): EstrategiaBasica[] {
  if (corte) {
    return lista.slice(0, 6)
  }
  return lista
}
