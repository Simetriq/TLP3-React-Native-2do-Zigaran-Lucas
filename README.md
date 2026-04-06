# Gestión de Inventario — React App

Aplicación CRUD de productos que consume una API REST local, construida con React.

---

## Estructura del proyecto

```
src/
├── App.jsx                        # Componente raíz — orquestador
├── App.css
├── hooks/
│   ├── useProducts.js             # Estado global de productos + llamadas a la API
│   ├── useProductForm.js          # Estado y lógica del formulario
│   └── useProductSearch.js        # Lógica de filtrado/búsqueda
├── services/
│   └── productService.js          # Capa de acceso a la API
└── components/
    ├── StatsRow.jsx               # Tarjetas de resumen (total, sin stock, unidades)
    ├── ProductForm.jsx            # Formulario de alta/edición
    ├── ProductList.jsx            # Lista con buscador
    └── ProductItem.jsx            # Ítem individual de producto
```

---

## Por qué se componetizó así

### Principio aplicado: Responsabilidad Única (SRP)

Cada archivo hace **una sola cosa**. El `App.jsx` original mezclaba: estado de productos, llamadas a la API, estado del formulario, lógica de búsqueda, y presentación de estadísticas. Eso lo hacía difícil de leer, testear y mantener.

La solución fue separar **qué hace** cada parte:

| Archivo | Responsabilidad |
|---|---|
| `App.jsx` | Orquestador: une hooks y componentes, decide qué renderizar |
| `productService.js` | Único punto de contacto con la API |
| `useProducts.js` | Estado del listado + CRUD |
| `useProductForm.js` | Estado interno del formulario |
| `useProductSearch.js` | Filtrado de la lista |
| `StatsRow.jsx` | Mostrar métricas del inventario |
| `ProductForm.jsx` | Renderizar el formulario |
| `ProductList.jsx` | Renderizar la lista filtrada |
| `ProductItem.jsx` | Renderizar un producto individual |

### StatsRow como componente aparte

En el `App.jsx` original, las tres tarjetas de estadísticas (total, sin stock, unidades) estaban escritas directamente en el return. Se extrajeron a `StatsRow` porque:

- Son una unidad conceptual propia (métricas del inventario)
- Permiten que `App` no mezcle lógica de presentación con orquestación
- Si en el futuro se quieren agregar más estadísticas, el cambio está encapsulado

### ProductItem como componente presentacional puro

`ProductItem` no tiene estado ni efectos. Recibe `product`, `onEdit` y `onDelete` como props y solo renderiza. Esto lo convierte en un **componente puro/presentacional**, que es la forma más fácil de testear y reutilizar.

---

## Por qué se eligieron estos hooks

### `useState`

Usado para estado local y sincrónico: el producto en edición (`editingProduct`), el valor del buscador (`search`), el estado del formulario (`form`), los errores de validación.

**Criterio de uso:** cuando el dato no necesita ser compartido entre muchos componentes y su actualización es simple.

### `useEffect`

Usado en dos lugares con propósitos distintos:

**1. En `useProducts` — cargar datos al montar:**
```js
useEffect(() => {
  fetchProducts()
}, [fetchProducts])
```
Se ejecuta una vez cuando el componente monta. Dispara la carga inicial de productos desde la API.

**2. En `useProductForm` — sincronizar formulario con producto a editar:**
```js
useEffect(() => {
  if (editingProduct) {
    setForm({ ...editingProduct })
  } else {
    setForm(EMPTY_FORM)
  }
}, [editingProduct])
```
Cada vez que cambia `editingProduct` (porque el usuario clickeó "Editar" en otro producto, o canceló), el formulario se actualiza para reflejar esos datos. Sin este efecto, el formulario quedaría con los valores del producto anterior.

**Por qué useEffect y no simplemente pasar los valores?**
Porque el formulario tiene estado interno propio (el usuario puede editar los campos). Si pasáramos los valores como props directamente, perderíamos los cambios que el usuario hizo. El efecto actúa como un "reset controlado" ante un cambio externo específico.

### `useCallback`

Usado en `useProducts` para estabilizar `fetchProducts`:
```js
const fetchProducts = useCallback(async () => { ... }, [])
```

**Por qué es necesario acá?**
`fetchProducts` se usa como dependencia de `useEffect`. Sin `useCallback`, en cada render se crearía una nueva función, lo que causaría que el efecto se ejecute infinitamente (loop). Al memorizar la función con `useCallback`, su referencia queda estable entre renders y el efecto solo se ejecuta cuando realmente corresponde.

### `useMemo`

Usado en `useProductSearch` para memorizar el resultado del filtrado:
```js
const filtered = useMemo(() => {
  return products.filter(...)
}, [products, search])
```

**Por qué?**
El filtrado recorre toda la lista en cada llamada. Sin `useMemo`, se recalcularía en cada render, aunque `products` y `search` no hayan cambiado. Con `useMemo`, el resultado se cachea y solo se recalcula cuando alguna de las dos dependencias cambia. En listas grandes esto tiene impacto real en performance.

---

## Capa de servicio (`productService`)

Todas las llamadas `fetch` fueron movidas a `productService.js`. Esto sigue el patrón **Service Layer** y tiene ventajas concretas:

- Si la URL o el método HTTP cambian, se modifica en un solo lugar
- Los hooks no saben cómo funciona la API, solo consumen el servicio
- Facilita reemplazar `fetch` por `axios` u otra librería sin tocar los hooks
- Es más fácil de mockear en tests

---

## Flujo de datos

```
App.jsx
  ├── useProducts()      →  products, loading, error, createProduct, updateProduct, deleteProduct
  ├── useProductSearch() →  filtered, search, setSearch
  └── useState()         →  editingProduct

App renderiza:
  ├── <StatsRow products={products} />
  ├── <ProductForm editingProduct={editingProduct} onSubmit={handleSubmit} />
  └── <ProductList products={filtered} search={search} ... />
            └── <ProductItem product={...} onEdit={...} onDelete={...} />
```

El estado fluye **hacia abajo** (props) y los eventos fluyen **hacia arriba** (callbacks). `App` es el único que conoce tanto los datos como los manejadores; los componentes hijos solo reciben lo que necesitan.

---

## Decisiones de diseño que se pueden defender

| Decisión | Alternativa descartada | Por qué se eligió esto |
|---|---|---|
| Custom hooks por dominio | Todo en App.jsx | Separación de concerns, reutilización, testabilidad |
| `useCallback` en `fetchProducts` | Función declarada sin memorizar | Evitar loop infinito en useEffect |
| `useMemo` en el filtrado | Filtrar directo en el JSX | Performance: no recalcular en cada render |
| Capa `productService` | fetch directo en hooks | Centralizar acceso a API, fácil de mockear |
| `filtered` en App, no en ProductList | Filtrar dentro de ProductList | App controla qué datos ve el usuario; List solo presenta |
| `StatsRow` como componente separado | Inline en App | App no debería tener lógica de presentación mezclada |
