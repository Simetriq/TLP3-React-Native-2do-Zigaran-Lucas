import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/productService'

/**
 * useProducts
 * Encapsula todo el estado y la lógica de negocio relacionada con los productos.
 * El componente que lo consuma no necesita saber cómo ni de dónde se obtienen los datos.
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const createProduct = async (formData) => {
    try {
      await productService.create(formData)
      await fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateProduct = async (id, formData) => {
    try {
      await productService.update(id, formData)
      await fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await productService.remove(id)
      await fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const clearError = () => setError(null)

  return {
    products,
    loading,
    error,
    clearError,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
