const API_URL = 'http://localhost:3000/elements'

/**
 * productService
 * Centraliza todas las llamadas a la API.
 */
export const productService = {
  async getAll() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Error al cargar productos')
    return res.json()
  },

  async create(data) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al crear producto')
    return res.json()
  },

  async update(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al actualizar producto')
    return res.json()
  },

  async remove(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar producto')
  },
}
