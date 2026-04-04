import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import { useProductSearch } from './hooks/useProductSearch'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import StatsRow from './components/StatsRow'
import './App.css'

function App() {
  const {
    products,
    loading,
    error,
    clearError,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts()

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
