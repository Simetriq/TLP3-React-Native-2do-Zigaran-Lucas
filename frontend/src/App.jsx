import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import './App.css'

const API_URL = 'http://localhost:3000/elements'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [search, setSearch] = useState('')

  // Cargar todos los productos
  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Error al cargar productos')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Crear producto
  const handleCreate = async (formData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error al crear producto')
      await fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  // Actualizar producto
  const handleUpdate = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error al actualizar producto')
      setEditingProduct(null)
      await fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  // Eliminar producto
  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que querés eliminar este producto?')) return
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar producto')
      await fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = (formData) => {
    if (editingProduct) {
      handleUpdate(formData)
    } else {
      handleCreate(formData)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Inventario</h1>
        <p>Administrá tus productos fácilmente</p>
      </header>

      <main className="app-main">
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total productos</span>
            <span className="stat-value">{products.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Sin stock</span>
            <span className="stat-value danger">
              {products.filter(p => p.quantity === 0).length}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Unidades totales</span>
            <span className="stat-value">
              {products.reduce((acc, p) => acc + p.quantity, 0)}
            </span>
          </div>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
        />

        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : (
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
            search={search}
            onSearchChange={setSearch}
          />
        )}
      </main>
    </div>
  )
}

export default App
