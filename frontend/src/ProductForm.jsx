import { useProductForm } from '../hooks/useProductForm'

/**
 * ProductForm
 * Responsabilidad única: renderizar el formulario.
 * El estado y la lógica del form viven en useProductForm.
 */
function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const { form, validationError, handleChange, validate, reset, getSubmitData } =
    useProductForm(editingProduct)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(getSubmitData())
    reset()
  }

  return (
    <div className="form-card">
      <h2>{editingProduct ? 'Editar producto' : 'Agregar producto'}</h2>
      {validationError && <p className="error-msg">{validationError}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Laptop HP"
            />
          </div>
          <div className="form-group">
            <label>Tipo *</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Ej: Electrónica"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción opcional"
            />
          </div>
          <div className="form-group">
            <label>Cantidad *</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="form-actions">
          {editingProduct && (
            <button type="button" className="btn-cancel" onClick={onCancelEdit}>
              Cancelar
            </button>
          )}
          <button type="submit" className="btn-primary">
            {editingProduct ? 'Guardar cambios' : 'Agregar producto'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
