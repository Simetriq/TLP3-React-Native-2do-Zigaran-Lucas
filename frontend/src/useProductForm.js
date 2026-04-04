import { useState, useEffect } from 'react'

const EMPTY_FORM = { name: '', description: '', type: '', quantity: '' }

/**
 * useProductForm
 * Maneja el estado interno del formulario y la lógica de edición.
 * Separa la responsabilidad del formulario de la del componente visual.
 */
export function useProductForm(editingProduct) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [validationError, setValidationError] = useState('')

  // Sincroniza el formulario cuando se recibe un producto a editar
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description || '',
        type: editingProduct.type,
        quantity: editingProduct.quantity,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingProduct])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.name || !form.type || form.quantity === '') {
      setValidationError('Los campos Nombre, Tipo y Cantidad son obligatorios.')
      return false
    }
    setValidationError('')
    return true
  }

  const reset = () => {
    setForm(EMPTY_FORM)
    setValidationError('')
  }

  const getSubmitData = () => ({
    ...form,
    quantity: Number(form.quantity),
  })

  return {
    form,
    validationError,
    handleChange,
    validate,
    reset,
    getSubmitData,
  }
}
