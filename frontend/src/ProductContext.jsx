import { createContext, useContext, useReducer, useEffect } from 'react'
import { productService } from './productService'

// 1. Crear el contexto
export const ProductContext = createContext()

// 2. El reducer: maneja las acciones
function productReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] }

    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      }

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      }

    default:
      return state
  }
}

// Estado inicial
const initialState = {
  products: [],
  loading: true,
  error: null,
}

// 3. El Provider: envuelve la app y provee el estado global
export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState)

  // Cargar productos al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const data = await productService.getAll()
        dispatch({ type: 'SET_PRODUCTS', payload: data })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    fetchProducts()
  }, [])

  // Acciones disponibles para los componentes
  const createProduct = async (formData) => {
    try {
      const newProduct = await productService.create(formData)
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const updateProduct = async (id, formData) => {
    try {
      const updated = await productService.update(id, formData)
      dispatch({ type: 'EDIT_PRODUCT', payload: updated })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const deleteProduct = async (id) => {
    try {
      await productService.remove(id)
      dispatch({ type: 'DELETE_PRODUCT', payload: id })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' })

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        clearError,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

// 4. Hook para usar el contexto fácilmente
export function useProductContext() {
  return useContext(ProductContext)
}
