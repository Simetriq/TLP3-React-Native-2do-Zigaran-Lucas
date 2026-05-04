import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProductProvider } from './ProductContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* El Provider envuelve toda la app para que cualquier componente pueda acceder al estado global */}
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>
)
