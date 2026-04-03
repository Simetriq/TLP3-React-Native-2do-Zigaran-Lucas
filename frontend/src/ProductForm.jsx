import { useState, useEffect } from 'react'

function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    quantity: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description || '',
        type: editingProduct.type,
        quantity: editingProduct.quantity
      })
    } else {
      setForm({ name: '', description: '', type: '', quantity: '' })
    }
  }, [editingProduct])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.type || form.quantity === '') {
      setError('Los campos Nombre, Tipo y Cantidad son obligatorios.')
      return
    }
    setError('')
    onSubmit({ ...form, quantity: Number(form.quantity) })
    setForm({ name: '', description: '', type: '', quantity: '' })
  }

  return (
    <div className="form-card">
      <h2>{editingProduct ? 'Editar producto' : 'Agregar producto'}</h2>
      {error && <p className="error-msg">{error}</p>}
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
