/**
 * ProductItem
 * Componente presentacional puro: recibe datos y callbacks, no tiene estado propio.
 */
function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="product-item">
      <div className="product-info">
        <div className="product-header">
          <span className="product-name">{product.name}</span>
          <span className="product-type">{product.type}</span>
        </div>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        <div className="product-quantity">
          <span className={`qty-badge ${product.quantity === 0 ? 'qty-zero' : ''}`}>
            Stock: {product.quantity}
          </span>
        </div>
      </div>
      <div className="product-actions">
        <button className="btn-edit" onClick={() => onEdit(product)}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => onDelete(product.id)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProductItem
