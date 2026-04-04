import ProductItem from './ProductItem'

/**
 * ProductList
 * Recibe la lista ya filtrada desde App (vía useProductSearch).
 * Solo se encarga de renderizar los ítems y el buscador.
 */
function ProductList({ products, onEdit, onDelete, search, onSearchChange }) {
  return (
    <div className="list-card">
      <div className="list-header">
        <h2>
          Inventario <span className="count-badge">{products.length}</span>
        </h2>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, tipo..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {products.length === 0 ? (
        <p className="empty-msg">
          {search
            ? 'No se encontraron productos.'
            : 'No hay productos aún. ¡Agregá el primero!'}
        </p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
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
