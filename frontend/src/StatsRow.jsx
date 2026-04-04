/**
 * StatsRow
 * Muestra las estadísticas de resumen del inventario.
 * Extraído de App para que App no mezcle lógica de presentación con orquestación.
 */
function StatsRow({ products }) {
  const total = products.length
  const sinStock = products.filter((p) => p.quantity === 0).length
  const unidades = products.reduce((acc, p) => acc + p.quantity, 0)

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-label">Total productos</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Sin stock</span>
        <span className="stat-value danger">{sinStock}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Unidades totales</span>
        <span className="stat-value">{unidades}</span>
      </div>
    </div>
  )
}

export default StatsRow
