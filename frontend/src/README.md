# TP3 - Estado Global con Context API y useReducer

## ¿Qué se implementó?

Se incorporó manejo de estado global usando **Context API** y **useReducer** sobre el TP2.

---

## Archivos nuevos/modificados

| Archivo | Qué hace |
|---|---|
| `ProductContext.jsx` | Nuevo. Contiene el contexto, el reducer y el Provider |
| `main.jsx` | Modificado. Envuelve `<App>` con `<ProductProvider>` |
| `App.jsx` | Modificado. Usa `useProductContext()` en lugar de `useProducts()` |

---

## Cómo funciona

### 1. El Contexto (`createContext`)
```js
export const ProductContext = createContext()
```
Crea un "contenedor global" accesible desde cualquier componente.

### 2. El Reducer (`useReducer`)
El reducer recibe el estado actual y una acción, y devuelve el nuevo estado.

**Acciones implementadas:**
- `SET_PRODUCTS` → carga la lista inicial
- `ADD_PRODUCT` → agrega un producto
- `EDIT_PRODUCT` → edita un producto existente
- `DELETE_PRODUCT` → elimina un producto
- `SET_ERROR` / `CLEAR_ERROR` → manejo de errores
- `SET_LOADING` → controla el estado de carga

### 3. El Provider
```jsx
<ProductProvider>
  <App />
</ProductProvider>
```
Envuelve la app en `main.jsx` para que todos los componentes tengan acceso al estado global.

### 4. useContext para consumir
```js
const { products, createProduct, deleteProduct } = useProductContext()
```
Cualquier componente puede obtener el estado global con este hook.

---

## Flujo simplificado

```
Usuario hace una acción
    → Se llama a createProduct / updateProduct / deleteProduct
        → Se hace la llamada a la API
            → dispatch() envía una acción al reducer
                → El reducer actualiza el estado
                    → Todos los componentes se re-renderizan con el nuevo estado
```
