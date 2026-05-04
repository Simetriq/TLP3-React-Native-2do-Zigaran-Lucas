import { useState } from 'react'
import { useProductContext } from './ProductContext'
import { useProductSearch } from './useProductSearch'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import StatsRow from './StatsRow'
import './App.css'

function App() {
  // Ahora usamos el contexto en lugar de useProducts
  const {
    products,
    loading,
    error,
    clearError,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductContext()

  const { search, setSearch, filtered } = useProductSearch(products)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleSubmit = async (formData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData)
    } else {
      await createProduct(formData)
    }
    setEditingProduct(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que querés eliminar este producto?')) return
    await deleteProduct(id)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Inventario</h1>
        <p>Administrá tus productos fácilmente</p>
      </header>

      <main className="app-main">
        <StatsRow products={products} />

        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
        />

        {error && (
          <div className="error-banner">
            {error}
            <button onClick={clearError}>✕</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : (
          <ProductList
            products={filtered}
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
