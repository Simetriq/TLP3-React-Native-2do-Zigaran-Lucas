import { useState, useMemo } from 'react'

/**
 * useProductSearch
 * Aísla la lógica de filtrado para que pueda reutilizarse
 * o modificarse (ej: agregar filtro por tipo) sin tocar el componente.
 */
export function useProductSearch(products) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
    )
  }, [products, search])

  return { search, setSearch, filtered }
}
