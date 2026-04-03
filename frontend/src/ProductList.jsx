import ProductItem from './ProductItem'

function ProductList({ products, onEdit, onDelete, search, onSearchChange }) {
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Inventario <span className="count-badge">{filtered.length}</span></h2>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, tipo..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-msg">
          {search ? 'No se encontraron productos.' : 'No hay productos aún. ¡Agregá el primero!'}
        </p>
      ) : (
        <div className="product-list">
          {filtered.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
